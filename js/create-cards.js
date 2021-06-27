
const mapContainer = document.querySelector('#map-canvas');
const popupTemplate = document.querySelector('#card').content;
const newPopupTemplate = popupTemplate.querySelector('.popup');
const popup = newPopupTemplate.cloneNode(true);
const title = popup.querySelector('.popup__title');
const adress = popup.querySelector('.popup__text--address');
const price = popup.querySelector('.popup__text--price');
const type = popup.querySelector('.popup__type');
const types = {
  flat : 'Квартира',
  bungalow : 'Бунгало',
  house : 'Дом',
  palace : 'Дворец',
  hotel : 'Отель',
};
const capacity = popup.querySelector('.popup__text--capacity');
const timeRules = popup.querySelector('.popup__text--time');
const features = popup.querySelector('.popup__features');
const description = popup.querySelector('.popup__description');
const avatar = popup.querySelector('.popup__avatar ');
const photoWrapper = popup.querySelector('.popup__photos');


// добавляю картинки в блок
const getPopupImgs = function (imgsData) {
  const imgesFragment = document.createDocumentFragment();

  for( let i = 0; i < imgsData.length; i++) {
    const imageTemplate = photoWrapper.querySelector('.popup__photo');
    const newImg = imageTemplate.cloneNode(true);
    newImg.src = imgsData[i];
    imgesFragment.appendChild(newImg);
  }

  photoWrapper.children[0].remove();
  return imgesFragment;
};

const getPopupFeatures = function (featuresData) {
  features.innerHTML = '';
  const featuresFragment = document.createDocumentFragment();
  for( let i = 0; i < featuresData.length; i++) {
    const featuresItem = document.createElement('li');
    featuresItem.classList.add('popup__feature' ,`popup__feature--${  featuresData[i]}`);
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
const generateSimilarPopup = function ( cardsData ) {
  cardsData.forEach((cardData) => {

    title.textContent = cardData.offer.title;
    adress.textContent = cardData.offer.adress;
    price.innerHTML = `${cardData.offer.price  }<span> ₽/ночь</span>`;
    type.textContent = types[cardData.offer.type];
    capacity.textContent = getCorrectCapacity(cardData.offer.rooms, cardData.offer.guests);
    timeRules.textContent = `Заезд после ${  cardData.offer.checkin  } выезд до ${  cardData.offer.checkout}`;
    features.innerHTML = '';
    features.appendChild(getPopupFeatures(cardData.offer.features));
    description.textContent = cardData.offer.description;
    avatar.src = cardData.author.avatar;
    photoWrapper.appendChild(getPopupImgs(cardData.offer.photos));

    return mapContainer.appendChild(popup);

  });
};

export {generateSimilarPopup};
