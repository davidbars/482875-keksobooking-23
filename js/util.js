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
} from './map-config.js';


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

export {isEscKeydown, restoreFormData, setAddress};
