import {
  ICON_SIZE,
  ICON_ANCHOR,
  reset,
  mainMarker,
  map
} from './map-config.js';
import {getOffersData, showErrorPopup} from './data.js'; // создание массива обьектов обьявлений
import {generateSimilarPopup} from './create-cards.js';
import {restoreFormData, setAddress} from './util.js';
import {filterActivator} from './form.js';


// Добавляет слой с картой OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'},
).addTo(map);


mainMarker.addTo(map);

setAddress(mainMarker);

// Добавляет обработчик событий метки. При перемещение метки, возращаются новые координаты
mainMarker.on('moveend', () => {
  setAddress(mainMarker);
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


const renderPins = () => {
  getOffersData(
    (offers) => {
      offers.slice(0, 10).forEach((point) => {
        createMarker(point);
      });
    },
    () => {
      showErrorPopup('Вoзникла шибка при загрузке данных. проверьте корректность и попробуйте ещё раз.');
    },
  );
};

reset.addEventListener('click', (evt) => {
  evt.preventDefault();
  restoreFormData();
  renderPins();
  map.closePopup();
});

const clearMarker = () => {
  markerGroup.clearLayers();
};


// получаем данные обьявлений и отрисовуем их на карте
getOffersData(
  (offers) => {
    offers.slice(0, 10).forEach((point) => {
      createMarker(point);
    });
    filterActivator(true);

  },
  () => {
    showErrorPopup('Вoзнwикла шибка при загрузке данных. проверьте корректность и попробуйте ещё раз.');
  },
);

export {createMarker, clearMarker, renderPins} ;
