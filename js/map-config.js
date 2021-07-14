import {formActivator} from './form.js'; // активация формы


export const PRICE = 1000;
export const MAP_SCALE = 14;
export const LAT_CENTER_TOKYO = 35.67741;
export const LNG_CENTER_TOKYO = 139.76426;
export const MAIN_ICON_SIZE = [52, 52];
export const MAIN_ICON_ANCHOR = [26, 52];
export const ICON_SIZE = [40, 40];
export const ICON_ANCHOR = [20, 40];
export const filters = document.querySelector('.map__filters');
export const adForm = document.querySelector('.ad-form');
export const address = adForm.querySelector('#address');
export const reset = adForm.querySelector('.ad-form__reset');
export const price = adForm.querySelector('#price');


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ICON_ANCHOR,
});

export const mainMarker = L.marker(
  {
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// Добавляет Leaflet
export const map = L.map('map-canvas')
  .on('load', () => {
    formActivator(true);
  })
  .setView({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  }, MAP_SCALE);
