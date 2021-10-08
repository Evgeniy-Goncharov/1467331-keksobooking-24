import {getRandomInt, getRandomFloat, getRandomElement, getRandomShuffledArray} from './util.js';

// Объявляем исходные массивы И константы данных для объявлений

const OFFERS_QUANTITY = 10;
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_TIMES = ['12:00', '13:00', '14:00'];
const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const LATITUDE_RANGE = {
  start: 35.65000,
  end: 35.70000,
};
const LONGITUDE_RANGE = {
  start: 139.70000,
  end: 139.80000,
};

// Объявляем фунццию для создания author

function generateAuthor(index) {
  const author = String(index).padStart(2, 0);

  return {
    avatar: `img/avatars/user${author}.png`,
  };
}

// Описываем функцию для создания одного объявления

function getOffer(index, location) {
  const time = getRandomElement(OFFER_TIMES);
  const offer = {
    title: `Заголовок ${index}`,
    address: `${location.lat}, ${location.lng}`,
    price: getRandomInt(1000, 1000000),
    type: getRandomElement(OFFER_TYPES),
    rooms: getRandomInt(1, 10),
    guests: getRandomInt(1, 10),
    checkin: time,
    checkout: time,
    features: getRandomShuffledArray(OFFER_FEATURES),
    description: `Описание ${index}`,
    photos: getRandomShuffledArray(OFFER_PHOTOS),
  };

  return offer;
}

// Собираем объявления в массив

function generateOffers(length) {
  const offers = [];

  for (let count = 1; count <= length; count++) {
    const location = {
      lat: getRandomFloat(LATITUDE_RANGE.start, LATITUDE_RANGE.end, 5),
      lng: getRandomFloat(LONGITUDE_RANGE.start, LONGITUDE_RANGE.end, 5),
    };
    offers.push({
      author: generateAuthor(count),
      offer: getOffer(count, location),
      location: location,
    });
  }

  return offers;
}

export {generateOffers, OFFERS_QUANTITY};
