// ПЕРЕМЕННЫЕ

// открытие/закрытие popup
const openEdit = document.querySelector('.profile__edit-button');
const openAdd = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll('.popup');
const editingPopup = popups[0];
const addingPopup = popups[1];
const closeButtons = document.querySelectorAll('.popup__close-button');

// изменение данных профиля через форму
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const formElements = document.querySelectorAll('.form');
const editingFormElement = formElements[0];
const addingFormElement = formElements[1];
const nameInput = editingFormElement.querySelector('.form__text_name_name');
const jobInput = editingFormElement.querySelector('.form__text_name_job');
const placeInput = addingFormElement.querySelector('.form__text_name_place');
const imageInput = addingFormElement.querySelector('.form__text_name_image');

// ФУНКЦИИ

const popupOpen = popupType => {
  if (popupType === editingPopup) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  } else if (popupType === addingPopup) {
    placeInput.value = '';
    imageInput.value = '';
  }
  popupType.classList.add('popup_opened');
}

const popupClose = () => event.currentTarget.closest('.popup').classList.remove('popup_opened');

// изменение данных профиля через форму
const handleFormSubmit = evt => {
    evt.preventDefault();
    if (event.currentTarget === editingFormElement) {
      profileTitle.textContent = nameInput.value;
      profileSubtitle.textContent = jobInput.value;
    }
    popupClose();
}

// СОБЫТИЯ

// открытие/закрытие popup
openEdit.addEventListener('click', () => popupOpen(editingPopup));
openAdd.addEventListener('click', () => popupOpen(addingPopup));
closeButtons.forEach(item => item.addEventListener('click', popupClose));

// изменение данных профиля через форму
formElements.forEach(item => item.addEventListener('submit', handleFormSubmit));