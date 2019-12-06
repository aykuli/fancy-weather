import { createElement } from '../modules/functions.js';
import { lang } from '../modules/consts.js';

export function renderControlBtns(page) {
  const controls = createElement('div', 'controls', page);

  const controlsBtns = createElement('div', 'controls__btns', controls);

  const controlsBtnRefresh = createElement('button', 'controls__btn controls__btn--refresh', controlsBtns);
  controlsBtnRefresh.innerHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>';
  const controlsLang = createElement('select', 'controls__btn controls__btn--lang', controlsBtns);

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

  const units = createElement('div', 'controls__unit', controlsBtns);
  const farengheit = createElement('button', 'controls__btn controls__btn--farengeit', units);
  farengheit.innerText = '°F';
  const celsius = createElement('button', 'controls__btn controls__btn--celsius', units);
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
  return [controls, controlsLang, controlsBtnRefresh, units, farengheit, celsius];
}
