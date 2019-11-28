import { weekDayArr, monthArr, lang, controlsLocale } from './consts.js';
import { yandexKey } from './apiKeys.js';

export default class View {
  constructor() {
    this.page = document.querySelector('.page-wrap');

    // Block 1: control elements and input form
    this.controls = this.createElement('div', 'controls', this.page);

    this.controlsBtns = this.createElement('div', 'controls__btns', this.controls);

    this.controlsBtnReload = this.createElement('button', 'controls__btn', this.controlsBtns);
    this.controlsBtnReload.classList.add('controls__btn--refresh');
    this.controlsLang = this.createElement('select', 'controls__btn', this.controlsBtns);
    this.controlsLang.classList.add('controls__btn--lang');

    for (let i = 0; i < 3; i += 1) {
      const option = new Option(lang[i], lang[i], false, false);
      this.controlsLang.append(option);
    }

    if (localStorage.getItem('weatherLang') === null) {
      console.log('устанавливаем язык ');
      localStorage.setItem('weatherLang', 'en');
      this.controlsLang.value = lang[0];
    } else {
      this.controlsLang.value = localStorage.getItem('weatherLang');
    }

    this.controlsBtnFarengeit = this.createElement('button', 'controls__btn', this.controlsBtns);
    this.controlsBtnFarengeit.classList.add('controls__btn--farengeit');
    this.controlsBtnFarengeit.innerText = '°F';
    this.controlsBtnCelsius = this.createElement('button', 'controls__btn', this.controlsBtns);
    this.controlsBtnCelsius.classList.add('controls__btn--celsius');
    this.controlsBtnFarengeit.classList.add('controls__btn--active');
    this.controlsBtnCelsius.innerText = '°С';

    this.citySearchForm = this.createElement('div', 'controls__search-form', this.controls);
    this.cityInput = this.createElement('input', 'controls__search-input', this.citySearchForm);
    this.cityInput.setAttribute('placeholder', controlsLocale[localStorage.getItem('weatherLang')][1]);
    this.cityInput.setAttribute('type', 'text');
    this.cityInput.setAttribute('id', 'city-input');
    this.cityInputLabel = this.createElement('label', 'visually-hidden', this.citySearchForm);
    this.cityInputLabel.setAttribute('for', 'city-input');
    this.cityInputLabel.innerText = 'Enter city name or Zip to search';

    this.cityBtn = this.createElement('button', 'controls__search-btn', this.citySearchForm);
    this.cityBtn.innerText = controlsLocale[localStorage.getItem('weatherLang')][0];

    // Block 2: Showing current weather
    this.weather = this.createElement('div', 'weather', this.page);

    this.date = this.createElement('p', 'weather__date', this.weather);
    this.dateDay = this.createElement('span', 'weather__date--item', this.date);
    this.dateDD = this.createElement('span', 'weather__date--item', this.date);
    this.dateMM = this.createElement('span', 'weather__date--item', this.date);
    this.dateHHMM = this.createElement('span', 'weather__date--hhmm', this.date);

    this.place = this.createElement('p', 'weather__place', this.weather);
    this.city = this.createElement('span', 'weather__place--item', this.place);

    this.city.innerText = `${localStorage.getItem('weatherCity')}, `;
    this.country = this.createElement('span', 'weather__place--item', this.place);
    this.country.innerText = localStorage.getItem('weatherCountry');

    this.temperatureWrap = this.createElement('p', 'weather__temperature--wrap', this.weather);
    this.temperature = this.createElement('span', 'weather__temperature', this.temperatureWrap);
    this.temperature.innerText = '10';
    this.temperatureSign = this.createElement('span', 'weather__temperature--sign', this.temperatureWrap);
    this.temperatureSign.innerText = '°';
    this.weatherIconBig = this.createElement('img', 'weather__icon--big', this.temperatureWrap);
    this.weatherIconBig.setAttribute('url', './images/icon-cloud.svg');

    this.mapApiUrl = document.createElement('script');
    document.getElementsByTagName('head')[0].appendChild(this.mapApiUrl);
    this.mapApiUrl.src = `https://api-maps.yandex.ru/2.1/?apikey=${yandexKey}&lang=ru_RU&onload=init`;
    this.mapApiUrl.setAttribute('type', 'text/javascript');

    this.mapWrap = this.createElement('div', 'map', this.page);

    this.coors = this.createElement('div', 'map__coors', this.mapWrap);
    this.latitude = this.createElement('p', 'map__coors--latitude', this.coors);
    this.latitudeLabel = this.createElement('span', '', this.latitude);
    // this.latitudeLabel.innerText = controlsLocale[localStorage.getItem('weatherLang')][2];
    this.latitudeValue = this.createElement('span', 'map__coors--latitude', this.latitude);

    this.longitude = this.createElement('p', 'map__coors--longitude', this.coors);
    this.longitudeLabel = this.createElement('span', '', this.longitude);
    // this.longitudeLabel.innerText = controlsLocale[localStorage.getItem('weatherLang')][3];
    this.longitudeValue = this.createElement('span', 'map__coors--longitude', this.longitude);

    this.showDate();
    this.showTimeHHMM();
    window.setInterval(this.showTimeHHMM, 1000);
  }

  // Create an element with an optional CSS class
  createElement(tag, className, whereAppend) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    whereAppend.append(element);
    return element;
  }

  // Retrieve an element from the DOM
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }

  async showMap(coors) {
    console.log('coors = ', [coors.lat, coors.lng]);
    this.map = document.querySelector('#map');
    if (this.map !== null) this.map.remove();
    this.map = this.createElement('div', '', this.mapWrap);
    this.map.setAttribute('id', 'map');
    this.map.setAttribute('style', 'width: 350px; height: 350px');
    try {
      ymaps.ready(init);
      function init() {
        var myMap = new ymaps.Map('map', { center: [coors.lat, coors.lng], zoom: 7 });
      }
    } catch (err) {
      alert("Map didn't loaded");
    }
  }

  showDate() {
    let currentTime = new Date();

    this.dateDay.innerText = weekDayArr[localStorage.getItem('weatherLang')][currentTime.getDay()];
    this.dateDD.innerText = currentTime.getDate();
    this.dateMM.innerText = monthArr[localStorage.getItem('weatherLang')][currentTime.getMonth()];

    this.cityBtn.innerText = controlsLocale[localStorage.getItem('weatherLang')][0];
    this.cityInput.setAttribute('placeholder', controlsLocale[localStorage.getItem('weatherLang')][1]);

    this.latitudeLabel.innerText = controlsLocale[localStorage.getItem('weatherLang')][2];
    this.longitudeLabel.innerText = controlsLocale[localStorage.getItem('weatherLang')][3];
  }

  showTimeHHMM = () => {
    let tm = new Date();
    var h = tm.getHours();
    var m = tm.getMinutes();
    var s = tm.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);

    this.dateHHMM.innerHTML = h + ':' + m + ':' + s;
  };

  checkTime(i) {
    return i < 10 ? '0' + i : i;
  }

  async showCity(city, country) {
    console.log('show text of City and Country');

    this.city.innerText = city;
    this.country.innerText = country;

    localStorage.removeItem('weatherCity');
    localStorage.setItem('weatherCity', city);
    localStorage.removeItem('weatherCountry');
    localStorage.setItem('weatherCountry', country);
  }

  async showCoordinates(coors) {
    this.latitudeValue.innerText = coors.lat;
    this.longitudeValue.innerText = coors.lng;
  }
}
