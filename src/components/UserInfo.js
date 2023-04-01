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
            'profile-name': this._userNameElement.textContent,
            'profile-job': this._userJobElement.textContent
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