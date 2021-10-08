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
    let j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return shuffledItems;
}

function getRandomShuffledArray (items) {
  const randomItems = shuffleArray(items);
  return randomItems.slice(0, getRandomInt(0, randomItems.length));
}

export {getRandomInt, getRandomFloat, getRandomElement, getRandomShuffledArray};
