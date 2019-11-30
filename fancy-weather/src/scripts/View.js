import { weekDayArr, monthArr, lang, controlsLocale } from './consts.js';

export default class View {
  constructor() {
    this.page = document.querySelector('.page-wrap');

    this.renderControlElements();

    // Block 2: Showing current weather
    this.container = this.createElement('div', 'container', this.page);

    this.weather = this.createElement('div', 'weather', this.container);

    this.renderPlace();
    this.renderDate();
    this.renderCurrentWeather();
    this.renderForecastWeather();

    this.mapWrap = this.createElement('div', 'map__wrap', this.container);

    this.map = this.createElement('div', '', this.mapWrap);
    this.map.setAttribute('id', 'map');
    this.map.setAttribute('style', 'width: 350px; height: 350px');

    this.coors = this.createElement('div', 'map__coors', this.mapWrap);
    this.latitude = this.createElement('p', 'map__coors--latitude', this.coors);
    this.latitudeLabel = this.createElement('span', '', this.latitude);
    this.latitudeValue = this.createElement('span', 'map__coors--latitude', this.latitude);

    this.longitude = this.createElement('p', 'map__coors--longitude', this.coors);
    this.longitudeLabel = this.createElement('span', '', this.longitude);
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

  renderControlElements() {
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

    switch (localStorage.getItem('weatherLang')) {
      case 'en':
      case 'ru':
      case 'be':
        this.controlsLang.value = localStorage.getItem('weatherLang');
        break;
      default:
        localStorage.removeItem('weatherLang');
        localStorage.setItem('weatherLang', 'en');
        this.controlsLang.value = 'en';
    }

    this.units = this.createElement('div', 'controls__unit', this.controlsBtns);
    this.farengheit = this.createElement('button', 'controls__btn', this.units);
    this.farengheit.classList.add('controls__btn--farengeit');
    this.farengheit.innerText = '°F';
    this.celsius = this.createElement('button', 'controls__btn', this.units);
    this.celsius.classList.add('controls__btn--celsius');
    this.celsius.innerText = '°С';

    switch (localStorage.getItem('weatherUnit')) {
      case 'si':
        this.celsius.classList.add('controls__btn--unit-active');
        break;
      case 'us':
        this.farengheit.classList.add('controls__btn--unit-active');
        break;
      default:
        localStorage.setItem('weatherUnit', 'si');
        this.celsius.classList.add('controls__btn--unit-active');
    }

    this.citySearchForm = this.createElement('form', 'controls__search--form', this.controls);
    this.cityInput = this.createElement('input', 'controls__search--input', this.citySearchForm);
    this.cityInput.setAttribute('placeholder', controlsLocale[localStorage.getItem('weatherLang')][1]);
    this.cityInput.setAttribute('type', 'text');
    this.cityInput.setAttribute('id', 'city-input');
    this.cityInputLabel = this.createElement('label', 'visually-hidden', this.citySearchForm);
    this.cityInputLabel.setAttribute('for', 'city-input');
    this.cityInputLabel.innerText = 'Enter city name or Zip to search';

    this.cityBtn = this.createElement('button', 'controls__search--btn', this.citySearchForm);
    this.cityBtn.innerText = controlsLocale[localStorage.getItem('weatherLang')][0];
  }

  renderDate() {
    this.date = this.createElement('p', 'weather__date', this.weather);
    this.dateDay = this.createElement('span', 'weather__date--item', this.date);
    this.dateDD = this.createElement('span', 'weather__date--item', this.date);
    this.dateMM = this.createElement('span', 'weather__date--item', this.date);
    this.dateHHMM = this.createElement('span', 'weather__date--hhmm', this.date);
  }

  renderPlace() {
    this.place = this.createElement('p', 'weather__place', this.weather);
    this.city = this.createElement('span', 'weather__place--item', this.place);

    this.city.innerText = `${localStorage.getItem('weatherCity')}, `;
    this.country = this.createElement('span', 'weather__place--item', this.place);
    this.country.innerText = localStorage.getItem('weatherCountry');
  }

  renderCurrentWeather() {
    this.weatherCurrentWrap = this.createElement('div', 'weather__current--wrap', this.weather);
    this.temperature = this.createElement('p', 'weather__current', this.weatherCurrentWrap);
    this.temperatureSign = this.createElement('p', 'weather__current--sign', this.weatherCurrentWrap);
    this.temperatureSign.innerText = '°';
    this.weatherIconBig = this.createElement('img', 'weather__icon--big', this.weatherCurrentWrap);
    this.weatherIconBig.setAttribute('url', './images/icon-cloud.svg');
    this.weatherCurrentData = this.createElement('div', 'weather__current--list', this.weatherCurrentWrap);

    this.weatherSummary = this.createElement('p', 'weather__current--item', this.weatherCurrentData);

    this.weatherApparentWrap = this.createElement('p', 'weather__current--item', this.weatherCurrentData);
    this.weatherApparentLabel = this.createElement('span', '', this.weatherApparentWrap);
    this.weatherApparent = this.createElement('span', '', this.weatherApparentWrap);

    this.weatherWindWrap = this.createElement('p', 'weather__current--item', this.weatherCurrentData);
    this.weatherWind = this.createElement('span', '', this.weatherWindWrap);
    this.weatherWind = this.createElement('span', '', this.weatherWindWrap);

    this.weatherHumidity = this.createElement('p', 'weather__current--item', this.weatherCurrentData);
  }

  renderForecastWeather() {
    this.forecast = this.createElement('div', 'weather__forecast', this.weather);

    this.tomorrow = this.createElement('div', 'weather__forecast--item', this.forecast);
    this.tomorrowDay = this.createElement('p', 'weather__forecast--day', this.tomorrow);
    this.tomorrowTemperatureWrap = this.createElement('div', 'weather__forecast--temperature', this.tomorrow);
    this.tomorrowTemperature = this.createElement('span', '', this.tomorrowTemperatureWrap);
    this.tomorrowTemperatureSign = this.createElement('span', '', this.tomorrowTemperatureWrap);
    this.tomorrowTemperatureSign.innerText = '°';
    // this.tomorrowIcon =

    this.after2Days = this.createElement('div', 'weather__forecast--items', this.forecast);
    this.after2DaysDay = this.createElement('p', 'weather__forecast--day', this.after2Days);
    this.after2DaysTemperatureWrap = this.createElement('div', 'weather__forecast--temperature', this.after2Days);
    this.after2DaysTemperature = this.createElement('span', '', this.after2DaysTemperatureWrap);
    this.after2DaysTemperatureSign = this.createElement('span', '', this.after2DaysTemperatureWrap);
    this.after2DaysTemperatureSign.innerText = '°';

    this.after3Days = this.createElement('div', 'weather__forecast--items', this.forecast);
    this.after3DaysDay = this.createElement('p', 'weather__forecast--day', this.after3Days);
    this.after3DaysTemperatureWrap = this.createElement('p', 'weather__forecast--temperature', this.after3Days);
    this.after3DaysTemperature = this.createElement('span', '', this.after3DaysTemperatureWrap);
    this.after3DaysTemperatureSign = this.createElement('span', '', this.after3DaysTemperatureWrap);
    this.after3DaysTemperatureSign.innerText = '°';
  }

  showDate() {
    let time = new Date();
    const lang = localStorage.getItem('weatherLang');

    this.dateDay.innerText = weekDayArr[lang][time.getDay()];
    this.dateDD.innerText = time.getDate();
    this.dateMM.innerText = monthArr[lang][time.getMonth()];

    this.tomorrowDay.innerText = weekDayArr[lang][((time.getDay() + 1) % 7) + 7];
    this.after2DaysDay.innerText = weekDayArr[lang][((time.getDay() + 2) % 7) + 7];
    this.after3DaysDay.innerText = weekDayArr[lang][((time.getDay() + 3) % 7) + 7];

    this.cityBtn.innerText = controlsLocale[lang][0];
    this.cityInput.setAttribute('placeholder', controlsLocale[lang][1]);

    this.latitudeLabel.innerText = controlsLocale[lang][2];
    this.longitudeLabel.innerText = controlsLocale[lang][3];
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

  showWeatherData(data) {
    this.temperature.innerText = data.currently.temperature.toFixed(0);
    // console.log('\ntemperature: ', data.currently.temperature.toFixed(0));
    console.log('icon: ', data.currently.icon);
    this.weatherSummary.innerText = data.currently.summary;
    this.weatherApparent.innerText = data.currently.apparentTemperature;
    this.weatherWind.innerText = data.currently.windSpeed.toFixed(1);
    this.weatherHumidity.innerText = `${(data.currently.humidity * 100).toFixed(0)} %`;

    this.tomorrowTemperature.innerText = (
      (data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMax) /
      2
    ).toFixed(0);
    this.after2DaysTemperature.innerText = (
      (data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMax) /
      2
    ).toFixed(0);

    this.after3DaysTemperature.innerText = (
      (data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMax) /
      2
    ).toFixed(0);
    console.log('icon: ', data.daily.data[0].icon);
    console.log('icon: ', data.daily.data[1].icon);
    console.log('icon: ', data.daily.data[2].icon);
  }

  cleanMap() {
    var map = document.querySelector('#map');
    while (map.firstChild) {
      map.removeChild(map.firstChild);
    }
  }
}
