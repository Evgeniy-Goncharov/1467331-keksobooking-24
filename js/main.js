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

// Объявляем функцию для создания исходных массивов

function createArray (length, cb) {
  let index = 1;
  const array = [];

  while (array.length < length) {
    cb(index, array);
    index++;
  }

  return array;
}

// Объявляем фунццию для создания и добавления в массив объекта author

function createOfferAuthor(index, array) {
  const author = {
    avatar: 'img/avatars/user',
  };

  if (index < 10) {
    author.avatar += `0${  index  }.png`;
  } else {
    author.avatar += `${index  }.png`;
  }

  array.push(author);
  index++;
}

// Генерируем случайный массив преимуществ

function getOfferFeatures() {
  const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const offerFeatures = [];

  for (let count = 0; count < getRandomInt(0, features.length); count++) {
    const index = getRandomInt(0, features.length -1);
    offerFeatures.push(features[index]);
    features.splice(index, 1);
  }

  return offerFeatures;
}

// Объявляем и генерируем исходные массивы данных для объявлений

const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
const OFFER_FOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


const offerAuthors = createArray(10, createOfferAuthor);
const offerTitles = createArray(10, (index, array) => {
  array.push(`Заголовок ${  index}`);
  return index;
});
const offerAdresses = createArray(10, (index, array) => array.push(`${getRandomFloat(1, 100, 2)  }, ${  getRandomFloat(1, 100, 2)}`));
const offerDescriptions = createArray(10, (index, array) => array.push(`Описание ${  index}`));

// Описываем функцию для создания одного объявления

function getOffer(arrayIndex) {
  const offer = {
    title: offerTitles[arrayIndex],
    adress: offerAdresses[arrayIndex],
    price: getRandomInt(100000, 1000000),
    type: OFFER_TYPES[getRandomInt(0, 4)],
    rooms: getRandomInt(1, 10),
    guests: getRandomInt(1, 10),
    checkin: OFFER_CHECKINS[getRandomInt(0, 2)],
    checkout: OFFER_CHECKINS[getRandomInt(0, 2)],
    features: getOfferFeatures(),
    description: offerDescriptions[arrayIndex],
    photos: OFFER_FOTOS.slice(getRandomInt(0, OFFER_FOTOS.length), getRandomInt(0, OFFER_FOTOS.length)),
    location: {
      lat: getRandomFloat(35.65000, 35.70000, 5),
      lng: getRandomFloat(139.70000, 139.80000, 5),
    },
  };

  return offer;
}

// Собираем объявления в массив

function getOffers(length) {
  const offers = [];

  for (let count = 0; count < length; count++) {
    offers[count] = {
      author: offerAuthors[count],
      offer: getOffer(count),
    };
  }

  return offers;
}

getOffers(10);
