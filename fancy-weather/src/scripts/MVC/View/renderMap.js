import { createElement } from '../../functions/functions.js';

export default function renderMap(container) {
  const mapWrap = createElement('div', 'map__wrap', container);

  const map = createElement('div', '', mapWrap);
  map.setAttribute('id', 'map');
  map.setAttribute('style', 'width: 320px; height: 320px');

  const coors = createElement('div', 'map__coors', mapWrap);
  const latitude = createElement('p', 'map__coors--latitude', coors);
  const latitudeLabel = createElement('span', '', latitude);
  const latitudeValue = createElement('span', 'map__coors--latitude', latitude);

  const longitude = createElement('p', 'map__coors--longitude', coors);
  const longitudeLabel = createElement('span', '', longitude);
  const longitudeValue = createElement('span', 'map__coors--longitude', longitude);

  return [map, latitudeLabel, latitudeValue, longitudeLabel, longitudeValue];
}
