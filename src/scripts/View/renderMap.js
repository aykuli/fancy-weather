import { createElement, appendNodes } from '../functions/functions.js';
import showMap from './showMap';

export default function renderMap(container) {
  const mapWrap = createElement('div', 'map__wrap');

  const map = createElement('div', '');
  const coors = createElement('div', 'map__coors');
  appendNodes([map, coors], mapWrap);
  map.setAttribute('id', 'map');
  showMap(map);

  const latitude = createElement('p', 'map__coors--latitude');
  const longitude = createElement('p', 'map__coors--longitude');
  appendNodes([latitude, longitude], coors);

  const latitudeLabel = createElement('span', '');
  const latitudeValue = createElement('span', 'map__coors--latitude');
  appendNodes([latitudeLabel, latitudeValue], latitude);

  const longitudeLabel = createElement('span', '');
  const longitudeValue = createElement('span', 'map__coors--longitude');
  appendNodes([longitudeLabel, longitudeValue], longitude);

  appendNodes([mapWrap], container);

  return [map, latitudeLabel, latitudeValue, longitudeLabel, longitudeValue];
}
