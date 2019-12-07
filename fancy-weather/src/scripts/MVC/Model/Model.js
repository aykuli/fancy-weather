import { darkSkyKey, mapboxKey, unsplasKey } from './apiKeys.js';
import { randomInt, createPopup } from '../../functions/functions.js';
import mapboxgl from 'mapbox-gl';

export default class Model {
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
      createPopup("Weather data hasn't been loaded. Check connection");
    }
  }

  async mapbox(lat, lng) {
    mapboxgl.accessToken = mapboxKey;

    if (typeof lat !== 'number' || typeof lng !== 'number') {
      createPopup('The coordinates were not determined. Refresh page');
      return;
    }

    try {
      var map = new mapboxgl.Map({
        container: 'map', // container id in html
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: [lng, lat],
        zoom: 9, // starting zoom
      });
    } catch (err) {
      createPopup('The map was not loaded. Check connection');
    }
  }

  async unsplashForBG(...args) {
    const max = document.documentElement.clientWidth;
    const orientation = max > 600 ? 'landscape' : 'portrait';
    let query = '';

    if (args.length === 0) {
      query = localStorage.getItem('weatherBgQuery');
    } else {
      for (let arg of args) {
        query += arg + '-';
      }
      localStorage.removeItem('weatherBgQuery');
      localStorage.setItem('weatherBgQuery', query);
    }

    const url = `https://api.unsplash.com/search/photos?page=1&per_page=100&orientation=${orientation}&query=${query}&client_id=${unsplasKey}`;

    try {
      const response = await fetch(url);
      const json = await response.json();

      const imgUrl = () => {
        const num = randomInt(0, json.results.length);
        if (max < 600) {
          return json.results[num].urls.small;
        } else {
          return json.results[num].urls.regular;
        }
      };

      localStorage.removeItem('weatherBgImg');
      localStorage.setItem('weatherBgImg', imgUrl());
      return imgUrl();
    } catch (err) {
      return localStorage.getItem('weatherBgImg');
    }
  }
}
