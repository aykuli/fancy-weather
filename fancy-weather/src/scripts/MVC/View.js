import { weekDayArr, monthArr, controlsLocale, weatherIcons } from '../modules/consts.js';
import { celsiusToFarengeitAndReverse, createPopup, createElement } from '../modules/functions.js';
import 'weather-icons/css/weather-icons.css';
import { renderControlBtns } from './renderControlBtns.js';
import { renderInput } from './renderInput.js';

export default class View {
  constructor() {
    // this.page = document.querySelector('.page-wrap');
    this.page = createElement('div', 'page-wrap', document.body);
    // Block 1: control elements and input form
    [
      this.controls,
      this.controlsLang,
      this.controlsBtnRefresh,
      this.units,
      this.farengheit,
      this.celsius,
    ] = renderControlBtns(this.page);

    [this.citySearchForm, this.cityInput, this.cityBtn] = renderInput(this.controls);

    // Block 2: Showing current weather
    this.container = createElement('div', 'container', this.page);
    this.weather = createElement('div', 'weather', this.container);

    // Block 3: Weather data
    this.renderPlace();
    this.renderDate();
    this.renderCurrentWeather();
    this.renderForecastWeather();

    // Block 4: Map and coordinates
    this.renderMap();

    this.renderPopup();

    this.showDate();
    this.showTimeHHMM();
    window.setInterval(this.showTimeHHMM, 1000);
    this.showWeatherUnits(localStorage.getItem('weatherLang'));
  }

  renderDate() {
    this.date = createElement('p', 'weather__date', this.weather);
    this.dateDay = createElement('span', 'weather__date--item', this.date);
    this.dateMM = createElement('span', 'weather__date--item', this.date);
    this.dateDD = createElement('span', 'weather__date--item', this.date);
    this.datehh = createElement('span', '', this.date);
    this.datemm = createElement('span', '', this.date);
  }

  renderPlace() {
    this.place = createElement('p', 'weather__place', this.weather);
    this.city = createElement('span', 'weather__place--item', this.place);

    this.city.innerText = `${localStorage.getItem('weatherCity')}, `;
    this.country = createElement('span', 'weather__place--item', this.place);
    this.country.innerText = localStorage.getItem('weatherCountry');
  }

  renderCurrentWeather() {
    this.weatherCurrentWrap = createElement('div', 'weather__current--wrap', this.weather);
    this.temperatureWrap = createElement('div', 'weather__current', this.weatherCurrentWrap);
    this.temperature = createElement('span', '', this.temperatureWrap);
    this.temperatureSign = createElement('span', 'weather__current--sign', this.temperatureWrap);
    this.temperatureSign.innerText = '°';

    this.weatherIconBig = createElement('i', 'weather__icon--big', this.weatherCurrentWrap);

    this.weatherCurrentData = createElement('div', 'weather__current--list', this.weatherCurrentWrap);
    this.weatherSummary = createElement('p', 'weather__current--item', this.weatherCurrentData);

    this.weatherApparentWrap = createElement('p', 'weather__current--item', this.weatherCurrentData);
    this.weatherApparentLabel = createElement('span', '', this.weatherApparentWrap);
    this.weatherApparent = createElement('span', '', this.weatherApparentWrap);

    this.weatherWindWrap = createElement('p', 'weather__current--item', this.weatherCurrentData);
    this.weatherWindLabel = createElement('span', '', this.weatherWindWrap);
    this.weatherWind = createElement('span', '', this.weatherWindWrap);
    this.weatherWindSign = createElement('span', '', this.weatherWindWrap);

    this.weatherHumidityWrap = createElement('p', 'weather__current--item', this.weatherCurrentData);
    this.weatherHumidityLabel = createElement('p', 'weather__current--item', this.weatherHumidityWrap);
    this.weatherHumidity = createElement('p', 'weather__current--item', this.weatherHumidityWrap);
  }

