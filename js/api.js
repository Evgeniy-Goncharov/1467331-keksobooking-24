import { disableFilter } from './filter.js';

const SERVER_URL = 'https://24.javascript.pages.academy/keksobooking';

let loadedOffers;

function getData (onSuccess, onFail) {
  fetch(`${SERVER_URL}/data`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((offers) => {
      loadedOffers = offers;
      onSuccess(offers);
    })
    .catch(() => {
      disableFilter();
      onFail('Не удалось получить данные. Перезагрузите страницу');
    });
}

function sendData (onSuccess, onFail, data) {
  fetch(
    SERVER_URL,
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      onFail();
    });
}

export { getData, sendData, loadedOffers };
