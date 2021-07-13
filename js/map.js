import {formActivator} from './form.js'; // активация формы
import {getOffersData, showErrorPopup} from './data.js'; // создание массива обьектов обьявлений
import {generateSimilarPopup} from './create-cards.js'; // создание(html) попапов на основе "similarOffers"

const PRICE = 1000;
const MAP_SCALE = 14;
const LAT_CENTER_TOKYO = 35.67741;
const LNG_CENTER_TOKYO = 139.76426;
const MAIN_ICON_SIZE = [52, 52];
const MAIN_ICON_ANCHOR = [26, 52];
const ICON_SIZE = [40, 40];
const ICON_ANCHOR = [20, 40];
const filters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');
const address = adForm.querySelector('#address');
const reset = adForm.querySelector('.ad-form__reset');
const price = adForm.querySelector('#price');


const setAddress = (marker) => {
  const coordinates = marker.getLatLng();
  address.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
};

// Добавляет Leaflet

const map = L.map('map-canvas')
  .on('load', () => {
    formActivator(true);
  })
  .setView({
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  }, MAP_SCALE);

// Добавляет слой с картой OpenStreetMap

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},
).addTo(map);

// Меняет изображение основной метки на кастомную

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_ICON_SIZE,
  iconAnchor: MAIN_ICON_ANCHOR,
});

// Добавляет основную метку

const mainMarker = L.marker(
  {
    lat: LAT_CENTER_TOKYO,
    lng: LNG_CENTER_TOKYO,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

setAddress(mainMarker);

// Добавляет обработчик событий метки. При перемещение метки, возращаются новые координаты

mainMarker.on('moveend', () => {
  setAddress(mainMarker);
});

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

reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  restoreFormData();
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (point) => {

  const {lat, lng} = point.location;

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: ICON_SIZE,
    iconAnchor: ICON_ANCHOR,
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(
      generateSimilarPopup(point),

      {
        keepInView: true,
      },
    );

};

// получаем данные обьявлений и отрисовуем их на карте
const fetchOffers = getOffersData(
  (offers) => {
    offers.slice(0, 10).forEach((point) => {
      createMarker(point);
    });
  },
  () => {
    showErrorPopup('Вoзникла шибка при загрузке данных. проверьте корректность и попробуйте ещё раз.');
  },
);

fetchOffers();


export {restoreFormData};
