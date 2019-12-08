import { timeThere, createPopup, getSeason, getCity } from '../../functions/functions.js';
import { forwardGeocoding } from '../Model/opencagedata.js';
import getPlaceByCoors from './getPlaceByCoors.js';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();

    this.watchInput();
    this.watchLang();
    this.watchReload();
    this.view.watchUnitChanging();
    this.watchSpeech(this.view.speechBtn);
  }

  init() {
    document.addEventListener('DOMContentLoaded', this.getCurrentCoors.bind(this));
  }

  getCurrentCoors() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      createPopup(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(this.success.bind(this), error, options);

    if (!navigator.geolocation) createPopup('Geolocation is not supported by this browser!');
  }

  async success(pos) {
    const [lat, lng] = [pos.coords.latitude, pos.coords.longitude];

    // save current position in storage
    localStorage.removeItem('weatherLat');
    localStorage.setItem('weatherLat', lat);
    localStorage.removeItem('weatherLng');
    localStorage.setItem('weatherLng', lng);

    localStorage.removeItem('weatherCurrentLng');
    localStorage.setItem('weatherCurrentLng', lng);

    // draw map of current geolocation
    this.view.showCoordinates(lat, lng);
    this.model.mapbox(lat, lng);

    const lang = localStorage.getItem('weatherLang');
    const data = await getPlaceByCoors(lat, lng, lang);
    if (data.total_results === 0) {
      createPopup('Enter valid name of city/settlement');
      return;
    }

    const [city, country] = data;
    this.view.showCity(city, country);
    const weatherData = await this.model.getWeatherData(lat, lng);
    this.view.showWeatherData(weatherData);

    this.view.datehh.innerText = timeThere(weatherData.timezone);

    this.showAppBg(lat, lng, weatherData);
  }

  watchInput() {
    this.view.cityBtn.addEventListener('click', this.inputSearchResult.bind(this));
    this.view.cityInput.addEventListener('keydown', e => {
      if (e.code === 'Enter' || e.code === 'NumpadEnter') this.inputSearchResult();
    });
  }

  watchLang() {
    this.view.controlsLang.addEventListener('change', () => {
      const lang = this.view.controlsLang.value;

      localStorage.removeItem('weatherLang');
      localStorage.setItem('weatherLang', lang);

      const lat = localStorage.getItem('weatherLat');
      const lng = localStorage.getItem('weatherLng');

      const unit = localStorage.getItem('weatherUnit');
      this.model.getWeatherData(lat, lng, unit).then(res => {
        this.view.weatherSummary.innerText = res.currently.summary;
      });

      getPlaceByCoors(lat, lng, lang).then(res => {
        const [city, country] = res;
        this.view.showCity(city, country);
        this.view.showDate();
        this.view.showLabels();
      });
    });
  }

  watchReload() {
    this.view.controlsBtnRefresh.addEventListener('click', () => {
      this.model.unsplashForBG().then(res => {
        this.view.page.style.backgroundImage = `url(${res})`;
      });
      this.view.controlsBtnRefresh.children[0].classList.add('spin-animation');
      setTimeout(() => this.view.controlsBtnRefresh.children[0].classList.remove('spin-animation'), 500);
    });
  }

  async inputSearchResult() {
    const settlement = this.view.cityInput.value;

    if (settlement === '') {
      createPopup('Type correct value in search input');
      return;
    }

    const lang = localStorage.getItem('weatherLang');
    this.handleSearchRes(settlement, lang);
  }

  async handleSearchRes(searchText, lang) {
    const data = await forwardGeocoding(searchText, lang);
    // if (data === undefined) console.clear();
    if (data.total_results === 0 || data === undefined) {
      createPopup('Enter valid name of city/settlement');
      return;
    }

    let city = getCity(data);
    if (city === undefined) city = '';

    const [country, coors] = [data.results[0].components.country, data.results[0].geometry];

    localStorage.removeItem('weatherLat');
    localStorage.setItem('weatherLat', coors.lat);
    localStorage.removeItem('weatherLng');
    localStorage.setItem('weatherLng', coors.lng);

    await this.view.showCity(city, country);
    await this.view.showCoordinates(coors.lat, coors.lng);
    await this.view.cleanMap();
    await this.model.mapbox(coors.lat, coors.lng);

    const unit = localStorage.getItem('weatherUnit');
    const weatherData = await this.model.getWeatherData(coors.lat, coors.lng, unit);
    this.view.showWeatherData(weatherData);

    this.view.datehh.innerText = timeThere(weatherData.timezone);

    this.showAppBg(coors.lat, coors.lng, weatherData);
  }

  async showAppBg(lat, lng, weatherData) {
    let data = await getPlaceByCoors(lat, lng, 'en');
    const [city, country, continent] = data;

    const tm = new Date();
    const month = tm.getMonth();
    let season = getSeason(month);

    if (continent === 'Africa' || continent === 'Oceania' || continent === 'South America') {
      season = 'summer';
    }

    const time = this.view.datehh.textContent;
    const dayTime = time > 6 && time < 22 ? 'day' : 'night';

    const { icon } = weatherData.currently;

    data = await this.model.unsplashForBG(country, city, season, dayTime, icon);
    this.view.page.style.backgroundImage = `url(${data})`;
  }

  watchSpeech(btn) {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const recognizer = new SpeechRecognition(); // eslint-disable-line
      recognizer.interimResults = true;
      const lang = localStorage.getItem('weatherLang');
      recognizer.lang = lang;

      recognizer.onresult = async evt => {
        const res = evt.results[e.resultIndex];

        const speechResult = res.isFinal ? res[0].transcript : undefined;
        if (!speechResult) return;
        this.handleSearchRes(speechResult, lang);
      };
      recognizer.start();
    });
  }
}
