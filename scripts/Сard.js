export class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementPhoto = this._element.querySelector('.board__card-photo');
    this._elementTitle = this._element.querySelector('.board__card-title');
    this._elementLike = this._element.querySelector('.board__card-like');
    this._elementDelete = this._element.querySelector('.board__card-delete');
    this._setEventListeners();

    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._elementTitle.textContent = this._name;

    return this._element;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => this._handleLikeClick());
    this._elementDelete.addEventListener('click', () => this._handleDeleteClick());
    this._elementPhoto.addEventListener('click', () => this._handleImagePopup());
  }

  _handleLikeClick() {
    this._elementLike.classList.toggle('board__card-like_active');
  }

  _handleDeleteClick() {
    this._elementDelete.closest('.board__card').remove();
  }

  _handleImagePopup() {
    prepareImagePopup(this._link, this._name);
  }
}

import {prepareImagePopup} from './index.js';
