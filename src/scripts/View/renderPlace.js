import { createElement, appendNodes } from '../functions/functions.js';

export default function renderPlace(weather) {
  const place = createElement('p', 'weather__place');
  const city = createElement('span', 'weather__place--item', place);

  city.innerText = `${localStorage.getItem('weatherCity')}, `;
  const country = createElement('span', 'weather__place--item', place);
  country.innerText = localStorage.getItem('weatherCountry');
  appendNodes([city, country], place);
  appendNodes([place], weather);
  return [city, country];
}
