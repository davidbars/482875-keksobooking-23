
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

// массив аватарок
const AVATARS = [];

// массив аватарок
const OFFER_TITLES = [
  'Bisness',
  'Cozy',
  'Beautiful',
  'Luxary',
  'Nice',
  'Georges',
  'Stylish',
  'Modern',
  'Contemporary',
  'New',
  'Comfortable',
  'Great',
];

//тип жилья
const OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

// время поселения
const OFFER_CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

// время выселения
const OFFER_CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

// дополнительные опции
const OFFER_FEAUTURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

// описание квартиры
const OFFER_DESCRIPTIONS = [
  'The living is easy in this impressive, generously proportioned contemporary residence with lake and ocean views, located within a level stroll to the sand and surf.',
  'This immaculately presented apartment is set amongst manicured grounds within a private and secure complex. As a resident, you will have access to lifestyle amenities including a lap pool, gymnasium, communal terraces, concierge service and basement parking.',
  'Prepare to be impressed when you enter this superbly maintained and presented home set on a sprawling 1/2 acre parcel of land occupying a peaceful street position.',
  'Cool, calm and sophisticated with a youthful edge, this functional home is enveloped in light and comfort. Crisp white walls, timber floors, and high ceilings create a style as timeless as the sparkling ocean view. The calming sea vista, captured through the extensive use of glass, will help you forget your city stress.',
  'Embrace the spirit of DIY with this original cottage occupying a peaceful street position. This charming weatherboard home features 3 roomy bedrooms and bright, open living spaces.',
  'Magnificent ocean and beach views consume the top floor of this meticulously finished and modern property. Bi-fold doors create a seamless flow from the vast dining, kitchen and living areas to the expansive deck perfect for entertaining.',
  'The house comes complete with two living rooms, a welcoming kitchen/dining area, two bathrooms, four bedrooms, a study, and a laundry, and retains the value of peaceful living while being conveniently close to shops, school and transport.',
  'Soaring ceilings, white walls and timber floors add a dramatic tone to the all-encompassing view. Enjoy the comfort of a cool, shady cabana between dips in the saltwater pool or dive into the surf, just a few sandy steps from your front door.',
  'This house screams ‘designer’ and will reflect the personality and taste of those accustomed to the best in quality design, finishes and lifestyle.',
  'This gorgeous home provides lifestyle options aplenty: kick off your shoes for a bit of in-home relaxation, or kick off your heels and party into the night in the city’s vibrant entertainment precinct – only 20 minutes away by road or rail.',
];

// фотографии квартиры
const OFFER_IMGS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

//записываем аватарки в массив
for ( let i = 1; i <= 11; i++ ) {
  const zeroInt = (i < 10) ? 0 : '';
  AVATARS.push(`img/avatars/user${  zeroInt  }${i  }.png`);
}

// возвращает рандомный элемент массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

// возвращает кол-во рандомных элементов массива
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


const similarOffers = new Array(10).fill(null).map(() => createOffer());

console.log(similarOffers);


