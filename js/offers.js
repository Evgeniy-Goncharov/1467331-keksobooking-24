const HOUSE_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const offerTemplate = document.querySelector('#card').content.querySelector('.popup');

// Функция для получения разметки списка преимуществ

function getOfferFeatures(card, features = []) {
  const templateFeatures = card.querySelector('.popup__features');

  if (features.length > 0) {
    const featuresList = templateFeatures.querySelectorAll('.popup__feature');

    featuresList.forEach((featuresListItem) => {
      const isNecessary = features.some(
        (feature) => featuresListItem.classList.contains(`popup__feature--${ feature}`),
      );

      if (!isNecessary) {
        featuresListItem.remove();
      }
    });
  } else {
    templateFeatures.classList.add('hidden');
  }
}

// Функция для получения разметки списка фотографий

function getOfferPhotos (card, photos = []) {
  const photosList = card.querySelector('.popup__photos');

  if (photos.length > 0) {
    const photosItem = photosList.querySelector('img');
    const photosListFragment = document.createDocumentFragment();

    photos.forEach((photo) => {
      const newPhotosItem = photosItem.cloneNode(true);
      newPhotosItem.src = photo;
      photosListFragment.appendChild(newPhotosItem);
    });

    photosList.innerHTML = '';
    photosList.appendChild(photosListFragment);
  } else {photosList.classList.add('hidden');}
}

// Функция для получения разметки объявления

function getOffer({author, offer}) {
  const card = offerTemplate.cloneNode(true);
  const {title, address, price, type, rooms, guests, checkin, checkout, description, features, photos} = offer;

  function changeTextContent(selector, content) {
    if (content) {
      card.querySelector(selector).textContent = content;
      return;
    }

    card.querySelector(selector).classList.add('hidden');
  }

  if (author.avatar) {
    card.querySelector('.popup__avatar').src = author.avatar;
  } else {card.querySelector('.popup__avatar').classList.add('hidden');}

  changeTextContent('.popup__title', title);
  changeTextContent('.popup__text--address', address);
  changeTextContent('.popup__text--price', `${price  } ₽/ночь`);
  changeTextContent('.popup__type', HOUSE_TYPES[type]);
  changeTextContent('.popup__text--capacity', `${rooms  } комнаты для ${  guests  } гостей`);
  changeTextContent('.popup__text--time', `Заезд после ${ checkin }, выезд до ${ checkout}`);
  changeTextContent('.popup__description', description);
  getOfferFeatures(card, features);
  getOfferPhotos(card, photos);

  return card;
}

export {getOffer};
