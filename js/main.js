function getRandomNumber (min, max) {
  return (Math.random() * (max - min)) + min;
}

function checkRange (min, max) {
  return min >= 0 && min < max;
}

function getRandomInt(min, max) {
  if (checkRange(min, max)) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.round(getRandomNumber(max, min));
  }

  return new Error('Функции передан неверный диапазон.');
}

function getRandomFloat(min, max, symbols) {
  if (checkRange(min, max) && symbols >= 0) {
    symbols = Math.round(symbols);
    return Number(getRandomNumber(min, max).toFixed(symbols));
  }

  return new Error('Функции передан неверный диапазон.');
}

getRandomInt(0, 10);

getRandomFloat(0, 10, 4);
