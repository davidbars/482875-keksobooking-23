import {createOffer} from './util.js';
import {generateSimilarPopup} from './create-cards.js';

const similarOffers = new Array(10).fill(null).map(() => createOffer());
generateSimilarPopup(similarOffers);
