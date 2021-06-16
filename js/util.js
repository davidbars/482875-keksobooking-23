// import * as variables from './data.js';
import {AVATARS, OFFER_TITLES, OFFER_TYPE, OFFER_CHECKIN, OFFER_CHECKOUT, OFFER_FEAUTURES, OFFER_DESCRIPTIONS, OFFER_IMGS} from './data.js';


function getRandomPositiveInteger (a, b) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Math.floor(result);
}
function getRandomPositiveFloat (a, b, digits = 1) {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower) + lower;

  // И в конце с помощью метода toFixed любого числа в JavaScript
  // указать требуемое количество знаков после точки
  return result.toFixed(digits);
}

//записываем аватарки в массив
for ( let i = 1; i <= 11; i++ ) {
  const zeroInt = (i < 10) ? 0 : '';
  AVATARS.push(`img/avatars/user${  zeroInt  }${i  }.png`);
}

// возвращает рандомный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// возвращает рандомное кол-во  элементов массива
const getRandomArrayElements = (elements) => {
  const counter = getRandomPositiveInteger(1, elements.length);
  return elements.sort(() => Math.random() - Math.random()).slice(0, counter);
};

// вырезает рандомный элемент массива
const сutRandomArrayElement = (elements) => {
  const carrentElement = elements[getRandomPositiveInteger(0, elements.length - 1)];
  elements.splice(elements.indexOf(carrentElement), 1);

  return carrentElement;
};


const createOffer = () => {
  // эти значения вывел в переменные чтобы они совпадали на разных позициях
  const offerType = getRandomArrayElement(OFFER_TYPE);
  const offerAdressLat = getRandomPositiveFloat(35.65 , 35.70, 4);
  const offerAdressLng = getRandomPositiveFloat(139.70000 , 139.80000, 4);
  return {
    author : {
      avatar: сutRandomArrayElement(AVATARS),
    },

    offer : {
      title : `${getRandomArrayElement(OFFER_TITLES)  } ${  offerType}` ,
      adress: `${offerAdressLat  }, ${  offerAdressLng}`,
      price: getRandomPositiveInteger(10, 1000 ) * 1000,
      type : offerType,
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1, 9),
      checkin: getRandomArrayElement(OFFER_CHECKIN),
      checkout: getRandomArrayElement(OFFER_CHECKOUT),
      features: getRandomArrayElements(OFFER_FEAUTURES),
      description: сutRandomArrayElement(OFFER_DESCRIPTIONS),
      photos: getRandomArrayElements(OFFER_IMGS),
    },

    location : {
      lat : offerAdressLat,
      lng : offerAdressLng,
    },
  };
};


export {createOffer};
