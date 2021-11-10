import { disableForm, setFormSubmit } from './form.js';
import { disableFilter } from './filter.js';
import { createMainOfferMarker, loadMap } from './map.js';
import './upload.js';

const OFFERS_QUANTITY = 10;


disableForm();
disableFilter();
loadMap();
createMainOfferMarker();
setFormSubmit(disableForm);

export { OFFERS_QUANTITY };
