// Функция возвращает случайное целое число из диапазона, включая значения.

function getRandomInt(min, max) {
  if (min >= 0 && min < max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    const randomInt = Math.round(Math.random() * (max - min)) + min;
    return randomInt;
  }

  return 'Функции передан неверный диапазон.';
}

// Функция возвращает случайное число из диапазона c требуемым количеством знаков после запятой включая значения.

function getRandomNumber(min, max, symbols) {
  if (min >= 0 && min < max && symbols >= 0) {
    symbols = Math.round(symbols);
    let randomNumber = (Math.random() * (max - min)) + min; //Получаем случайное число
    randomNumber = Math.trunc(randomNumber * Math.pow(10, symbols)) / Math.pow(10, symbols); //Оставляем нужное количество знаков после запятой
    return randomNumber;
  }

  return 'Функции передан неверный диапазон.';
}

getRandomInt(0, 10);

getRandomNumber(0, 10, 4);
