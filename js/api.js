import { clearForm } from './form.js';
import { clearFilter, disableFilter } from './filter.js';
import { closePopup, resetMap } from './map.js';

let offers;

function getData (onSuccess, onFail) {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error();
    })
    .then((data) => {
      offers = data;
      onSuccess(data);
    })
    .catch(() => {
      disableFilter();
      onFail('Не удалось получить данные. Перезагрузите страницу');
    });
}

function sendData (onSuccess, onFail, data) {
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
        closePopup();
        resetMap();
      } else {
        throw new Error();
      }
    })
    .catch(() => {
      onFail();
    });
}

export {getData, sendData, offers};
