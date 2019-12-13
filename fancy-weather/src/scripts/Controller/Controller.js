import { timeThere, createPopup, getSeason, getCity, recognitionActivityShow } from '../functions/functions.js';
import { forwardGeocoding } from '../APIs/opencagedata.js';
import getPlaceByCoors from './getPlaceByCoors.js';
import getWeatherData from '../APIs/getWeatherData.js';
import mapbox from '../APIs/mapbox.js';
import showMap from '../View/showMap.js';
import unsplashForBG from '../APIs/unsplashForBG.js';
import ipInfo from '../APIs/ipInfo.js';

export default class Controller {
  constructor(view) {
    this.view = view;

    this.init();

    this.watchInput();
    this.watchLang();
    this.watchReload();
    this.view.watchUnitChanging();
    this.watchSpeech(this.view.speechBtn);
    window.addEventListener('resize', () => showMap(this.view.map));
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => this.getCurrentPlaceData());
  }

  async getCurrentPlaceData() {
    const [lat, lng] = await ipInfo();

    // save current position in storage
    localStorage.removeItem('weatherLat');
    localStorage.setItem('weatherLat', lat);
    localStorage.removeItem('weatherLng');
    localStorage.setItem('weatherLng', lng);

    this.view.showCoordinates(lat, lng);
    mapbox(lat, lng);

    const lang = localStorage.getItem('weatherLang');
    getPlaceByCoors(lat, lng, lang)
      .then(res => {
        if (res === undefined) {
          createPopup(3);
          return;
        }
        const [city, country] = res;
        this.view.showCity(city, country);
        this.view.showDate();
        this.view.showLabels();
      })
      .catch(() => {
        createPopup(0);
      });

    const weatherData = await getWeatherData(lat, lng);
    if (weatherData === undefined) {
      createPopup(2);
      return;
    }
    this.view.showWeatherData(weatherData);

    localStorage.setItem('hoursDelta', 0);
    this.view.showTimeHHMM();

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

      const [lat, lng] = [localStorage.getItem('weatherLat'), localStorage.getItem('weatherLng')];

      const unit = localStorage.getItem('weatherUnit');
      getWeatherData(lat, lng, unit).then((res, rej) => {
        if (rej !== undefined) {
          createPopup(2);
          return;
        }
        this.view.weatherSummary.innerText = res.currently.summary;
      });

      getPlaceByCoors(lat, lng, lang)
        .then(res => {
          const [city, country] = res;
          this.view.showCity(city, country);
          this.view.showDate();
          this.view.showLabels();
        })
        .catch(() => {
          createPopup(5);
        });
    });
  }

  watchReload() {
    this.view.controlsBtnRefresh.addEventListener('click', () => {
      unsplashForBG().then(res => {
        this.view.page.style.backgroundImage = `url(${res})`;
      });
      this.view.controlsBtnRefresh.children[0].classList.add('spin-animation');
      setTimeout(() => this.view.controlsBtnRefresh.children[0].classList.remove('spin-animation'), 500);
    });
  }

  async inputSearchResult() {
    const settlement = this.view.cityInput.value;

    if (settlement === '') {
      createPopup(0);
      return;
    }

    const lang = localStorage.getItem('weatherLang');
    this.handleSearchRes(settlement, lang);
  }

  async handleSearchRes(searchText, lang) {
    const data = await forwardGeocoding(searchText, lang);

    if (data.total_results === 0 || data === undefined) {
      createPopup(0);
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
    await mapbox(coors.lat, coors.lng);

    const unit = localStorage.getItem('weatherUnit');
    const weatherData = await getWeatherData(coors.lat, coors.lng, unit);
    this.view.showWeatherData(weatherData);

    // find delta in hours and save it in localStorage
    timeThere(weatherData.timezone);
    this.view.showTimeHHMM();

    this.showAppBg(coors.lat, coors.lng, weatherData);
  }

  async showAppBg(lat, lng, weatherData) {
    let data = await getPlaceByCoors(lat, lng, 'en');
    if (data === undefined) {
      data = localStorage.getItem('weatherBgImg');
      this.view.page.style.backgroundImage = `url(${data})`;
      return;
    }
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

    data = await unsplashForBG(country, city, season, dayTime, icon);
    this.view.page.style.backgroundImage = `url(${data})`;
  }

  watchSpeech(btn) {
    const Speech = window['SpeechRecognition'] || window['webkitSpeechRecognition']; // eslint-disable-line
    const recognition = new Speech();
    let isRecognizing = false; // eslint-disable-line
    recognition.interimResults = true;
    let idInterval = 0;

    recognition.onstart = () => {
      isRecognizing = true;
    };

    recognition.onerror = () => {
      this.view.speechBg.style.backgroundColor = 'transparent';
      clearInterval(idInterval);
      createPopup(7);
    };

    recognition.onend = () => {
      isRecognizing = false;
      this.view.speechBg.style.backgroundColor = 'transparent';
      clearInterval(idInterval);
    };

    recognition.onresult = e => {
      const res = e.results[e.resultIndex];

      const speechResult = res.isFinal ? res[0].transcript : undefined;
      if (!speechResult) return;
      const lang = localStorage.getItem('weatherLang');
      this.handleSearchRes(speechResult, lang);
    };

    btn.addEventListener('click', evt => {
      evt.preventDefault();
      const lang = localStorage.getItem('weatherLang');
      recognition.lang = lang;
      try {
        recognition.start();
      } catch (e) {
        createPopup(8);
      }
      idInterval = recognitionActivityShow();
    });
  }
}
