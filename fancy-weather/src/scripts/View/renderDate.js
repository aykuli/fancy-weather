import { createElement, appendNodes } from '../functions/functions.js';

export default function renderDate(weather) {
  const date = createElement('p', 'weather__date');

  const dateDay = createElement('span', 'weather__date--item');
  const dateMM = createElement('span', 'weather__date--item');
  const dateDD = createElement('span', 'weather__date--item');
  const datehh = createElement('span', '');
  const datemm = createElement('span', '');

  const nodes = [dateDay, dateMM, dateDD, datehh, datemm];
  appendNodes(nodes, date);
  appendNodes([date], weather);
  return nodes;
}
