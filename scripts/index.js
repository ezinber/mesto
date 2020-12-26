// ПЕРЕМЕННЫЕ

// открытие/закрытие popup
let openEdit = document.querySelector('.profile__edit-button');
let closeEdit = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');
// изменение данных профиля через форму
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__text_name_name');
let jobInput = formElement.querySelector('.form__text_name_job');

// ФУНКЦИИ

// открытие/закрытие popup
function popupOpen() {
  if (event.target === event.currentTarget) {
    popup.classList.add('popup_opened');

    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  }
}

function popupClose() {
  if (event.target === event.currentTarget) {
    popup.classList.remove('popup_opened');
  }
}
// изменение данных профиля через форму
function handleFormSubmit (evt) {
    evt.preventDefault();

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    popupClose();
}

// СОБЫТИЯ

// открытие/закрытие popup
openEdit.addEventListener('click', popupOpen);
closeEdit.addEventListener('click', popupClose);
// изменение данных профиля через форму
formElement.addEventListener('submit', handleFormSubmit);