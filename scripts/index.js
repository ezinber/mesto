import {Card} from './Card.js';
import {initialCards} from './initialCards.js';
import {FormValidator} from './FormValidator.js';

const popupObject = {
  popupSelector: '.popup',
  popupClass: 'popup',
  activePopupClass: 'popup_opened',
  popupCloseButtonSelector: '.popup__close-button',
  popupCloseButtonClass: 'popup__close-button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupList = Array.from(document.querySelectorAll('.popup'));

const editingPopup = popupList.find(popup => popup.classList.contains('popup_type_edit'));
const editingFormElement = editingPopup.querySelector('.popup__form');
const editingFormValidator = new FormValidator(formObject, editingFormElement);
const nameInput = editingFormElement.querySelector('.popup__input_name_name');
const jobInput = editingFormElement.querySelector('.popup__input_name_job');

const addingPopup = popupList.find(popup => popup.classList.contains('popup_type_add'));
const addingFormElement = addingPopup.querySelector('.popup__form');
const addingFormValidator = new FormValidator(formObject, addingFormElement);
const placeInput = addingFormElement.querySelector('.popup__input_name_place');
const imageInput = addingFormElement.querySelector('.popup__input_name_image');

const imagePopup = popupList.find(popup => popup.classList.contains('popup_type_image'));
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__image-title');

const cardsContainer = document.querySelector('.board');

const handleEscapePopup = evt => {
  evt.key === 'Escape'
  && closePopup(popupList.find(popup => popup.classList.contains(popupObject.activePopupClass)));
}

const handleOverlayClick = evt => {
  evt.target.classList.contains(popupObject.activePopupClass)
  && closePopup(evt.target);
}

const handleScrollPrevent = evt => evt.preventDefault();

const prepareEditingPopup = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  editingFormValidator.restoreForm();
  openPopup(editingPopup);
}

const prepareAddingPopup = () => {
  placeInput.value = '';
  imageInput.value = '';
  addingFormValidator.restoreForm();
  openPopup(addingPopup);
}

export const prepareImagePopup = (image, place) => {
  imagePopupPhoto.src = image;
  imagePopupTitle.textContent = place;
  openPopup(imagePopup);
}

const openPopup = preparedPopup => {
  preparedPopup.classList.add(popupObject.activePopupClass);
  document.addEventListener('keydown', handleEscapePopup);
  document.addEventListener('wheel', handleScrollPrevent, {passive: false});
  document.addEventListener('touchmove', handleScrollPrevent, {passive: false});
}

const closePopup = activePopup => {
  activePopup.classList.remove(popupObject.activePopupClass);
  document.removeEventListener('keydown', handleEscapePopup);
  document.removeEventListener('wheel', handleScrollPrevent);
  document.removeEventListener('touchmove', handleScrollPrevent);
}

const submitEditingForm = evt => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(editingPopup);
}

const submitAddingForm = evt => {
  evt.preventDefault();
  const cardData = {
    link: imageInput.value,
    name: placeInput.value
  };
  const card = new Card(cardData, '#card')
  cardsContainer.prepend(card.generateCard());
  closePopup(addingPopup);
}

const addInitialCards = () => initialCards.forEach(item => {
  const card = new Card(item, '#card');
  cardsContainer.append(card.generateCard());
});

addInitialCards();

editingFormValidator.enableValidation();
addingFormValidator.enableValidation();

editButton.addEventListener('click', prepareEditingPopup);
addButton.addEventListener('click', prepareAddingPopup);
popupList.forEach(item => {
  item.addEventListener('click', handleOverlayClick);
  item.querySelector(popupObject.popupCloseButtonSelector)
  .addEventListener('click', () => closePopup(item));
});
editingFormElement.addEventListener('submit', submitEditingForm);
addingFormElement.addEventListener('submit', submitAddingForm);