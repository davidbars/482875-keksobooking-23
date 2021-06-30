const adForm = document.querySelector('.ad-form');
const adFormFieldsets = document.querySelectorAll('.ad-form__element');
const mapForm = document.querySelector('.map__filters');
const mapFilters = mapForm.querySelectorAll('.map__filter');
const housingFilters = mapForm.querySelectorAll('.map__checkbox');


const formActivator = function(signal){

  const activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    adFormFieldsets.forEach((element) => {
      element.disabled = false;
    });

    mapForm.classList.remove('map-form--disabled');
    mapFilters.forEach((element) => {
      element.disabled = false;
    });
  };

  const deactivateForm = function () {
    adForm.reset();
    adFormFieldsets.forEach((element) => {
      element.disabled = true;
    });
    adForm.classList.add('ad-form--disabled');


    mapForm.reset();
    mapFilters.forEach((element) => {
      element.disabled = true;
    });
    mapForm.classList.add('map-form--disabled');
    housingFilters.forEach((element) => {
      element.disabled = true;
    });
  };


  if (signal) {
    return activateForm();
  } else {
    return deactivateForm();
  }
};

export {formActivator};
