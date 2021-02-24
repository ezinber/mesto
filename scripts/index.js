const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const allPopups = Array.from(document.querySelectorAll('.popup'));

const editingPopup = allPopups.find(popup => popup.classList.contains('popup_type_edit'));
const editingFormElement = editingPopup.querySelector('.popup__form');
const editingSubmitButton = editingFormElement.querySelector('.popup__button')
const nameInput = editingFormElement.querySelector('.popup__input_name_name');
const jobInput = editingFormElement.querySelector('.popup__input_name_job');

const addingPopup = allPopups.find(popup => popup.classList.contains('popup_type_add'));
const addingFormElement = addingPopup.querySelector('.popup__form');
const addingSubmitButton = addingFormElement.querySelector('.popup__button')
const placeInput = addingFormElement.querySelector('.popup__input_name_place');
const imageInput = addingFormElement.querySelector('.popup__input_name_image');

const imagePopup = allPopups.find(popup => popup.classList.contains('popup_type_image'));
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__image-title');

const cardsContainer = document.querySelector('.board');
//const cardTemplate = cardsContainer.querySelector('#card').content;

const popupObject = {
  popupSelector: '.popup',
  popupClass: 'popup',
  activePopupClass: 'popup_opened',
  popupCloseButtonClass: 'popup__close-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const popupEventsHandler = evt => {
  if (evt.key === 'Escape') {
    const activePopup = allPopups.find(popup => popup.classList.contains(popupObject.activePopupClass));
    closePopup(evt, activePopup);
  }
};

const popupScrollPrevent = evt => evt.preventDefault();

const prepareEditingPopup = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  const formValidator = new FormValidator(formObject, editingFormElement)
  formValidator.restoreForm();
  openPopup(editingPopup);
};

const prepareAddingPopup = () => {
  placeInput.value = '';
  imageInput.value = '';
  const formValidator = new FormValidator(formObject, addingFormElement)
  formValidator.restoreForm();
  openPopup(addingPopup);
};

/*const prepareImagePopup = (image, place) => {
  imagePopupPhoto.src = image;
  imagePopupTitle.textContent = place;
  openPopup(imagePopup);
};*/

const openPopup = preparedPopup => {
  preparedPopup.classList.add(popupObject.activePopupClass);
  document.addEventListener('keydown', popupEventsHandler);
  document.addEventListener('wheel', popupScrollPrevent, {passive: false});
  document.addEventListener('touchmove', popupScrollPrevent, {passive: false});
}

const closePopup = (evt, activePopup) => {
  if (activePopup
    || evt.type === 'submit'
    || evt.target.classList.contains(popupObject.popupCloseButtonClass)
    || evt.target.classList.contains(popupObject.popupClass)) {
    !activePopup && (activePopup = evt.target.closest(popupObject.popupSelector));
    activePopup.classList.remove(popupObject.activePopupClass);
    document.removeEventListener('keydown', popupEventsHandler);
    document.removeEventListener('wheel', popupScrollPrevent);
    document.removeEventListener('touchmove', popupScrollPrevent);
  }
};

const submitEditingForm = evt => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(evt);
};

const submitAddingForm = evt => {
  evt.preventDefault();
  const card = new Card({link: imageInput.value, name: placeInput.value}, '#card')
  cardsContainer.prepend(card.generateCard());
  closePopup(evt);
};

/*const createCard = (image, place) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementPhoto = cardElement.querySelector('.board__card-photo');
  const cardElementTitle = cardElement.querySelector('.board__card-title');
  const cardElementLike = cardElement.querySelector('.board__card-like');
  const cardElementRemove = cardElement.querySelector('.board__card-delete');
  cardElementPhoto.src = image;
  cardElementPhoto.alt = place;
  cardElementTitle.textContent = place;
  cardElementPhoto.addEventListener('click', () => prepareImagePopup(image, place));
  cardElementLike.addEventListener('click', evt => evt.target.classList.toggle('board__card-like_active'));
  cardElementRemove.addEventListener('click', evt => evt.target.closest('.board__card').remove());
  return cardElement;
};*/

class Card {
  constructor(data, cardSelector){
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.cloneNode(true);
    return cardElement;
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

  _setEventListeners() {
    this._elementLike.addEventListener('click', () => this._handleLikeClick());
    this._elementDelete.addEventListener('click', () => this._handleDeleteClick());
    this._elementPhoto.addEventListener('click', () => this._handleImagePopup(this._link, this._name));
  }

  _handleLikeClick() {
    this._elementLike.classList.toggle('board__card-like_active');
  }

  _handleDeleteClick() {
    this._elementDelete.closest('.board__card').remove();
  }

  _handleImagePopup() {
    imagePopupPhoto.src = this._link;
    imagePopupTitle.textContent = this._name;
    openPopup(imagePopup);
  };
};

const addInitialCards = () => initialCards.forEach(item => {
  const card = new Card(item, '#card');
  cardsContainer.append(card.generateCard());
});

const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formValidate = () => [editingFormElement, addingFormElement].forEach(item => {
  const formValidator = new FormValidator(formObject, item);
  formValidator.enableValidation();
});

formValidate();

addInitialCards();

editButton.addEventListener('click', prepareEditingPopup);
addButton.addEventListener('click', prepareAddingPopup);
allPopups.forEach(item => item.addEventListener('click', closePopup));
editingFormElement.addEventListener('submit', submitEditingForm);
addingFormElement.addEventListener('submit', submitAddingForm);