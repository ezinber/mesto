export class UserInfo {
  constructor({ userNameSelector, userAboutSelector, userAvatarSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userAbout = document.querySelector(userAboutSelector);
    this.userAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._userName.textContent,
      about: this._userAbout.textContent
    }

    return this._userInfo;
  }

  setUserInfo({ name, about, _id, avatar }) {
    this._userName.textContent = name;
    this._userAbout.textContent = about;
    this.userAvatar.src = avatar;
    this.userId = _id;
  }
}