  renderForecastWeather() {
    this.forecast = createElement('div', 'weather__forecast', this.weather);

    this.tomorrow = createElement('div', 'weather__forecast--item', this.forecast);
    this.tomorrowDay = createElement('p', 'weather__forecast--day', this.tomorrow);

    this.tomorrowTemperatureWrap = createElement('div', 'weather__forecast--temperature', this.tomorrow);
    this.tomorrowTemperature = createElement('span', '', this.tomorrowTemperatureWrap);
    this.tomorrowTemperatureSign = createElement('span', '', this.tomorrowTemperatureWrap);
    this.tomorrowTemperatureSign.innerText = '°';
    this.tomorrowIcon = createElement('i', '', this.tomorrowTemperatureWrap);

    this.after2Days = createElement('div', 'weather__forecast--item', this.forecast);
    this.after2DaysDay = createElement('p', 'weather__forecast--day', this.after2Days);
    this.after2DaysTemperatureWrap = createElement('div', 'weather__forecast--temperature', this.after2Days);
    this.after2DaysTemperature = createElement('span', '', this.after2DaysTemperatureWrap);
    this.after2DaysTemperatureSign = createElement('span', '', this.after2DaysTemperatureWrap);
    this.after2DaysTemperatureSign.innerText = '°';
    this.after2DaysIcon = createElement('i', '', this.after2DaysTemperatureWrap);

    this.after3Days = createElement('div', 'weather__forecast--item', this.forecast);
    this.after3DaysDay = createElement('p', 'weather__forecast--day', this.after3Days);
    this.after3DaysTemperatureWrap = createElement('p', 'weather__forecast--temperature', this.after3Days);
    this.after3DaysTemperature = createElement('span', '', this.after3DaysTemperatureWrap);
    this.after3DaysTemperatureSign = createElement('span', '', this.after3DaysTemperatureWrap);
    this.after3DaysTemperatureSign.innerText = '°';
    this.after3DaysIcon = createElement('i', '', this.after3DaysTemperatureWrap);
  }

  renderMap() {
    this.mapWrap = createElement('div', 'map__wrap', this.container);

    this.map = createElement('div', '', this.mapWrap);
    this.map.setAttribute('id', 'map');
    this.map.setAttribute('style', 'width: 320px; height: 320px');

    this.coors = createElement('div', 'map__coors', this.mapWrap);
    this.latitude = createElement('p', 'map__coors--latitude', this.coors);
    this.latitudeLabel = createElement('span', '', this.latitude);
    this.latitudeValue = createElement('span', 'map__coors--latitude', this.latitude);

    this.longitude = createElement('p', 'map__coors--longitude', this.coors);
    this.longitudeLabel = createElement('span', '', this.longitude);
    this.longitudeValue = createElement('span', 'map__coors--longitude', this.longitude);
  }

