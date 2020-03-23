import mapboxgl from 'mapbox-gl';
import '../../../node_modules/mapbox-gl/src/css/mapbox-gl.css';
import { mapboxKey } from './apiKeys.js';
import { createPopup } from '../functions/functions.js';
import { ERRORS } from '../View/consts';

export default function mapbox(lat, lng) {
  mapboxgl.accessToken = mapboxKey;

  if (typeof lat !== 'number' || typeof lng !== 'number') {
    createPopup(ERRORS.COORDINATES_UNAVAILABLE);
    return;
  }
  /* eslint-disable */
  try {
    const map = new mapboxgl.Map({
      /* eslint-enable */
      container: 'map', // container id in html
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [lng, lat],
      zoom: 9, // starting zoom
    });
    map.addControl(new mapboxgl.FullscreenControl());
  } catch (e) {
    createPopup(ERRORS.MAP_UNLOADED);
  }
}
