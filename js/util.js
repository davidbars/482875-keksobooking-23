import {
  PRICE,
  MAP_SCALE,
  LAT_CENTER_TOKYO,
  LNG_CENTER_TOKYO,
  filters,
  adForm,
  price ,
  mainMarker,
  map,
  address
} from './map-config.js';


const PriceCategories = {
  middle: 'middle',
  low: 'low',
  high: 'high',
};

const PricesRange = {
  low: 10000,
  high: 50000,
};


const isEscKeydown = (evt) => evt.key === 'Esc' || evt.key === 'Escape';

const setAddress = (marker) => {
  const coordinates = marker.getLatLng();
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};


const restoreFormData = () => {
  mainMarker.setLatLng({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  });
  map.setView({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  }, MAP_SCALE);
  filters.reset();
  adForm.reset();
  price.min = PRICE;
  price.placeholder = PRICE;
  setAddress(mainMarker);
};


const isMatchedFilter = (findings, filterValue) =>
  String(findings) === String(filterValue) || filterValue === 'any';


const isMatchedPrice = (findings, filterValue) => {
  if (filterValue === PriceCategories.low) {
    return findings < PricesRange.low;
  }
  if (filterValue === PriceCategories.middle) {
    return findings >= PricesRange.low && findings < PricesRange.high;
  }
  if (filterValue === PriceCategories.high) {
    return findings >= PricesRange.high;
  }
  return true;
};


const isMatchedFeatures = (findings) => {
  const checkedFeatures = document.querySelectorAll('input:checked');
  return Array.from(checkedFeatures).every((feature) => {
    if (findings) {
      return findings.includes(feature.value);
    }
  });
};


const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {isEscKeydown, restoreFormData, setAddress, isMatchedFeatures, isMatchedFilter, isMatchedPrice, debounce};
