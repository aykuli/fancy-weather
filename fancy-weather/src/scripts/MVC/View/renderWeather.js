import { createElement } from '../../functions/functions.js';

export function renderCurrentWeather(weather) {
  const weatherCurrentWrap = createElement('div', 'weather__current--wrap', weather);
  const temperatureWrap = createElement('div', 'weather__current', weatherCurrentWrap);
  const temperature = createElement('span', '', temperatureWrap);
  const temperatureSign = createElement('span', 'weather__current--sign', temperatureWrap);
  temperatureSign.innerText = '°';

  const weatherIconBig = createElement('div', 'weather__icon--big', weatherCurrentWrap);

  const weatherCurrentData = createElement('div', 'weather__current--list', weatherCurrentWrap);
  const weatherSummary = createElement('p', 'weather__current--item', weatherCurrentData);

  const weatherApparentWrap = createElement('p', 'weather__current--item', weatherCurrentData);
  const weatherApparentLabel = createElement('span', '', weatherApparentWrap);
  const weatherApparent = createElement('span', '', weatherApparentWrap);

  const weatherWindWrap = createElement('p', 'weather__current--item', weatherCurrentData);
  const weatherWindLabel = createElement('span', '', weatherWindWrap);
  const weatherWind = createElement('span', '', weatherWindWrap);
  const weatherWindSign = createElement('span', '', weatherWindWrap);

  const weatherHumidityWrap = createElement('p', 'weather__current--item', weatherCurrentData);
  const weatherHumidityLabel = createElement('span', '', weatherHumidityWrap);
  const weatherHumidity = createElement('span', '', weatherHumidityWrap);

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
  const forecast = createElement('div', 'weather__forecast', weather);

  const tomorrow = createElement('div', 'weather__forecast--item', forecast);
  const tomorrowDay = createElement('p', 'weather__forecast--day', tomorrow);

  const tomorrowTemperatureWrap = createElement('div', 'weather__forecast--temperature', tomorrow);
  const tomorrowTemperature = createElement('span', '', tomorrowTemperatureWrap);
  const tomorrowTemperatureSign = createElement('span', '', tomorrowTemperatureWrap);
  tomorrowTemperatureSign.innerText = '°';
  const tomorrowIcon = createElement('div', 'weather__icon--small', tomorrowTemperatureWrap);

  const after2Days = createElement('div', 'weather__forecast--item', forecast);
  const after2DaysDay = createElement('p', 'weather__forecast--day', after2Days);
  const after2DaysTemperatureWrap = createElement('div', 'weather__forecast--temperature', after2Days);
  const after2DaysTemperature = createElement('span', '', after2DaysTemperatureWrap);
  const after2DaysTemperatureSign = createElement('span', '', after2DaysTemperatureWrap);
  after2DaysTemperatureSign.innerText = '°';
  const after2DaysIcon = createElement('div', 'weather__icon--small', after2DaysTemperatureWrap);

  const after3Days = createElement('div', 'weather__forecast--item', forecast);
  const after3DaysDay = createElement('p', 'weather__forecast--day', after3Days);
  const after3DaysTemperatureWrap = createElement('p', 'weather__forecast--temperature', after3Days);
  const after3DaysTemperature = createElement('span', '', after3DaysTemperatureWrap);
  const after3DaysTemperatureSign = createElement('span', '', after3DaysTemperatureWrap);
  after3DaysTemperatureSign.innerText = '°';
  const after3DaysIcon = createElement('div', 'weather__icon--small', after3DaysTemperatureWrap);

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
