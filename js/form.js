const form = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const titleInput = form.querySelector('#title');
const addressInput = form.querySelector('#address');
const priceInput = form.querySelector('#price');
const roomNumberSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');
const submitButton = form.querySelector('.ad-form__submit');

// Функция для проверки количества комнат и гостей

function getGuestsValidity (rooms, guests) {
  const roomsNumber = Number(rooms);
  const guestsNumber = Number(guests);

  if (guestsNumber > roomsNumber) {
    capacitySelect.setCustomValidity('Число гостей дожно быть не больше количества комнат');
  } else if (roomsNumber === 100 && guestsNumber !== 0) {
    capacitySelect.setCustomValidity('Выберите пункт (Не для гостей)');
  } else if (guestsNumber === 0 && roomsNumber !== 100) {
    capacitySelect.setCustomValidity('Выберите количество комнат - 100');
  } else {
    capacitySelect.setCustomValidity('');
  }

  capacitySelect.reportValidity();
  return true;
}

// Функции для деактивации форм

function disableForm () {
  const formFieldsets = form.querySelectorAll('fieldset');

  form.classList.add('ad-form--disabled');

  formFieldsets.forEach((element) => element.disabled = true);
}

function disableFilter() {
  const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
  const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');

  mapFilters.classList.add('map__filters--disabled');

  mapFiltersElements.forEach((element) => element.disabled = true);
  mapFiltersFieldsets.forEach((element) => element.disabled = true);
}

// Функции для активации форм

function enableForm () {
  const formFieldsets = form.querySelectorAll('fieldset');

  form.classList.remove('ad-form--disabled');
  formFieldsets.forEach((element) => element.disabled = false);
}

function enableFilter() {
  const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');
  const mapFiltersFieldsets = mapFilters.querySelectorAll('fieldset');

  mapFilters.classList.remove('map__filters--disabled');

  mapFiltersElements.forEach((element) => element.disabled = false);
  mapFiltersFieldsets.forEach((element) => element.disabled = false);
}

// Обработчик загрузки страницы

document.addEventListener('DOMContentLoaded', () => {
  disableForm();
  disableFilter();
});

// Обработчик ввода заголовка

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  const min = titleInput.getAttribute('minlength');
  const max = titleInput.getAttribute('maxlength');

  if (valueLength < min) {
    titleInput.setCustomValidity(`Ещё ${ min - valueLength } симв.`);
  } else if (valueLength > max) {
    titleInput.setCustomValidity(`Удалите лишние ${ valueLength - max } симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

// Обработчик ввода координат

addressInput.addEventListener('input', () => {
  addressInput.setCustomValidity('Это поле заполняется автоматически');
  addressInput.reportValidity();
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

// Обработчик отправки формы

submitButton.addEventListener('click', (evt) => {
  const rooms = roomNumberSelect.value;
  const guests = capacitySelect.value;

  if (!getGuestsValidity(rooms, guests)) {
    evt.preventDefault();
  }
});

export {enableForm, enableFilter};
