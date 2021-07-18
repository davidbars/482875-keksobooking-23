import {getOffersData} from './data.js';
import {createMarker, clearMarker} from './map.js';
import {isMatchedFilter, isMatchedPrice, isMatchedFeatures, debounce} from './util.js';


const SIMILAR_ADS_COUNT = 10;
const TIMEOUT_DELAY = 500;
const filters = document.querySelector('.map__filters');
const housingType = filters.querySelector('#housing-type');
const housingPrice = filters.querySelector('#housing-price');
const housingRooms = filters.querySelector('#housing-rooms');
const housingGuests = filters.querySelector('#housing-guests');

const getOptimalCount = function (offersArray) {
  if (offersArray.length > 10) {
    return offersArray.slice(0, SIMILAR_ADS_COUNT);
  } else {
    return offersArray;
  }

};

const filtersAds = () => {
  clearMarker();
  const fetchOffers = getOffersData(
    (offers) => {
      getOptimalCount(offers.filter((ads) =>
        isMatchedFilter(ads.offer.type, housingType.value)
            && isMatchedPrice(ads.offer.price, housingPrice.value)
            && isMatchedFilter(ads.offer.rooms, housingRooms.value)
            && isMatchedFilter(ads.offer.guests, housingGuests.value)
            && isMatchedFeatures(ads.offer.features),
      )).forEach((point) => {
        createMarker(point);
      });
    },
  );

  fetchOffers();
};

const setFilteredAds = debounce(filtersAds, TIMEOUT_DELAY);

filters.addEventListener('change', () => {
  setFilteredAds();

});
