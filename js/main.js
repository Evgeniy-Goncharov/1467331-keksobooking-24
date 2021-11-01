import { disableFilter, disableForm, setFormSubmit } from './form.js';
import { loadMap, createMainOfferMarker, createSimilarOffersMarkers } from './map.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const OFFERS_QUANTITY = 20;

disableForm();
disableFilter();
loadMap();
createMainOfferMarker();
getData(createSimilarOffersMarkers, showAlert);
setFormSubmit(disableForm);

export { OFFERS_QUANTITY };
