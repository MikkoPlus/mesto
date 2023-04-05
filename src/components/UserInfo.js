export default class UserInfo {
    constructor({profileNameSelector, profileJobSelector, profileAvatarSelector}) {
        this._userNameElement = document.querySelector(profileNameSelector);
        this._userJobElement = document.querySelector(profileJobSelector);
        this._userAvatarElement = document.querySelector(profileAvatarSelector);
    }

    setUserId(id) {
        this._userId = id;
    }


    getUserId() {
        return this._userId;
    }

    getUserInfo() {
        const dataObj = {
            'name': this._userNameElement.textContent,
            'about': this._userJobElement.textContent,
            'avatar': this._userAvatarElement.src
        };
        
        return dataObj;
    }

    setUserInfo(userName, userJob) {
        this._userNameElement.textContent = userName;
        this._userJobElement.textContent = userJob;
    }

    setAvatar(url) {
        this._userAvatarElement.src = url;
    }
}