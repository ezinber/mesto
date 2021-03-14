import '../../pages/index.css';

import {
  formObject,
  editButton,
  addButton,
  cardsContainer
} from '../utils/constants.js';
import { Card } from '../components/Card.js';
import { initialCards } from '../utils/initialCards.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userJobSelector: '.profile__subtitle'
});

const editingPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (inputValues) => {
    userInfo.setUserInfo(inputValues);
  },
  formValidate: (formElement) => {
    window.editingFormValidator = new FormValidator(formObject, formElement);
    editingFormValidator.enableValidation();
  },
  formRestore: () => {
    editingFormValidator.restoreForm();
  },
  formPrefill: (inputs) => {
    const inputValues = userInfo.getUserInfo();
    inputs.forEach(input => input.value = inputValues[input.name]);
  }
});

const addingPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (inputValues) => {
    const card = new Card(inputValues, '#card', {
      handleCardClick: (photo, title) => {
        imagePopup.open(photo, title);
      }
    });
    const cardElement = card.generateCard();

    cardList.addItem(cardElement);
  },
  formValidate: (formElement) => {
    window.addingFormValidator = new FormValidator(formObject, formElement);
    addingFormValidator.enableValidation();
  },
  formRestore: () => {
    addingFormValidator.restoreForm();
  }
});

const imagePopup = new PopupWithImage({ 
  popupSelector: '.popup_type_image',
});

const cardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const card = new Card(item, '#card', {
      handleCardClick: (photo, title) => {
        imagePopup.open(photo, title);
      }
    });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement, true);
  }
}, cardsContainer);

cardList.renderItems();

editingPopup.setEventListeners();
addingPopup.setEventListeners();
imagePopup.setEventListeners();

editButton.addEventListener('click', () => editingPopup.open());
addButton.addEventListener('click', () => addingPopup.open());