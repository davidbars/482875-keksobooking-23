import {sendOfferData} from './data.js';
import {isEscKeydown} from './util.js';
import {restoreFormData} from './map.js';

const adForm = document.querySelector('.ad-form');
const successTemplate = document.querySelector('#success');
const success = successTemplate.content.querySelector('.success');
const successMessage = success.cloneNode(true);

const errorTemplate = document.querySelector('#error');
const error = errorTemplate.content.querySelector('.error');
const errorMessage = error.cloneNode(true);
const errorButton = error.querySelector('.error__button');


const resetData = () => {
  adForm.reset();
  restoreFormData();
};

// Функция закрывающая окно сообщения
const closePopup = () => {
  if (document.body.contains(successMessage)) {
    document.body.removeChild(successMessage);
    resetData();
  } else {
    document.body.removeChild(errorMessage);
  }
};

const onPopupEscKeydown = (evt) => {
  if (isEscKeydown(evt)) {
    evt.preventDefault();
    closePopup();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const onPopupClick = (evt) => {
  evt.preventDefault();
  closePopup();
};


// Функция показывающая сообщение об успешном создании объявления
const showPopupSuccess = () => {
  document.body.appendChild(successMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  successMessage.addEventListener('click', onPopupClick);
};

// Функция показывающая сообщение об ошибке
const showErrorMessage = () => {
  document.body.appendChild(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  errorMessage.addEventListener('click', onPopupClick);
  errorButton.addEventListener('click', () => closePopup());
};

// Функция отправки созданных объявлений
const sendNewOffer = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendOfferData(
      () => showPopupSuccess(),
      () => showErrorMessage(),
      new FormData(evt.target),
    );
  });
};

sendNewOffer();

