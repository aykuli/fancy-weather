import { createElement } from '../functions/functions.js';
import showMap from './showMap';

export default function renderMap(container) {
  const mapWrap = createElement('div', 'map__wrap', container);

  const map = createElement('div', '', mapWrap);
  map.setAttribute('id', 'map');
  showMap(map);

  const coors = createElement('div', 'map__coors', mapWrap);
  const latitude = createElement('p', 'map__coors--latitude', coors);
  const latitudeLabel = createElement('span', '', latitude);
  const latitudeValue = createElement('span', 'map__coors--latitude', latitude);

  const longitude = createElement('p', 'map__coors--longitude', coors);
  const longitudeLabel = createElement('span', '', longitude);
  const longitudeValue = createElement('span', 'map__coors--longitude', longitude);

  return [map, latitudeLabel, latitudeValue, longitudeLabel, longitudeValue];
}
