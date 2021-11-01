const ALERT_SHOW_TIME = 5000;

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

function getRandomElement(items) {
  return items[getRandomInt(0, items.length - 1)];
}

function shuffleArray(items) {
  const shuffledItems = items.slice();
  for (let i = items.length - 1; i > 0; i--) {
    const randomItem = Math.floor(Math.random() * (i + 1));
    [items[i], items[randomItem]] = [items[randomItem], items[i]];
  }

  return shuffledItems;
}

function getRandomShuffledArray (items) {
  const randomItems = shuffleArray(items);
  return randomItems.slice(0, getRandomInt(0, randomItems.length));
}

function showAlert (message) {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

export { getRandomInt, getRandomFloat, getRandomElement, getRandomShuffledArray, showAlert };
