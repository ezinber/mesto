export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
    this._response = options.response;
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => this._response(res));
  }

  setUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._response(res));
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then(res => this._response(res));
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => this._response(res));
  }

  addCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._response(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => this._response(res));
  }

  toggleCardLike(isLiked, cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: isLiked
        ? 'DELETE'
        : 'PUT',
      headers: {
        authorization: this._headers.authorization
      }
    })
      .then(res => this._response(res));
  }
}

