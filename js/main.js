import { disableForm, setFormSubmit } from './form.js';
import { disableFilter } from './filter.js';
import { loadMap, createMainOfferMarker, createSimilarOffersMarkers } from './map.js';
import { getData } from './api.js';
import { showAlert } from './util.js';

const OFFERS_QUANTITY = 10;

disableForm();
disableFilter();
loadMap();
createMainOfferMarker();
getData(createSimilarOffersMarkers, showAlert);
setFormSubmit(disableForm);

export { OFFERS_QUANTITY };
