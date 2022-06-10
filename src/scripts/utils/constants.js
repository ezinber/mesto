export const formObject = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const editButton = document.querySelector('.profile__edit-button');
export const updateAvatarButton = document.querySelector('.profile__avatar-button');
export const addButton = document.querySelector('.profile__add-button');
export const cardsContainer = document.querySelector('.board');
export const cardsPlaceholders = cardsContainer.querySelectorAll('.placeholder');

const allPopups = Array.from(document.querySelectorAll('.popup'));

export const editingFormElement = allPopups.find(popup =>
  popup.classList.contains('popup_type_edit'))
  .querySelector('.popup__form');

export const updateAvatarFormElement = allPopups.find(popup =>
  popup.classList.contains('popup_type_update-avatar'))
  .querySelector('.popup__form');

export const addingFormElement = allPopups.find(popup =>
  popup.classList.contains('popup_type_add'))
  .querySelector('.popup__form');