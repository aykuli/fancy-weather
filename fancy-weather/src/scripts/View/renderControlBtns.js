import { createElement, createElementWithAppend, appendNodes } from '../functions/functions.js';
import { lang } from './consts.js';

export default function renderControlBtns(page) {
  const controls = createElement('div', 'controls');

  const controlsBtns = createElement('div', 'controls__btns');
  appendNodes([controlsBtns], controls);

  const controlsBtnRefresh = createElement('button', 'controls__btn controls__btn--refresh');
  const controlsLang = createElement('select', 'controls__btn controls__btn--lang');
  const units = createElement('div', 'controls__unit');
  appendNodes([controlsBtnRefresh, controlsLang, units], controlsBtns);

  const controlsBtnRefreshIcon = createElementWithAppend('img', '', controlsBtnRefresh);
  controlsBtnRefreshIcon.setAttribute('src', require('../../assets/img/icon_refresh.svg')); // eslint-disable-line

  for (let i = 0; i < 3; i += 1) {
    const option = new Option(lang[i], lang[i], false, false);
    controlsLang.append(option);
  }

  switch (localStorage.getItem('weatherLang')) {
    case 'en':
    case 'ru':
    case 'be':
      controlsLang.value = localStorage.getItem('weatherLang');
      break;
    default:
      localStorage.removeItem('weatherLang');
      localStorage.setItem('weatherLang', 'en');
      controlsLang.value = 'en';
  }

  const farengheit = createElement('button', 'controls__btn controls__btn--farengeit');
  const celsius = createElement('button', 'controls__btn controls__btn--celsius');
  appendNodes([farengheit, celsius], units);
  farengheit.innerText = '°F';
  celsius.innerText = '°С';

  switch (localStorage.getItem('weatherUnit')) {
    case 'si':
      celsius.classList.add('controls__btn--unit-active');
      break;
    case 'us':
      farengheit.classList.add('controls__btn--unit-active');
      break;
    default:
      localStorage.removeItem('weatherUnit');
      localStorage.setItem('weatherUnit', 'si');
      celsius.classList.add('controls__btn--unit-active');
  }

  appendNodes([controls], page);
  return [controls, controlsLang, controlsBtnRefresh, units, farengheit, celsius];
}
