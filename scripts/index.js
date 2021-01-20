const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close-button');
const editingPopup = popups[0];
const editingFormElement = editingPopup.querySelector('.form');
const nameInput = editingFormElement.querySelector('.form__text_name_name');
const jobInput = editingFormElement.querySelector('.form__text_name_job');
const addingPopup = popups[1];
const addingFormElement = addingPopup.querySelector('.form');
const placeInput = addingFormElement.querySelector('.form__text_name_place');
const imageInput = addingFormElement.querySelector('.form__text_name_image');
const imagePopup = popups[2];
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__image-title')

const cardsContainer = document.querySelector('.board')
const cardTemplate = cardsContainer.querySelector('#card').content;
let cardElement;
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const openEditingPopup = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  editingPopup.classList.add('popup_opened');
};

const openAddingPopup = () => {
  placeInput.value = '';
  imageInput.value = '';
  addingPopup.classList.add('popup_opened');
}

const openImagePopup = evt => {
  imagePopupPhoto.src = evt.target.src;
  imagePopupTitle.textContent = evt.target.nextElementSibling.textContent;
  imagePopup.classList.add('popup_opened');
}

const closePopup = evt => evt.target.closest('.popup').classList.remove('popup_opened');

const submitEditingForm = evt => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(evt);
}

const submitAddingForm = evt => {
  evt.preventDefault();
  createCard(imageInput.value, placeInput.value);
  cardsContainer.prepend(cardElement);
  closePopup(evt);
}

const createCard = (image, place) => {
  cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.board__card-photo').src = image;
  cardElement.querySelector('.board__card-photo').alt = place;
  cardElement.querySelector('.board__card-title').textContent = place;
  cardElement.querySelector('.board__card-like').addEventListener('click', evt => evt.target.classList.toggle('board__card-like_active'));
  cardElement.querySelector('.board__card-delete').addEventListener('click', evt => evt.target.closest('.board__card').remove());
  cardElement.querySelector('.board__card-photo').addEventListener('click', openImagePopup);
  return cardElement;
}

const addInitialCards = () => {
  initialCards.forEach(item => {
    createCard(item.link, item.name);
    cardsContainer.append(cardElement);
  });
}

addInitialCards();

editButton.addEventListener('click', openEditingPopup);
addButton.addEventListener('click', openAddingPopup);
closeButtons.forEach(item => item.addEventListener('click', closePopup));
editingFormElement.addEventListener('submit', submitEditingForm);
addingFormElement.addEventListener('submit', submitAddingForm);