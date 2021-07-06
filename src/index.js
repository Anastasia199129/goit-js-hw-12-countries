import debounce from 'lodash.debounce';
import './sass/main.scss';
import receiveCountries from './js/fetchCountries';
import listTpl from './templates/list-countries.hbs';
import cardCountri from './templates/card-countri.hbs';

import { alert, defaultModules } from '@pnotify/core';
import * as PNotifyMobile from '@pnotify/mobile';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';

defaultModules.set(PNotifyMobile, {});

const input = document.querySelector('.input');
const list = document.querySelector('.list');
const wrapper = document.querySelector('.wrapper');

input.addEventListener('input', onInputInput);

function onInputInput(event) {
  event.preventDefault();
  const inputValue = input.value;

  if (inputValue !== String && inputValue > 0) {
    alert({
      type: 'error',
      text: 'Incorrect input!',
      closerHover: true,
      delay: 500,
    });
  }

  if (inputValue.length === 0) {
    list.innerHTML = '';
    wrapper.innerHTML = '';
  }
  if (inputValue.length > 0) {
    receiveCountries(inputValue)
      .then(debounce(renderCountrys, 500))
      .catch(error => console.log(error));
  }
}

function renderCountrys(arrayCountrys) {
  //   console.log(arrayCountrys);
  let listCountrys = listTpl(arrayCountrys);
  let markupCardCountri = cardCountri(arrayCountrys);
  if (arrayCountrys.length === 1) {
    list.innerHTML = '';
    wrapper.innerHTML = markupCardCountri;
  }
  if (arrayCountrys.length <= 10 && arrayCountrys.length >= 2) {
    wrapper.innerHTML = '';
    list.innerHTML = listCountrys;
  }
  if (arrayCountrys.length > 10) {
    list.innerHTML = '';
    alert({
      type: 'error',
      text: 'Too many matches found. Please enter a more specific Query!',
      closerHover: true,
      delay: 2000,
    });
  }
}
