import { createElement } from '../modules/functions.js';

export function renderDate(weather) {
  const date = createElement('p', 'weather__date', weather);
  const dateDay = createElement('span', 'weather__date--item', date);
  const dateMM = createElement('span', 'weather__date--item', date);
  const dateDD = createElement('span', 'weather__date--item', date);
  const datehh = createElement('span', '', date);
  const datemm = createElement('span', '', date);

  return [dateDay, dateMM, dateDD, datehh, datemm];
}
