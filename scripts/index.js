const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const popupList = Array.from(document.querySelectorAll('.popup'));

const editingPopup = popupList.find(popup => popup.classList.contains('popup_type_edit'));
const editingFormElement = editingPopup.querySelector('.popup__form');
const nameInput = editingFormElement.querySelector('.popup__input_name_name');
const jobInput = editingFormElement.querySelector('.popup__input_name_job');

const addingPopup = popupList.find(popup => popup.classList.contains('popup_type_add'));
const addingFormElement = addingPopup.querySelector('.popup__form');
const placeInput = addingFormElement.querySelector('.popup__input_name_place');
const imageInput = addingFormElement.querySelector('.popup__input_name_image');

const imagePopup = popupList.find(popup => popup.classList.contains('popup_type_image'));
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__image-title');

const cardsContainer = document.querySelector('.board');

const popupObject = {
  popupSelector: '.popup',
  popupClass: 'popup',
  activePopupClass: 'popup_opened',
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

const formList = [
  editingFormElement,
  addingFormElement
];

const handleEscapePopup = evt => {
  if (evt.key === 'Escape') {
    const activePopup = popupList.find(popup => popup.classList.contains(popupObject.activePopupClass));
    closePopup(evt, activePopup);
  }
}

const handleScrollPrevent = evt => evt.preventDefault();

const prepareEditingPopup = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  const formValidator = new FormValidator(formObject, editingFormElement)
  formValidator.restoreForm();
  openPopup(editingPopup);
}

const prepareAddingPopup = () => {
  placeInput.value = '';
  imageInput.value = '';
  const formValidator = new FormValidator(formObject, addingFormElement)
  formValidator.restoreForm();
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

const closePopup = (evt, activePopup) => {
  if (activePopup
    || evt.type === 'submit'
    || evt.target.classList.contains(popupObject.popupCloseButtonClass)
    || evt.target.classList.contains(popupObject.popupClass))
  {
    !activePopup && (activePopup = evt.target.closest(popupObject.popupSelector));
    activePopup.classList.remove(popupObject.activePopupClass);
    document.removeEventListener('keydown', handleEscapePopup);
    document.removeEventListener('wheel', handleScrollPrevent);
    document.removeEventListener('touchmove', handleScrollPrevent);
  }
}

const submitEditingForm = evt => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(evt);
}

const submitAddingForm = evt => {
  evt.preventDefault();
  const cardData = {
    link: imageInput.value,
    name: placeInput.value
  };
  const card = new Card(cardData, '#card')
  cardsContainer.prepend(card.generateCard());
  closePopup(evt);
}

const addInitialCards = () => initialCards.forEach(item => {
  const card = new Card(item, '#card');
  cardsContainer.append(card.generateCard());
});

const validateForms = () => formList.forEach(item => {
  const formValidator = new FormValidator(formObject, item);
  formValidator.enableValidation();
});

addInitialCards();

validateForms();

editButton.addEventListener('click', prepareEditingPopup);
addButton.addEventListener('click', prepareAddingPopup);
popupList.forEach(item => item.addEventListener('click', closePopup));
editingFormElement.addEventListener('submit', submitEditingForm);
addingFormElement.addEventListener('submit', submitAddingForm);

<<<<<<< HEAD
import {Card} from './Card.js';
=======
import {Card} from './card.js';
>>>>>>> 4dd7682af94e8ccc65e3afbfff644c5c4ecc1f88
import {initialCards} from './initialCards.js';
import {FormValidator} from './FormValidator.js';