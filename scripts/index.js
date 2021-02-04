const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const closeButtons = document.querySelectorAll('.popup__close-button');

const editingPopup = document.querySelector('.popup_type_edit');
const editingFormElement = editingPopup.querySelector('.popup__form');
const editingSubmitButton = editingFormElement.querySelector('.popup__button')
const nameInput = editingFormElement.querySelector('.popup__input_name_name');
const jobInput = editingFormElement.querySelector('.popup__input_name_job');

const addingPopup = document.querySelector('.popup_type_add');
const addingFormElement = addingPopup.querySelector('.popup__form');
const addingSubmitButton = addingFormElement.querySelector('.popup__button')
const placeInput = addingFormElement.querySelector('.popup__input_name_place');
const imageInput = addingFormElement.querySelector('.popup__input_name_image');

const imagePopup = document.querySelector('.popup_type_image');
const imagePopupPhoto = imagePopup.querySelector('.popup__image');
const imagePopupTitle = imagePopup.querySelector('.popup__image-title');

const cardsContainer = document.querySelector('.board');
const cardTemplate = cardsContainer.querySelector('#card').content;
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

const validateObject = {
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const validatePopup = (inputList, formElement, buttonElement) => {
  inputList.forEach(inputElement => inputElement.classList.contains(validateObject.inputErrorClass) && hideInputError(formElement, inputElement, validateObject));
  toggleButtonState(inputList, buttonElement, validateObject);
}

const openEditingPopup = () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
  validatePopup([nameInput, jobInput], editingFormElement, editingSubmitButton);
  editingPopup.classList.add('popup_opened');
};

const openAddingPopup = () => {
  placeInput.value = '';
  imageInput.value = '';
  validatePopup([placeInput, imageInput], addingFormElement, addingSubmitButton);
  addingPopup.classList.add('popup_opened');
};

const openImagePopup = evt => {
  imagePopupPhoto.src = evt.target.src;
  imagePopupTitle.textContent = evt.target.nextElementSibling.textContent;
  imagePopup.classList.add('popup_opened');
};

const closePopup = evt => evt.target.closest('.popup').classList.remove('popup_opened');

const submitEditingForm = evt => {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(evt);
};

const submitAddingForm = evt => {
  evt.preventDefault();
  cardsContainer.prepend(createCard(imageInput.value, placeInput.value));
  closePopup(evt);
};

const createCard = (image, place) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardElementPhoto = cardElement.querySelector('.board__card-photo');
  const cardElementTitle = cardElement.querySelector('.board__card-title');
  const cardElementLike = cardElement.querySelector('.board__card-like');
  const cardElementDelete = cardElement.querySelector('.board__card-delete');
  cardElementPhoto.src = image;
  cardElementPhoto.alt = place;
  cardElementTitle.textContent = place;
  cardElementPhoto.addEventListener('click', openImagePopup);
  cardElementLike.addEventListener('click', evt => evt.target.classList.toggle('board__card-like_active'));
  cardElementDelete.addEventListener('click', evt => evt.target.closest('.board__card').remove());
  return cardElement;
};

const addInitialCards = () => initialCards.forEach(item => cardsContainer.append(createCard(item.link, item.name)));

addInitialCards();

editButton.addEventListener('click', openEditingPopup);
addButton.addEventListener('click', openAddingPopup);
closeButtons.forEach(item => item.addEventListener('click', closePopup));
editingFormElement.addEventListener('submit', submitEditingForm);
addingFormElement.addEventListener('submit', submitAddingForm);
