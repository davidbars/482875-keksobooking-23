import {getOffersData, showErrorPopup} from './data.js';
import {createMarker, clearMarker} from './map.js';
import {isMatchedValues, isMatchedPrice, isMatchedFeatures, debounce} from './util.js';


const SIMILAR_ADS_COUNT = 10;
const TIMEOUT_DELAY = 500;
const filters = document.querySelector('.map__filters');
const housingType = filters.querySelector('#housing-type');
const housingPrice = filters.querySelector('#housing-price');
const housingRooms = filters.querySelector('#housing-rooms');
const housingGuests = filters.querySelector('#housing-guests');

const filtersAds = () => {
  const housingFeatures = document.querySelectorAll('#housing-features input:checked');
  clearMarker();
  getOffersData(
    (offers) => {
      offers.filter((ads) =>
        isMatchedValues(ads.offer.type, housingType.value)
          && isMatchedPrice(ads.offer.price, housingPrice.value)
          && isMatchedValues(ads.offer.rooms, housingRooms.value)
          && isMatchedValues(ads.offer.guests, housingGuests.value)
          && isMatchedFeatures(ads.offer.features, Array.from(housingFeatures).map(el => el.value)),
      )
      .slice(0, SIMILAR_ADS_COUNT)
      .forEach((point) => {
        createMarker(point);
      });
    },
    () => {
      showErrorPopup('Вoзникла шибка при загрузке данных. проверьте корректность и попробуйте ещё раз.');
    },
  );
};

const setFilteredAds = debounce(filtersAds, TIMEOUT_DELAY);

filters.addEventListener('change', () => {
  setFilteredAds();

});
