import { controlsLocale } from './consts.js';
import { createElement, createElementWithAppend, appendNodes } from '../functions/functions.js';

export default function renderInput(controls, lang) {
  const citySearchForm = createElement('div', 'controls__search--form');

  const cityInput = createElement('input', 'controls__search--input');
  const cityInputLabel = createElement('label', 'visually-hidden');
  const speechBtn = createElement('button', 'controls__speech--btn');
  const cityBtn = createElement('button', 'controls__search--btn');
  appendNodes([cityInput, cityInputLabel, speechBtn, cityBtn], citySearchForm);

  cityInput.setAttribute('placeholder', controlsLocale[lang][1]);
  cityInput.setAttribute('type', 'text');
  cityInput.setAttribute('id', 'city-input');
  cityInputLabel.setAttribute('for', 'city-input');

  const speechBg = createElement('span', 'controls__speech--bg pos0');
  const microphone = createElement('span', 'controls__speech--mic');
  appendNodes([speechBg, microphone], speechBtn);

  const speechBtnText = createElementWithAppend('span', 'visually-hidden', microphone);
  speechBtnText.innerText = 'Search city by speech';

  appendNodes([citySearchForm], controls);
  return [citySearchForm, cityInput, cityBtn, speechBtn, speechBg];
}
