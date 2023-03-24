export default class UserInfo {
    constructor({profileNameSelector, profileJobSelector}) {
        this._userNameElement = document.querySelector(profileNameSelector);
        this._userJobElement = document.querySelector(profileJobSelector);
    }

    getUserInfo() {
        const dataObj = {
            profileName: this._userNameElement.textContent,
            profileJob: this._userJobElement.textContent
        };

        return dataObj;
    }

    setUserInfo(userName, userJob) {
        this._userNameElement.textContent = userName;
        this._userJobElement.textContent = userJob;
    }
}