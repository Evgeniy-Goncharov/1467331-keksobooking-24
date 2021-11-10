import { loadedOffers, sendData } from './api.js';
import { COORDS, addressInput, resetMap, closePopup, createSimilarOffersMarkers } from './map.js';
import { clearFilter } from './filter.js';
import { clearFileUploadPreview } from './upload.js';

const MIN_GUESTS = 0;
const MAX_ROOMS = 100;
const BUNGALOW_MIN_PRICE = 0;
const FLAT_MIN_PRICE = 1000;
const HOTEL_MIN_PRICE = 3000;
const HOUSE_MIN_PRICE = 5000;
const PALACE_MIN_PRICE = 10000;

const form = document.querySelector('.ad-form');
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const defaultMinPrice = priceInput.min;
const typeSelect = form.querySelector('#type');
const timeInSelect = form.querySelector('#timein');
const timeOutSelect = form.querySelector('#timeout');
const roomNumberSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');
const submitButton = form.querySelector('.ad-form__submit');
const resetButton = form.querySelector('.ad-form__reset');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const formFieldsets = form.querySelectorAll('fieldset');

let message;

// Функция для проверки количества комнат и гостей

function getGuestsValidity (rooms, guests) {
  const roomsNumber = Number(rooms);
  const guestsNumber = Number(guests);

  if (guestsNumber > roomsNumber) {
    capacitySelect.setCustomValidity('Число гостей дожно быть не больше количества комнат');
  } else if (roomsNumber === MAX_ROOMS && guestsNumber !== MIN_GUESTS) {
    capacitySelect.setCustomValidity('Выберите пункт (Не для гостей)');
  } else if (guestsNumber === MIN_GUESTS && roomsNumber !== MAX_ROOMS) {
    capacitySelect.setCustomValidity('Выберите количество комнат - 100');
  } else {
    capacitySelect.setCustomValidity('');
  }

  capacitySelect.reportValidity();
  return true;
}

// Функции для деактивации формы

function disableForm () {
  form.classList.add('ad-form--disabled');

  formFieldsets.forEach((element) => element.disabled = true);
}

// Активации форм

function enableForm () {
  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((element) => element.disabled = false);
}

// Очитска полей

function clearForm () {
  priceInput.min = defaultMinPrice;
  priceInput.placeholder = defaultMinPrice;
  form.reset();
  addressInput.value = `${COORDS.lat}, ${COORDS.lng}`;
  clearFileUploadPreview();
}

// Получаем минимальное значение в поле "Цена за ночь"

function getMinPrice(type) {
  switch(type) {
    case 'bungalow':
      return BUNGALOW_MIN_PRICE;
    case 'flat':
      return FLAT_MIN_PRICE;
    case 'hotel':
      return HOTEL_MIN_PRICE;
    case 'house':
      return HOUSE_MIN_PRICE;
    case 'palace':
      return PALACE_MIN_PRICE;
  }
}

// Синхронизируем поля "въезд, выезд"

function synchronizeTimeInputs (time) {
  timeInSelect.value = time;
  timeOutSelect.value = time;
}

// Обработчик ввода заголовка

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  const min = titleInput.minLength;
  const max = titleInput.maxLength;

  if (valueLength < min) {
    titleInput.setCustomValidity(`Ещё ${ min - valueLength } симв.`);
  } else if (valueLength > max) {
    titleInput.setCustomValidity(`Удалите лишние ${ valueLength - max } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

// Обработчик типа жилья

typeSelect.addEventListener('change', (evt) => {
  const minPrice = getMinPrice(evt.target.value);
  priceInput.min = minPrice;
  priceInput.placeholder = minPrice;
});

// Обработчик ввода цены

priceInput.addEventListener('input', () => {
  const max = Number(priceInput.max);
  const value = Number(priceInput.value);

  if (value > max) {
    priceInput.setCustomValidity(`Введите число до ${ max }`);
  }  else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

// Обработчик времени заезда

timeInSelect.addEventListener('change', (evt) => {
  synchronizeTimeInputs(evt.target.value);
});

// Обработчик времени выезда

timeOutSelect.addEventListener('change', (evt) => {
  synchronizeTimeInputs(evt.target.value);
});

// Обработчик ввода количества комнат

roomNumberSelect.addEventListener('change', (evt) => {
  const rooms = evt.target.value;
  const guests = capacitySelect.value;

  getGuestsValidity(rooms, guests);
});

// Обработчик ввода количества гостей

capacitySelect.addEventListener('change', (evt) => {
  const guests = evt.target.value;
  const rooms = roomNumberSelect.value;

  getGuestsValidity(rooms, guests);
});

// Обработчик кнопки отправки формы

submitButton.addEventListener('click', (evt) => {
  const rooms = roomNumberSelect.value;
  const guests = capacitySelect.value;

  if (!getGuestsValidity(rooms, guests)) {
    evt.preventDefault();
  }
});

// Кнопка очистки формы

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  clearFilter();
  clearForm();
  closePopup();
  resetMap();
  createSimilarOffersMarkers(loadedOffers);
});


// Обработчик отправки формы
function setFormSubmit () {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    sendData(() => {
      showSuccessMessage();
      clearFilter();
      clearForm();
      closePopup();
      resetMap();
      createSimilarOffersMarkers(loadedOffers);
    }, showErrorMessage, formData);
  });
}

// Обработчик нажатия Esc

function onMessageEscKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault;
    message.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  }
}

// Показываем сообщение об успешной отправке формы

function showSuccessMessage () {
  message = successMessageTemplate.cloneNode(true);

  message.addEventListener('click', () => {
    message.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  });

  document.addEventListener('keydown', onMessageEscKeydown);

  document.body.appendChild(message);
}

// Показываем сообщение об ошибке

function showErrorMessage () {
  message = errorMessageTemplate.cloneNode(true);
  const messageCloseButton = message.querySelector('.error__button');

  document.addEventListener('keydown', onMessageEscKeydown);

  message.addEventListener('click', () => {
    message.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  });

  messageCloseButton.addEventListener('click', () => {
    message.remove();
    document.removeEventListener('keydown', onMessageEscKeydown);
  });

  document.body.appendChild(message);
}

export { disableForm, enableForm, clearForm, setFormSubmit, form };
