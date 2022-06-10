export class Card {
  constructor(data, cardSelector, {
    handleCardClick,
    handleDeleteClick,
    handleLikeClick,
    isOwner,
    isLiked
  }) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._ownerId = data.owner._id;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._isOwner = isOwner(this._ownerId);
    this._isLiked = isLiked(this._likes);
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementPhoto = this._element.querySelector('.board__card-photo');
    this._elementTitle = this._element.querySelector('.board__card-title');
    this._elementCounter = this._element.querySelector('.board__card-like-counter')
    this._elementLike = this._element.querySelector('.board__card-like');

    this._isOwner
    ? this._elementDelete = this._element.querySelector('.board__card-delete')
    : this._element.querySelector('.board__card-delete').remove();

    this._isLiked
    && this._elementLike.classList.add('board__card-like_active');

    this._setEventListeners();

    this._elementPhoto.src = this._link;
    this._elementPhoto.alt = this._name;
    this._elementTitle.textContent = this._name;
    this._elementCounter.textContent = this._likes.length;

    return this._element;
  }

  _getTemplate() {
    return document.querySelector(this._cardSelector).content.cloneNode(true);
  }

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => {
      this._handleLikeClick(this._isLiked, this._cardId);
    });
    this._elementPhoto.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name)
    });
    this._isOwner
    && this._elementDelete.addEventListener('click', evt => {
      this._handleDeleteClick(evt.target.closest('.board__card'), this._cardId);
    });
  }

  toggleLikes(data) {
    this._isLiked = !this._isLiked;
    this._elementLike.classList.toggle('board__card-like_active');
    this._elementCounter.textContent = data.likes.length;
  }
}