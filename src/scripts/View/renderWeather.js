import { createElement, appendNodes } from '../functions/functions.js';

export function renderCurrentWeather(weather) {
  const weatherCurrentWrap = createElement('div', 'weather__current--wrap');

  const temperatureWrap = createElement('div', 'weather__current');
  const weatherIconBig = createElement('div', 'weather__icon--big');
  const weatherCurrentData = createElement('div', 'weather__current--list');
  appendNodes([temperatureWrap, weatherIconBig, weatherCurrentData], weatherCurrentWrap);

  const temperature = createElement('span', '');
  const temperatureSign = createElement('span', 'weather__current--sign');
  appendNodes([temperature, temperatureSign], temperatureWrap);
  temperatureSign.innerText = '°';

  const weatherSummary = createElement('p', 'weather__current--item', weatherCurrentData);

  const weatherApparentWrap = createElement('p', 'weather__current--item');
  const weatherWindWrap = createElement('p', 'weather__current--item');
  const weatherHumidityWrap = createElement('p', 'weather__current--item');
  appendNodes([weatherApparentWrap, weatherWindWrap, weatherHumidityWrap], weatherCurrentData);

  const weatherApparentLabel = createElement('span', '');
  const weatherApparent = createElement('span', '');
  const weatherApparentSign = createElement('span', '');
  appendNodes([weatherApparentLabel, weatherApparent, weatherApparentSign], weatherApparentWrap);
  weatherApparentSign.innerText = '°';

  const weatherWindLabel = createElement('span', '');
  const weatherWind = createElement('span', '');
  const weatherWindSign = createElement('span', '');
  appendNodes([weatherWindLabel, weatherWind, weatherWindSign], weatherWindWrap);

  const weatherHumidityLabel = createElement('span', '', weatherHumidityWrap);
  const weatherHumidity = createElement('span', '', weatherHumidityWrap);
  appendNodes([weatherHumidityLabel, weatherHumidity], weatherHumidityWrap);

  appendNodes([weatherCurrentWrap], weather);
  return [
    temperature,
    weatherIconBig,
    weatherSummary,
    weatherApparentLabel,
    weatherApparent,
    weatherWindLabel,
    weatherWind,
    weatherWindSign,
    weatherHumidityLabel,
    weatherHumidity,
  ];
}

export function renderForecastWeather(weather) {
  const forecast = createElement('div', 'weather__forecast');

  const tomorrow = createElement('div', 'weather__forecast--item');
  const after2Days = createElement('div', 'weather__forecast--item');
  const after3Days = createElement('div', 'weather__forecast--item');
  appendNodes([tomorrow, after2Days, after3Days], forecast);

  const tomorrowDay = createElement('p', 'weather__forecast--day');
  const tomorrowTemperatureWrap = createElement('div', 'weather__forecast--temperature');
  appendNodes([tomorrowDay, tomorrowTemperatureWrap], tomorrow);

  const tomorrowTemperature = createElement('span', '', tomorrowTemperatureWrap);
  const tomorrowTemperatureSign = createElement('span', '', tomorrowTemperatureWrap);
  tomorrowTemperatureSign.innerText = '°';
  const tomorrowIcon = createElement('div', 'weather__icon--small', tomorrowTemperatureWrap);
  appendNodes([tomorrowTemperature, tomorrowTemperatureSign, tomorrowIcon], tomorrowTemperatureWrap);

  const after2DaysDay = createElement('p', 'weather__forecast--day', after2Days);
  const after2DaysTemperatureWrap = createElement('div', 'weather__forecast--temperature', after2Days);
  appendNodes([after2DaysDay, after2DaysTemperatureWrap], after2Days);

  const after2DaysTemperature = createElement('span', '', after2DaysTemperatureWrap);
  const after2DaysTemperatureSign = createElement('span', '', after2DaysTemperatureWrap);
  after2DaysTemperatureSign.innerText = '°';
  const after2DaysIcon = createElement('div', 'weather__icon--small', after2DaysTemperatureWrap);
  appendNodes([after2DaysTemperature, after2DaysTemperatureSign, after2DaysIcon], after2DaysTemperatureWrap);

  const after3DaysDay = createElement('p', 'weather__forecast--day', after3Days);
  const after3DaysTemperatureWrap = createElement('p', 'weather__forecast--temperature', after3Days);
  appendNodes([after3DaysDay, after3DaysTemperatureWrap], after3Days);

  const after3DaysTemperature = createElement('span', '', after3DaysTemperatureWrap);
  const after3DaysTemperatureSign = createElement('span', '', after3DaysTemperatureWrap);
  after3DaysTemperatureSign.innerText = '°';
  const after3DaysIcon = createElement('div', 'weather__icon--small', after3DaysTemperatureWrap);
  appendNodes([after3DaysTemperature, after3DaysTemperatureSign, after3DaysIcon], after3DaysTemperatureWrap);

  appendNodes([forecast], weather);
  return [
    tomorrowDay,
    tomorrowTemperature,
    tomorrowIcon,
    after2DaysDay,
    after2DaysTemperature,
    after2DaysIcon,
    after3DaysDay,
    after3DaysTemperature,
    after3DaysIcon,
  ];
}
