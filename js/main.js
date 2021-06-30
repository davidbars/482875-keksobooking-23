import {createOffer} from './util.js';
import {formActivator} from './form.js';
import {generateSimilarPopup} from './create-cards.js';

// makeFormState(false);

const similarOffers = new Array(10).fill(null).map(() => createOffer());
generateSimilarPopup(similarOffers);

//если передать true форма включается, если передать false или ничего не передать то форма деактивируется
formActivator();
