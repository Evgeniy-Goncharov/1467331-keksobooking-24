import { clearFilter, clearForm, disableFilter } from './form.js';
import { resetMap } from './map.js';

function getData (onSuccess, onFail) {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((offers) => {
      onSuccess(offers);
    })
    .catch(() => {
      disableFilter();
      onFail('Не удалось получить данные. Перезагрузите страницу');
    });
}

const sendData = (onSuccess, onFail, data) => {
  fetch(
    'https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: data,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
        clearFilter();
        clearForm();
        resetMap();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {getData, sendData};

