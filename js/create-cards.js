const popupTemplate = document.querySelector('#card').content;
const newPopupTemplate = popupTemplate.querySelector('.popup');
const mapContainer = document.querySelector('#map-canvas');
const types = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

// добавляю картинки в блок
const getPopupImgs = function (imgsData, wrapper) {
  const imgsFragment = document.createDocumentFragment();
  const imageTemplate = wrapper.querySelector('.popup__photo');


  for (let i = 0; i < imgsData.length; i++) {
    if (i === 0) {
      wrapper.children[0].src = imgsData[i];
    } else {
      const newImg = imageTemplate.cloneNode(true);
      newImg.src = imgsData[i];
      imgsFragment.appendChild(newImg);
    }
  }

  return imgsFragment;
};

const getPopupFeatures = function (featuresData) {
  const featuresFragment = document.createDocumentFragment();
  for (let i = 0; i < featuresData.length; i++) {

    const featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature', `popup__feature--${  featuresData[i]}`);
    featuresFragment.appendChild(featuresItem);
  }

  return featuresFragment;
};

// грамматически правильно склоняю слова в зависимости от окл-ва
const getCorrectCapacity = function (roomsCount, guestsCount) {

  let roomsText = ' комнаты для ';
  let guestsText = ' гостей';

  if (roomsCount === 1) {
    roomsText = ' комната для ';
  } else if (roomsCount > 1 && roomsCount <= 4) {
    roomsText = ' комнаты для ';
  } else {
    roomsText = ' комнат для ';
  }

  if (guestsCount === 1) {
    guestsText = ' гостя';
  } else {
    guestsText = ' гостей';
  }

  return roomsCount + roomsText + guestsCount + guestsText;
};


//создает попап обьявления
const generateSimilarPopup = function (cardData) {

  const popup = newPopupTemplate.cloneNode(true);
  const features = popup.querySelector('.popup__features');
  const photoWrapper = popup.querySelector('.popup__photos');
  const title = popup.querySelector('.popup__title');
  const adress = popup.querySelector('.popup__text--address');
  const price = popup.querySelector('.popup__text--price');
  const type = popup.querySelector('.popup__type');
  const capacity = popup.querySelector('.popup__text--capacity');
  const timeRules = popup.querySelector('.popup__text--time');
  const description = popup.querySelector('.popup__description');
  const avatar = popup.querySelector('.popup__avatar ');

  title.textContent = cardData.offer.title;
  adress.textContent = cardData.offer.adress;
  price.innerHTML = `${cardData.offer.price  }<span> ₽/ночь</span>`;
  type.textContent = types[cardData.offer.type];
  capacity.textContent = getCorrectCapacity(cardData.offer.rooms, cardData.offer.guests);
  timeRules.textContent = `Заезд после ${  cardData.offer.checkin  } выезд до ${  cardData.offer.checkout}`;
  if (cardData.offer.features) {
    features.innerHTML = '';
    features.appendChild(getPopupFeatures(cardData.offer.features));
  }
  description.textContent = cardData.offer.description;
  avatar.src = cardData.author.avatar;
  if (cardData.offer.photos) {
    photoWrapper.appendChild(getPopupImgs(cardData.offer.photos, photoWrapper));
  }
  return mapContainer.appendChild(popup);

};

export {generateSimilarPopup};
