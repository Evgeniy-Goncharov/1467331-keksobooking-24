import { disableForm, setFormSubmit } from './form.js';
import { disableFilter, setFilterClick } from './filter.js';
import { loadMap, createMainOfferMarker, createSimilarOffersMarkers } from './map.js';
import { getData } from './api.js';
import { showAlert, debounce } from './util.js';
import './upload.js';

const OFFERS_QUANTITY = 10;
const CREATE_MARKER_DELAY = 500;

disableForm();
disableFilter();
loadMap();
createMainOfferMarker();
getData((offers) => {
  createSimilarOffersMarkers(offers);
  setFilterClick(offers, debounce(createSimilarOffersMarkers, CREATE_MARKER_DELAY));
}, showAlert);
setFormSubmit(disableForm);

export { OFFERS_QUANTITY };
