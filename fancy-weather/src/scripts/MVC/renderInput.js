import { controlsLocale } from '../modules/consts.js';
import { createElement } from '../modules/functions.js';

export function renderInput(controls) {
  const citySearchForm = createElement('form', 'controls__search--form', controls);
  const cityInput = createElement('input', 'controls__search--input', citySearchForm);
  cityInput.setAttribute('placeholder', controlsLocale[localStorage.getItem('weatherLang')][1]);
  cityInput.setAttribute('type', 'text');
  cityInput.setAttribute('id', 'city-input');

  const cityInputLabel = createElement('label', 'visually-hidden', citySearchForm);
  cityInputLabel.setAttribute('for', 'city-input');
  cityInputLabel.innerText = 'Enter city name or Zip to search';

  const cityBtn = createElement('button', 'controls__search--btn', citySearchForm);
  cityBtn.innerText = controlsLocale[localStorage.getItem('weatherLang')][0];

  return [citySearchForm, cityInput, cityBtn];
}
