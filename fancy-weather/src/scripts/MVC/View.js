import { weekDayArr, monthArr, controlsLocale, weatherIcons } from '../modules/consts.js';
import { celsiusToFarengeitAndReverse, createPopup, createElement } from '../modules/functions.js';
import 'weather-icons/css/weather-icons.css';
import { renderControlBtns } from './renderControlBtns.js';
import { renderInput } from './renderInput.js';
import { renderCurrentWeather, renderForecastWeather } from '../MVC/renderWeather.js';
import { renderDate } from './renderDate.js';
import { renderMap } from './renderMap.js';
import { renderPlace } from './renderPlace.js';

export default class View {
  constructor() {
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
    [this.city, this.country] = renderPlace(this.weather);
    [this.dateDay, this.dateMM, this.dateDD, this.datehh, this.datemm] = renderDate(this.weather);

    [
      this.temperature,
      this.weatherIconBig,
      this.weatherSummary,
      this.weatherApparentLabel,
      this.weatherApparent,
      this.weatherWindLabel,
      this.weatherWind,
      this.weatherWindSign,
      this.weatherHumidityLabel,
      this.weatherHumidity,
    ] = renderCurrentWeather(this.weather);
    [
      this.tomorrowDay,
      this.tomorrowTemperature,
      this.tomorrowIcon,
      this.after2DaysDay,
      this.after2DaysTemperature,
      this.after2DaysIcon,
      this.after3DaysDay,
      this.after3DaysTemperature,
      this.after3DaysIcon,
    ] = renderForecastWeather(this.weather);

    // Block 4: Map and coordinates
    [this.map, this.latitudeLabel, this.latitudeValue, this.longitudeLabel, this.longitudeValue] = renderMap(
      this.container
    );

    this.renderPopup = createElement('div', 'popup visually-hidden', this.page);

    this.showDate();
    this.showTimeHHMM();
    window.setInterval(this.showTimeHHMM, 1000);
    this.showWeatherUnits(localStorage.getItem('weatherLang'));
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
}
