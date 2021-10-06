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

function getRandomElement(array) {
  return array[getRandomInt(0, array.length - 1)];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

function getRandomShuffledArray (array) {
  const randomArray = shuffleArray(array.slice());
  return randomArray.slice(getRandomInt(0, randomArray.length));
}

// Объявляем фунццию для создания author

function generateAutor(index) {
  const author = String(index).padStart(2, 0);

  return {
    avatar: `img/avatars/user${author}.png`,
  };
}

// Функция для получения случайных преимуществ в объвлении

// Объявляем исходные массивы данных для объявлений

const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_TIMES = ['12:00', '13:00', '14:00'];
const OFFER_FOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

// Описываем функцию для создания одного объявления

function getOffer(index, location) {
  const time = getRandomElement(OFFER_TIMES);
  const offer = {
    title: `Заголовок ${  index}`,
    address: `${String(location.lat)  }, ${ String(location.lng)}`,
    price: getRandomInt(100000, 1000000),
    type: getRandomElement(OFFER_TYPES),
    rooms: getRandomInt(1, 10),
    guests: getRandomInt(1, 10),
    checkin: time,
    checkout: time,
    features: getRandomShuffledArray(OFFER_FEATURES),
    description: `Описание ${  index}`,
    photos: getRandomShuffledArray(OFFER_FOTOS),
  };

  return offer;
}

// Собираем объявления в массив

function generateOffers(length) {
  const offers = [];

  for (let count = 0; count < length; count++) {
    const location = {
      lat: getRandomFloat(35.65000, 35.70000, 5),
      lng: getRandomFloat(139.70000, 139.80000, 5),
    };
    offers.push({
      author: generateAutor(count + 1),
      offer: getOffer(count + 1, location),
      location: location,
    });
  }

  return offers;
}

generateOffers(10);
