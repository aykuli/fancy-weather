import { controlsLocale } from './consts.js';
import { createElement } from '../functions/functions.js';

export default function renderInput(controls, lang) {
  const citySearchForm = createElement('div', 'controls__search--form', controls);
  const cityInput = createElement('input', 'controls__search--input', citySearchForm);
  cityInput.setAttribute('placeholder', controlsLocale[lang][1]);
  cityInput.setAttribute('type', 'text');
  cityInput.setAttribute('id', 'city-input');
  const cityInputLabel = createElement('label', 'visually-hidden', citySearchForm);
  cityInputLabel.setAttribute('for', 'city-input');

  const speechBtn = createElement('button', 'controls__speech--btn', citySearchForm);
  const speechBg = createElement('span', 'controls__speech--bg pos0', speechBtn);
  const microphone = createElement('span', 'controls__speech--mic', speechBtn);
  const speechBtnText = createElement('span', 'visually-hidden', microphone);
  speechBtnText.innerText = 'Search city by speech';
  const cityBtn = createElement('button', 'controls__search--btn', citySearchForm);

  return [citySearchForm, cityInput, cityBtn, speechBtn, speechBg];
}