  renderPopup() {
    this.renderPopup = createElement('div', 'popup visually-hidden', this.page);
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

  showTimeHHMM = hour => {
    if (hour) {
    } else {
    }
    let tm = new Date();
    let h = tm.getHours();
    let m = tm.getMinutes();
    let s = tm.getSeconds();
    m = this.checkTime(m);
    s = this.checkTime(s);

    this.datemm.innerHTML = ':' + m + ':' + s;
  };

  checkTime(i) {
    return i < 10 ? '0' + i : i;
  }

  async showCity(city, country) {
    console.log('show text of City and Country');

    if (city !== '') {
      this.city.innerText = `${city}, `;
    } else this.city.innerText = '';
    this.country.innerText = country;

    localStorage.removeItem('weatherCity');
    localStorage.setItem('weatherCity', city);
    localStorage.removeItem('weatherCountry');
    localStorage.setItem('weatherCountry', country);
  }

  showCoordinates(lat, lng) {
    const latMin = Math.abs((lat.toFixed(0) - lat) * 60).toFixed(0);
    const lngMin = Math.abs((lng.toFixed(0) - lng) * 60).toFixed(0);
    this.latitudeValue.innerText = `${lat.toFixed(0)}° ${latMin}\'`;
    this.longitudeValue.innerText = `${lng.toFixed(0)}° ${lngMin}\'`;
  }

  showWeatherData(data) {
    if (data === undefined) createPopup("Weather data hasn't been loaded");

    this.temperature.innerText = data.currently.temperature.toFixed(0);
    this.weatherIconBig.className = `weather__icon--big wi ${weatherIcons.get(data.currently.icon)}`;

    this.weatherSummary.innerText = data.currently.summary;
    this.weatherApparent.innerText = `${data.currently.apparentTemperature}°`;
    this.weatherWind.innerText = data.currently.windSpeed.toFixed(1);
    this.weatherHumidity.innerText = `${(data.currently.humidity * 100).toFixed(0)}%`;

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

    this.tomorrowIcon.className = `weather__icon--small wi ${weatherIcons.get(data.daily.data[0].icon)}`;
    this.after2DaysIcon.className = `weather__icon--small wi ${weatherIcons.get(data.daily.data[1].icon)}`;
    this.after3DaysIcon.className = `weather__icon--small wi ${weatherIcons.get(data.daily.data[2].icon)}`;
  }

  cleanMap() {
    var map = document.querySelector('#map');
    while (map.firstChild) {
      map.removeChild(map.firstChild);
    }
  }

  showWeatherUnits(lang) {
    this.weatherApparentLabel.innerText = controlsLocale[lang][4];
    this.weatherWindLabel.innerText = controlsLocale[lang][5];
    this.weatherWindSign.innerText = controlsLocale[lang][6];
    this.weatherHumidityLabel.innerText = controlsLocale[lang][7];
  }

  watchUnitChanging() {
    this.units.addEventListener('click', e => {
      console.log('кликаем на смену фарегейта');
      const active = document.querySelector('.controls__btn--unit-active');
      localStorage.removeItem('weatherUnit');

      if (e.target !== active) {
        active.classList.remove('controls__btn--unit-active');
        switch (e.target) {
          case this.farengheit:
            this.farengheit.classList.add('controls__btn--unit-active');

            const celsius = Number(this.temperature.innerText);
            const celsiusTomorrow = Number(this.tomorrowTemperature.innerText);
            const celsiusAfter2Days = Number(this.after2DaysTemperature.innerText);
            const celsiusAfter3Days = Number(this.after3DaysTemperature.innerText);

            this.temperature.innerText = celsiusToFarengeitAndReverse(celsius);
            this.tomorrowTemperature.innerText = celsiusToFarengeitAndReverse(celsiusTomorrow);
            this.after2DaysTemperature.innerText = celsiusToFarengeitAndReverse(celsiusAfter2Days);
            this.after3DaysTemperature.innerText = celsiusToFarengeitAndReverse(celsiusAfter3Days);

            localStorage.setItem('weatherUnit', 'us');
            break;
          case this.celsius:
            this.celsius.classList.add('controls__btn--unit-active');

            const farengheit = Number(this.temperature.innerText);
            const farengheitTomorrow = Number(this.tomorrowTemperature.innerText);
            const farengheitAfter2Days = Number(this.after2DaysTemperature.innerText);
            const farengheitAfter3Days = Number(this.after3DaysTemperature.innerText);

            this.temperature.innerText = celsiusToFarengeitAndReverse(farengheit, false);
            this.tomorrowTemperature.innerText = celsiusToFarengeitAndReverse(farengheitTomorrow, false);
            this.after2DaysTemperature.innerText = celsiusToFarengeitAndReverse(farengheitAfter2Days, false);
            this.after3DaysTemperature.innerText = celsiusToFarengeitAndReverse(farengheitAfter3Days, false);

            localStorage.setItem('weatherUnit', 'si');
            break;
          default:
            createPopup('Something wrong with units. Reload page');
        }
      }
    });
  }

  animatingBtns() {
    document.body.insertAdjacentHTML('beforeend', '<p>Привет</p>');
  }
}
