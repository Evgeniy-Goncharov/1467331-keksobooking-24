const form = document.querySelector('.ad-form');
const titleInput = form.querySelector('#title');
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

  console.log(rooms + ' ' +guests);

  if (!getGuestsValidity(rooms, guests)) {
    console.log('Неверное количество гостей');
    evt.preventDefault();
  }
});
