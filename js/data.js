const showErrorPopup = (message) => {
  const errorPopup = document.createElement('div');
  errorPopup.textContent = message;

  errorPopup.style.zIndex = '1000';
  errorPopup.style.position = 'fixed';
  errorPopup.style.top = '40%';
  errorPopup.style.left = '25%';
  errorPopup.style.right = '25%';
  errorPopup.style.padding = '25px';
  errorPopup.style.fontSize = '22px';
  errorPopup.style.textAlign = 'center';
  errorPopup.style.boxShadow = '0 0 232px 10px black';
  errorPopup.style.backgroundColor = '#ddd';

  document.body.append(errorPopup);

  setTimeout(() => {
    errorPopup.remove();
  }, 10000);
};

//  Функция получения данных с сервера
const getOffersData = (onSuccess, onError) => () => fetch(
  'https://23.javascript.pages.academy/keksobooking/data',
  {
    method: 'GET',
    credentials: 'same-origin',
  },
)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.status} ${response.statusText}`);
  })
  .then((json) => {
    onSuccess(json);
  })
  .catch(() => {
    onError();
  });

const sendOfferData = ( onSuccess, onError , body) => {
  fetch('https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess(); //onSuccess();

        return;
      }
      onError(); //onFail();

    })
    .catch(() => {
      onError();
    });
};


export {getOffersData, sendOfferData ,showErrorPopup};
