export default class Api {
    constructor(config) {
        this._baseUrl = config.baseUrlAdress;
        this._autorisationToken = config.autorisationToken;
        this._profileUrl = `${this._baseUrl}users/me`;
        this._profileAvatarUrl = `${this._profileUrl}/avatar`;
        this._cardsUrl = `${this._baseUrl}cards`;
    }

    _fetchServerResponse(response) {
        if (response.ok) {
            return response.json();
            }
            return Promise.reject(`Ошибка: ${response.status}`);
    }

    _fetchGetRequest(url) {
        return fetch(url, {
            method: 'GET',
            headers: {
                authorization: this._autorisationToken,
            }
        })
        .then(response => this._fetchServerResponse(response));
    }

    _fetchPostRequest(url, method, bodyData) {
        return fetch(url, {
            method: method,
            headers: {
                authorization: this._autorisationToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bodyData)
        })
        .then(response => this._fetchServerResponse(response));
    }

    _fetchDeleteRequest(url, id) {
        return fetch(`${url}/${id}`,  {
            method: 'DELETE',
            headers: {
                authorization: this._autorisationToken,
            }
        })
        .then(response => this._fetchServerResponse(response));
    }

    _fetchAddCardBody(inputValues) {
        return {
            name: inputValues['card-name'],
            link: inputValues['card-url']
        };
    }

    _fetchEditProfileBody(inputValues) {
        return {
            name: inputValues['profile-name'],
            about: inputValues['profile-job']
        };
    }

    _fetchPostAvatarBody(inputValues) {
        return {
            avatar: inputValues['avatar-url']
        };
    }

    _fetchChangeLikesState(url, id, method) {
        return fetch(`${url}/${id}/likes`, {
            method: method,
            headers: {
                authorization: this._autorisationToken
            }
        })
        .then(response => this._fetchServerResponse(response));
    }
    
    getProfileData() {
        return this._fetchGetRequest(this._profileUrl);
    }

    getCards() {
        return this._fetchGetRequest(this._cardsUrl);
    }

    postNewCard(inputValues) {
        return this._fetchPostRequest(this._cardsUrl, 'POST', this._fetchAddCardBody(inputValues));
    }

    postProfileData(inputValues) {
        return this._fetchPostRequest(this._profileUrl, 'PATCH', this._fetchEditProfileBody(inputValues));
    }

    postAvatar(inputValues) {
        return this._fetchPostRequest(this._profileAvatarUrl, 'PATCH', this._fetchPostAvatarBody(inputValues));
    }

    postLike(cardId) {
        return this._fetchChangeLikesState(this._cardsUrl, cardId, 'PUT');

    }

    deleteLike(cardId) {
        return this._fetchChangeLikesState(this._cardsUrl, cardId, 'DELETE');
    }

    cardDelition(cardId) {
        return this._fetchDeleteRequest(this._cardsUrl, cardId);
    }

    changeButtonText(button, text) {
        button.textContent = text;
    }
}