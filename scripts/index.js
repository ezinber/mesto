const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const closeButtons = document.querySelectorAll('.popup__close-button');

const editingPopup = document.querySelector('.popup_type_edit');
const editingFormElement = editingPopup.querySelector('.form');
const nameInput = editingFormElement.querySelector('.form__text_name_name');
const jobInput = editingFormElement.querySelector('.form__text_name_job');

const addingPopup = document.querySelector('.popup_type_add');
const addingFormElement = addingPopup.querySelector('.form');
const placeInput = addingFormElement.querySelector('.form__text_name_place');
const imageInput = addingFormElement.querySelector('.form__text_name_image');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__image-title');

const cardsContainer = document.querySelector('.board');
const cardTemplate = cardsContainer.querySelector('#card').content;
const cardTemplatePhoto = cardTemplate.querySelector('.board__card-photo');
const cardTemplateTitle = cardTemplate.querySelector('.board__card-title');
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
  cardsContainer.prepend(createCard(imageInput.value, placeInput.value));
  closePopup(evt);
}

const createCard = (image, place) => {
  cardTemplatePhoto.src = image;
  cardTemplatePhoto.alt = place;
  cardTemplateTitle.textContent = place;
  return cardTemplate.cloneNode(true);
}

const addInitialCards = () => initialCards.forEach(item => cardsContainer.append(createCard(item.link, item.name)));

addInitialCards();

editButton.addEventListener('click', openEditingPopup);
addButton.addEventListener('click', openAddingPopup);
closeButtons.forEach(item => item.addEventListener('click', closePopup));
editingFormElement.addEventListener('submit', submitEditingForm);
addingFormElement.addEventListener('submit', submitAddingForm);
cardsContainer.addEventListener('click', evt => {
  evt.target.classList.contains('board__card-like') && evt.target.classList.toggle('board__card-like_active');
  evt.target.classList.contains('board__card-delete') && evt.target.closest('.board__card').remove();
  evt.target.classList.contains('board__card-photo') && openImagePopup(evt);
});
