import '../../pages/index.css';

import {
  formObject,
  editButton,
  updateAvatarButton,
  addButton,
  cardsContainer,
  editingFormElement,
  updateAvatarFormElement,
  addingFormElement
} from '../utils/constants.js';

import { Api } from '../components/Api.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { PopupWithConfirm } from '../components/PopupWithConfirm.js';
import { UserInfo } from '../components/UserInfo.js';



const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-21',
  headers: {
    authorization: 'c0773531-78a8-4cdf-a081-1a1c757b9f2b',
    'Content-Type': 'application/json'
  },
  response: res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
});

const createCard = item => {
  const card = new Card(item, '#card', {
    handleCardClick: (link, name) => {
      imagePopup.open(link, name);
    },
    handleDeleteClick: (cardElement, cardId) => {
      deletePopup.open(cardElement, cardId);
    },
    handleLikeClick: (isLiked, cardId) => {
      api.toggleCardLike(isLiked, cardId)
        .then(res => card.toggleLikes(res))
        .catch(err => console.log(err));
    },
    isOwner: cardOwnerId => {
      return userInfo.userId === cardOwnerId;
    },
    isLiked: likes => {
      return likes.some(item => item._id === userInfo.userId);
    }
  });

  return card;
}

const userInfo = new UserInfo({
  userNameSelector: '.profile__title',
  userAboutSelector: '.profile__subtitle',
  userAvatarSelector: '.profile__avatar'
});

const editingFormValidator = new FormValidator(formObject, editingFormElement);

const updateAvatarFormValidator = new FormValidator(formObject, updateAvatarFormElement);

const addingFormValidator = new FormValidator(formObject, addingFormElement);

const editingPopup = new PopupWithForm({
  popupSelector: '.popup_type_edit',
  handleFormSubmit: (inputValues) => {
    editingPopup.buttonElement.textContent = 'Сохранение...';
    api.setUserInfo(inputValues)
      .then(res => userInfo.setUserInfo(res))
      .catch(err => console.log(err))
      .finally(() => {
        editingPopup.close();
        editingPopup.buttonElement.textContent = 'Сохранить';
      });
  },
  formRestore: () => {
    editingFormValidator.restoreForm();
  },
  formPrefill: (inputs) => {
    const inputValues = userInfo.getUserInfo();
    inputs.forEach(input => input.value = inputValues[input.name]);
  }
});

const updateAvatarPopup = new PopupWithForm({
  popupSelector: '.popup_type_update-avatar',
  handleFormSubmit: (inputValues) => {
    updateAvatarPopup.buttonElement.textContent = 'Сохранение...';
    api.setUserAvatar(inputValues)
      .then(res => {
        console.log(res);
        userInfo.setUserInfo(res)
      })
      .catch(err => console.log(err))
      .finally(() => {
        updateAvatarPopup.close();
        updateAvatarPopup.buttonElement.textContent = 'Сохранить';
      });
  },
  formRestore: () => {
    updateAvatarFormValidator.restoreForm();
  }
});

const addingPopup = new PopupWithForm({
  popupSelector: '.popup_type_add',
  handleFormSubmit: (inputValues) => {
    addingPopup.buttonElement.textContent = 'Сохранение...';
    api.addCard(inputValues)
      .then(res => {
        const card = createCard(res);
        cardList.addItem(card.generateCard());
      })
      .catch(err => console.log(err))
      .finally(() => {
        addingPopup.close();
        addingPopup.buttonElement.textContent = 'Сохранить';
      });
  },
  formRestore: () => {
    addingFormValidator.restoreForm();
  }
});

const deletePopup = new PopupWithConfirm({
  popupSelector: '.popup_type_delete',
  handleConfirm: (element, elementId) => {
    api.deleteCard(elementId)
      .then(() => element.remove())
      .catch(err => console.log(err));
  }
});

const imagePopup = new PopupWithImage({
  popupSelector: '.popup_type_image',
});

const cardList = new Section({
  renderer: item => {
    const card = createCard(item);
    cardList.addItem(card.generateCard(), true);
  }
}, cardsContainer);



Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([userData, initialCards]) => {
    userInfo.setUserInfo(userData);
    cardList.renderItems(initialCards);
  })
  .catch(err => console.log(err));

editingFormValidator.enableValidation();
updateAvatarFormValidator.enableValidation();
addingFormValidator.enableValidation();

editingPopup.setEventListeners();
updateAvatarPopup.setEventListeners();
addingPopup.setEventListeners();
imagePopup.setEventListeners();
deletePopup.setEventListeners();



editButton.addEventListener('click', () => editingPopup.open());
updateAvatarButton.addEventListener('click', () => updateAvatarPopup.open());
addButton.addEventListener('click', () => addingPopup.open());