let openEdit = document.querySelector('.profile__edit-button');
let closeEdit = document.querySelector('.popup__close-button');
let popup = document.querySelector('.popup');

function popupToggle() {
  if (event.target === event.currentTarget) {
    popup.classList.toggle('popup_opened');
  }
}

openEdit.addEventListener('click', popupToggle);
closeEdit.addEventListener('click', popupToggle);

let formElement = document.querySelector('.form');

function handleFormSubmit (evt) {
    evt.preventDefault();

    let nameInput = formElement.querySelector('.form__text_name_name').value;
    let jobInput = formElement.querySelector('.form__text_name_job').value;

    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle');
    profileTitle.textContent = nameInput;
    profileSubtitle.textContent = jobInput;

    popupToggle();
}

formElement.addEventListener('submit', handleFormSubmit);