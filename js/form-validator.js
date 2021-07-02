const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_LENGTH = 1000000;
const placeTypeMinPrice = {
  BUNGALOW: 0,
  FLAT: 1000,
  HOTEL: 3000,
  HOUSE: 5000,
  PALACE: 10000,
};

const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');
const typeInput = adForm.querySelector('#type');
const adTitle = adForm.querySelector('#title');
const adPrice = adForm.querySelector('#price');
const roomsAmountSelect = adForm.querySelector('#room_number');
const guestsAmountSelect = adForm.querySelector('#capacity');
const checkInInput = document.querySelector('#timein');
const checkOutInput = document.querySelector('#timeout');
const guestsAmountOfRooms = {
  1: {
    guests: [1],
    getErrorText: (count) => `Максимум для ${count} гостя`,
  },
  2: {
    guests: [1, 2],
    getErrorText: (count) => `Максимум для ${count} гостей`,
  },
  3: {
    guests: [1, 2, 3],
    getErrorText: (count) => `Максимум для ${count} гостей`,
  },
  100: {
    guests: [0],
    getErrorText: () => 'Для 100 комнат можно выбрать только вариант "Не для гостей"',
  },
};

adTitle.addEventListener('input', () => {
  const valueLength = adTitle.value.length;
  if (valueLength < MIN_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Добавьте ещё ${  MIN_TITLE_LENGTH - valueLength } симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    adTitle.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } симв.`);
  } else {
    adTitle.setCustomValidity('');
  }
  adTitle.reportValidity();
});

adPrice.addEventListener('input', () => {
  const valueLength = adPrice.value.length;
  if (valueLength > MAX_PRICE_LENGTH) {
    adPrice.setCustomValidity(`Удалите лишние ${  valueLength - MAX_PRICE_LENGTH } симв.`);
  } else {
    adPrice.setCustomValidity('');
  }

  adPrice.reportValidity();
});

const guestsAmountChangeHandler = () => {
  const roomsValue = Number(roomsAmountSelect.value);
  const guestsValue = Number(guestsAmountSelect.value);

  if (!guestsAmountOfRooms[roomsValue].guests.includes(guestsValue)) {
    const guests = guestsAmountOfRooms[roomsValue].guests.join(', ');
    guestsAmountSelect.setCustomValidity(guestsAmountOfRooms[roomsValue].getErrorText(guests));
  } else {
    guestsAmountSelect.setCustomValidity('');
  }
  guestsAmountSelect.reportValidity();
};

const onTypeInputChange = function (evt) {
  const minPrice = placeTypeMinPrice[evt.target.value.toUpperCase()];
  adPrice.min = minPrice;
  adPrice.placeholder = minPrice.toString();
};

const onCheckInInputChange = function (evt) {
    checkOutInput.value = evt.target.value;
};

const onCheckOutInputChange = function (evt) {
    checkInInput.value = evt.target.value;
};


const checkValidation = function () {
  const inputsAll = document.querySelectorAll('input');
  inputsAll.forEach((item) => {
    if (item.checkValidity() === false) {
      item.classList.add('validation-error');
    } else {
      item.classList.remove('validation-error');
    }
  });
};


guestsAmountSelect.addEventListener('change', guestsAmountChangeHandler);
submitButton.addEventListener('click', checkValidation);
typeInput.addEventListener('change', onTypeInputChange);
checkInInput.addEventListener('change', onCheckInInputChange);
checkOutInput.addEventListener('change', onCheckOutInputChange);