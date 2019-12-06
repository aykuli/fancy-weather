import { createElement } from '../modules/functions.js';
export function renderPlace(weather) {
  const place = createElement('p', 'weather__place', weather);
  const city = createElement('span', 'weather__place--item', place);

  city.innerText = `${localStorage.getItem('weatherCity')}, `;
  const country = createElement('span', 'weather__place--item', place);
  country.innerText = localStorage.getItem('weatherCountry');

  return [city, country];
}
