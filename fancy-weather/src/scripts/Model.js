import { darkSkyKey, openCageDataKey, mapboxKey } from './apiKeys.js';
import mapboxgl from 'mapbox-gl';

export default class Model {
  constructor() {}

  async getWeatherData(lat, lng, unit = 'si') {
    const apiKey = darkSkyKey;
    let lang = localStorage.getItem('weatherLang');

    var url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${lat},${lng}?lang=${lang}&units=${unit}`;

    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  async forwardGeocoding(settlement, lang = 'en') {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${settlement}&key=${openCageDataKey}&language=${lang}&pretty=1&no_annotations=1`;

    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  async reverseGeocoding(lat, lng, lang = 'en') {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=${openCageDataKey}&language=${lang}&pretty=1`;
    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  async mapbox(lat, lng) {
    mapboxgl.accessToken = mapboxKey;
    var map = new mapboxgl.Map({
      container: 'map', // container id
      style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
      center: [lng, lat], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}
