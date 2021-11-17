import { enableForm } from './form.js';
import { enableFilter, setFilterClick } from './filter.js';
import { getOffer } from './offers.js';
import { OFFERS_QUANTITY } from './main.js';
import { getData } from './api.js';
import { debounce, showAlert } from './util.js';

const CREATE_MARKER_DELAY = 500;
const COORDS = {
  lat: 35.68225,
  lng: 139.75196,
};
const SCALE = 15;

const addressInput = document.querySelector('#address');
const mainIconUrl = './img/main-pin.svg';
const mainIconSizes = [52, 52];
const mainIconAnchorCoords = [26, 52];
const iconUrl = './img/pin.svg';
const iconSizes = [40, 40];
const iconAnchorCoords = [20, 40];
const mainPinIcon = L.icon({
  iconUrl: mainIconUrl,
  iconSize: mainIconSizes,
  iconAnchor: mainIconAnchorCoords,
});
const mainPinMarker = L.marker(
  COORDS,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

let map;
let markerGroup;

// Функция добавления карты

function loadMap () {
  map = L.map('map-canvas')
    .on('load', () => {
      getData((offers) => {
        createSimilarOffersMarkers(offers);
        enableFilter();
        enableForm();
        setFilterClick(offers, debounce(createSimilarOffersMarkers, CREATE_MARKER_DELAY));
      }, () => {
        showAlert();
        enableForm();
      });
      addressInput.value = `${COORDS.lat  }, ${  COORDS.lng}`;
    })

    .setView(COORDS, SCALE);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  markerGroup = L.layerGroup().addTo(map);
}

// Функция для добавления основного маркера

function createMainOfferMarker () {
  mainPinMarker.addTo(map);

  mainPinMarker.on('move', (evt) => {
    const coords = evt.target.getLatLng();
    addressInput.value = `${coords.lat.toFixed(5)  }, ${  coords.lng.toFixed(5)}`;
  });
}

// Чистим метки

function clearMarkers () {
  markerGroup.clearLayers();
}

// Закрываем попапы

function closePopup () {
  map.closePopup();
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
    draggable: false,
    icon: pinIcon,
  });

  marker.addTo(markerGroup).bindPopup(getOffer(offer));
}

// Функция добавления похожих объявлений

function createSimilarOffersMarkers (offers) {
  clearMarkers();

  const pinIcon = L.icon({
    iconUrl: iconUrl,
    iconSize: iconSizes,
    iconAnchor: iconAnchorCoords,
  });

  offers.slice(0, OFFERS_QUANTITY).forEach((offer) => createSimilarOfferMarker(offer, pinIcon));
}

// Сбрасываем карту

function resetMap () {
  map.setView(
    COORDS,
    SCALE,
  );
  mainPinMarker.setLatLng(COORDS);
}

export {addressInput, COORDS, loadMap, createMainOfferMarker, resetMap, createSimilarOffersMarkers, closePopup, clearMarkers };
