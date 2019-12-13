import { weekDayArr, monthArr, controlsLocale, weatherIcons } from './consts.js';
import { celsiusToFarengeitAndReverse, createPopup, createElement, checkTime } from '../functions/functions.js';
import renderControlBtns from './renderControlBtns.js';
import renderInput from './renderInput.js';
import { renderCurrentWeather, renderForecastWeather } from './renderWeather.js';
import renderDate from './renderDate.js';
import renderMap from './renderMap.js';
import renderPlace from './renderPlace.js';

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

    const lang = localStorage.getItem('weatherLang');

    [this.citySearchForm, this.cityInput, this.cityBtn, this.speechBtn, this.speechBg] = renderInput(
      this.controls,
      lang
    );

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

    this.showLabels();
    this.showDate();
    this.showTimeHHMM();
    window.setInterval(this.showTimeHHMM, 60000);
  }

  showDate() {
    const time = new Date();
    const lang = localStorage.getItem('weatherLang');

    this.dateDay.innerText = weekDayArr[lang][time.getDay()];
    this.dateDD.innerText = time.getDate();
    this.dateMM.innerText = monthArr[lang][time.getMonth()];

    this.tomorrowDay.innerText = weekDayArr[lang][((time.getDay() + 1) % 7) + 7];
    this.after2DaysDay.innerText = weekDayArr[lang][((time.getDay() + 2) % 7) + 7];
    this.after3DaysDay.innerText = weekDayArr[lang][((time.getDay() + 3) % 7) + 7];
  }

  showLabels() {
    const lang = localStorage.getItem('weatherLang');

    let placeholder;
    [
      this.cityBtn.innerText,
      placeholder,
      this.latitudeLabel.innerText,
      this.longitudeLabel.innerText,
      this.weatherApparentLabel.innerText,
      this.weatherWindLabel.innerText,
      this.weatherWindSign.innerText,
      this.weatherHumidityLabel.innerText,
    ] = controlsLocale[lang];
    this.cityInput.setAttribute('placeholder', placeholder);
  }

  showTimeHHMM = () => {
    const tm = new Date();
    let m = tm.getMinutes();
    const h = tm.getHours();
    m = checkTime(m);
    this.datemm.innerHTML = `:${m}`;
    this.datehh.innerText = h + Number(localStorage.getItem('hoursDelta'));
  };

  async showCity(city, country) {
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
    const zeroAdd = val => (val < 10 ? `0${val}` : `${val}`);
    const latMinutes = zeroAdd(Math.abs((lat.toFixed(0) - lat) * 60).toFixed(0));
    const lngMinutes = zeroAdd(Math.abs((lng.toFixed(0) - lng) * 60).toFixed(0));
    this.latitudeValue.innerText = `${Math.abs(lat.toFixed(0))}° ${latMinutes}`;
    this.longitudeValue.innerText = `${Math.abs(lng.toFixed(0))}° ${lngMinutes}`;
  }

  showWeatherData(data) {
    if (data === undefined) {
      createPopup("Weather data hasn't been loaded");
      return;
    }

    const tempArr = [
      data.currently.temperature.toFixed(0),
      data.currently.apparentTemperature.toFixed(0),
      ((data.daily.data[0].temperatureMax + data.daily.data[0].temperatureMax) / 2).toFixed(0),
      ((data.daily.data[1].temperatureMax + data.daily.data[1].temperatureMax) / 2).toFixed(0),
      ((data.daily.data[2].temperatureMax + data.daily.data[2].temperatureMax) / 2).toFixed(0),
    ];

    const zeroFixedTemps = tempArr.map(el => (el.toString() === '-0' ? 0 : el));

    [
      this.temperature.innerText,
      this.weatherApparent.innerText,
      this.tomorrowTemperature.innerText,
      this.after2DaysTemperature.innerText,
      this.after3DaysTemperature.innerText,
    ] = zeroFixedTemps;
    this.weatherSummary.innerText = data.currently.summary;
    this.weatherWind.innerText = data.currently.windSpeed.toFixed(1);
    this.weatherHumidity.innerText = `${(data.currently.humidity * 100).toFixed(0)}%`;

    const getIcon = key => weatherIcons.get(data.daily.data[key].icon);
    const [iconTomorrow, iconAfter2Day, iconAfter3Day] = [getIcon(0), getIcon(1), getIcon(2), getIcon(3)];
    const iconUrl = (icon, el) => {
      if (el === this.weatherIconBig) {
        return `url(${require(`../../assets/img/${icon}.png`)})`; // eslint-disable-line
      }
      if (icon === 'cloudy' || icon === 'partly-cloudy-day' || icon === 'partly-cloudy-night') {
        el.classList.remove('weather__icon--small');
        el.classList.add('weather__icon--small-top');
      } else {
        el.classList.remove('weather__icon--small-top');
        el.classList.add('weather__icon--small');
      }
      return `url(${require(`../../assets/img/${icon}.png`)})`; // eslint-disable-line
    };

    const iconToday = weatherIcons.get(data.currently.icon);

    this.weatherIconBig.style.backgroundImage = iconUrl(iconToday, this.weatherIconBig);
    this.tomorrowIcon.style.backgroundImage = iconUrl(iconTomorrow, this.tomorrowIcon);
    this.after2DaysIcon.style.backgroundImage = iconUrl(iconAfter2Day, this.after2DaysIcon);
    this.after3DaysIcon.style.backgroundImage = iconUrl(iconAfter3Day, this.after3DaysIcon);
  }

  cleanMap() {
    while (this.map.firstChild) {
      this.map.removeChild(this.map.firstChild);
    }
  }

  watchUnitChanging() {
    this.units.addEventListener('click', e => {
      const active = document.querySelector('.controls__btn--unit-active');
      localStorage.removeItem('weatherUnit');

      if (e.target !== active) {
        active.classList.remove('controls__btn--unit-active');
        this.setTemperature(e.target);
        switch (e.target) {
          case this.farengheit:
            localStorage.setItem('weatherUnit', 'us');
            break;
          case this.celsius:
            localStorage.setItem('weatherUnit', 'si');
            break;
          default:
            createPopup('Something wrong with units. Reload page');
        }
      }
    });
  }

  setTemperature(element) {
    element.classList.add('controls__btn--unit-active');

    const temperature = Number(this.temperature.innerText);
    const tomorrow = Number(this.tomorrowTemperature.innerText);
    const after2Days = Number(this.after2DaysTemperature.innerText);
    const after3Days = Number(this.after3DaysTemperature.innerText);
    // prettier-ignore
    const isCelsius = (element === this.celsius);
    this.temperature.innerText = celsiusToFarengeitAndReverse(temperature, isCelsius);
    this.tomorrowTemperature.innerText = celsiusToFarengeitAndReverse(tomorrow, isCelsius);
    this.after2DaysTemperature.innerText = celsiusToFarengeitAndReverse(after2Days, isCelsius);
    this.after3DaysTemperature.innerText = celsiusToFarengeitAndReverse(after3Days, isCelsius);
  }
}
