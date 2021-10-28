import { disableFilter, disableForm } from './form.js';
import { loadMap, createMainOfferMarker, createSimilarOffersMarkers } from './map.js';
import { generateOffers } from './data.js';

const OFFERS_QUANTITY = 10;
const offers = generateOffers(OFFERS_QUANTITY);

// Обработчик загрузки страницы


  disableForm();
  disableFilter();
  loadMap();
  createMainOfferMarker();
  createSimilarOffersMarkers(offers);

