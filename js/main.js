import {generateOffers} from './data.js';
import {getOffer} from './offers.js';
import {getRandomInt} from './util.js';
import './form.js';

const OFFERS_QUANTITY = 10;
const offersList = generateOffers(OFFERS_QUANTITY);

getOffer(offersList[getRandomInt(1, OFFERS_QUANTITY)]);
