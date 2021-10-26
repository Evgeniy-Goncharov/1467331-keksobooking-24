import { loadMap, createMainOfferMarker, createSimilarOffersMarkers } from './map.js';
import { disableFilter, disableForm } from './form.js';
import { generateOffers } from './data.js';

const OFFERS_QUANTITY = 10;
const OFFERS = generateOffers(OFFERS_QUANTITY);

// Обработчик загрузки страницы

document.addEventListener('DOMContentLoaded', () => {
  disableForm();
  disableFilter();
  loadMap();
  createMainOfferMarker();
  createSimilarOffersMarkers(OFFERS);
});
