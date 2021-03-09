export class UserInfo {
  constructor({ userName, userJob }) {
    this._userName = document.querySelector(userName);
    this._userAbout = document.querySelector(userJob);
  }

  getUserInfo() {
    this._userInfo = {
      userName: this._userName.textContent,
      userAbout: this._userAbout.textContent
    }

    return this._userInfo;
  }

  setUserInfo({ name, job }) {
    this._userName.textContent = name;
    this._userAbout.textContent = job;
  }
}