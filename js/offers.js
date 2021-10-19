import {generateOffers} from './data.js';

// Объявляем константы

const OFFERS_QUANTITY = 10;
const HOUSE_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// Объявляем переменные

const map = document.querySelector('.map__canvas');
const offersList = generateOffers(OFFERS_QUANTITY);
const offerTemplate = document.querySelector('#card').content.querySelector('.popup');
const cardListFragment = document.createDocumentFragment();

// Функция для получения разметки списка преимуществ

function getOfferFeatures(card, features) {
  const templateFeatures = card.querySelector('.popup__features');
  const featuresList = templateFeatures.querySelectorAll('.popup__feature');

  featuresList.forEach((featuresListItem) => {
    const isNecessary = features.some(
      (feature) => featuresListItem.classList.contains(`popup__feature--${ feature}`),
    );

    if (!isNecessary) {
      featuresListItem.remove();
    }
  });
}

// Функция для получения разметки списка фотографий

function getOfferPhotos (card, photos) {
  const photosList = card.querySelector('.popup__photos');
  const photosItem = photosList.querySelector('img');
  const photosListFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const newPhotosItem = photosItem.cloneNode(true);
    newPhotosItem.src = photo;
    photosListFragment.appendChild(newPhotosItem);
  });

  photosList.innerHTML = '';
  photosList.appendChild(photosListFragment);
}

// Функция для получения разметки описания объявления

function getOfferDescription(card, {title, addres, price, type, rooms, guests, description, checkin, checkout, features, photos}) {
  function changeTextContent(id, content) {
    card.querySelector(id).textContent = content;
  }

  changeTextContent('.popup__title', title);
  changeTextContent('.popup__text--address', addres);
  card.querySelector('.popup__text--price').textContent = `${price  } ₽/ночь`;
  changeTextContent('.popup__type', HOUSE_TYPES[type]);
  card.querySelector('.popup__text--capacity').textContent = `${rooms  } комнаты для ${  guests  } гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${ checkin }, выезд до ${ checkout}`;
  changeTextContent('.popup__description', description);
  getOfferFeatures(card, features);
  getOfferPhotos(card, photos);
}

offersList.forEach(({author, offer}) => {
  const card = offerTemplate.cloneNode(true);

  card.querySelector('.popup__avatar').src = author.avatar;
  getOfferDescription(card, offer);
  cardListFragment.appendChild(card);
});

map.appendChild(cardListFragment.firstChild);
