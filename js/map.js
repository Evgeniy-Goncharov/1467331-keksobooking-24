import {enableFilter, enableForm} from './form.js';
import { getOffer } from './offers.js';

const COORDS = {
  lat: 35.68225,
  lng: 139.75196,
};

let map;
const addressInput = document.querySelector('#address');

// Функция для добавления основного маркера

function createMainOfferMarker () {
  const mainPinIcon = L.icon({
    iconUrl: './../img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  });

  const mainPinMarker = L.marker(
    COORDS,
    {
      draggable: true,
      icon: mainPinIcon,
    },
  );

  mainPinMarker.addTo(map);

  mainPinMarker.on('moveend', (evt) => {
    const coords = evt.target.getLatLng();
    addressInput.value = `${coords.lat.toFixed(5)  }, ${  coords.lng.toFixed(5)}`;
  });
}

// Функция для создания одного похожего объявления

function createSimilarOfferMarker (offer, pinIcon) {
  const {location} = offer;
  const {lat, lng} = location;

  const marker = L.marker({
    lat,
    lng,
  },
  {
    draggable: true,
    icon: pinIcon,
  });

  marker.addTo(map).bindPopup(getOffer(offer));
}

// Функция добавления похожих объявлений

function createSimilarOffersMarkers (offers) {
  const pinIcon = L.icon({
    iconUrl: './../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  offers.forEach((offer) => createSimilarOfferMarker(offer, pinIcon));
}

// Функция добавления карты

function loadMap () {
  map = L.map('map-canvas')
    .on('load', () => {
      enableFilter();
      enableForm();
      addressInput.value = `${COORDS.lat  }, ${  COORDS.lng}`;
    })

    .setView(COORDS, 15);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
}

export {loadMap, createMainOfferMarker, createSimilarOffersMarkers};
