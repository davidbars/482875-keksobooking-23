import {createOffer} from './util.js';
import {generateSimilarPopup} from './create-cards.js';

const similarOffers = new Array(1).fill(null).map(() => createOffer());

generateSimilarPopup(similarOffers);
