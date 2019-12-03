import { darkSkyKey, openCageDataKey, mapboxKey, unsplasKey } from './apiKeys.js';
import mapboxgl from 'mapbox-gl';
import { randomInt } from './math.js';

export default class Model {
  constructor() {}

  async getWeatherData(lat, lng) {
    const apiKey = darkSkyKey;
    const lang = localStorage.getItem('weatherLang');
    const unit = localStorage.getItem('weatherUnit');

    var url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${lat},${lng}?lang=${lang}&units=${unit}`;

    try {
      const response = await fetch(url, { type: 'no-cors' });
      const json = await response.json();
      return json;
    } catch (err) {
      alert("Weather data hasn't been loaded. Check connection");
    }
  }

  async forwardGeocoding(settlement, lang = 'en') {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${settlement}&key=${openCageDataKey}&language=${lang}&pretty=1&no_annotations=1`;

    try {
      const response = await fetch(url, { 'Content-Type': 'application/json' });
      const json = await response.json();
      return json;
    } catch (err) {
      alert("Geo data hasn't been loaded. Check your connection");
    }
  }

  async reverseGeocoding(lat, lng, lang = 'en') {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=${openCageDataKey}&language=${lang}&pretty=1`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
    } catch (err) {
      alert("This place hasn't been founded. Check your connection or maybe this place doesn't exist");
    }
  }

  async mapbox(lat, lng) {
    mapboxgl.accessToken = mapboxKey;

    try {
      var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [lng, lat], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
    } catch (err) {
      alert("Map hasn't been loaded. Check connection");
    }
  }

  async unsplashForBG(...args) {
    const max = document.documentElement.clientWidth;
    const orientation = max > 600 ? 'landscape' : 'portrait';
    let query = '';

    console.log('args: ', args);
    if (args === []) {
      console.log('пустой args');
      query = localStorage.getItem('weatherBgQuery');
    } else {
      for (let arg of args) {
        query += arg + '%2C';
      }
      console.log('query: ', query);
      localStorage.removeItem('weatherBgQuery');
      localStorage.setItem('weatherBgQuery', query);
    }

    const url = `https://api.unsplash.com/search/photos?page=1&per_page=100&orientation=${orientation}&query=${query}&client_id=${unsplasKey}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log('json: ', json);

      const imgUrl = () => {
        console.log('ширина окна клиента', max);
        const num = randomInt(0, json.results.length);
        if (max < 600) {
          console.log('размер экрана меньше 400');
          return json.results[num].urls.small;
        } else {
          console.log('размер экрана больше 400');
          console.log(num);
          return json.results[num].urls.regular;
        }
      };

      localStorage.removeItem('weatherBgImg');
      localStorage.setItem('weatherBgImg', imgUrl());
      console.log('localStorage.getItem(weatherBgImg): ', localStorage.getItem('weatherBgImg'));
      return imgUrl();
    } catch (err) {
      return localStorage.getItem('weatherBgImg');
    }
  }
}
