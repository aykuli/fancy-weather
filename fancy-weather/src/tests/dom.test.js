import { renderCurrentWeather, renderForecastWeather } from '../scripts/View/renderWeather.js';
import { createElement } from '../scripts/functions/functions.js';
import renderInput from '../scripts/View/renderInput.js';

require('@babel/register');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const options = {
  contentType: 'text/html',
  includeNodeLocations: true,
  storageQuota: 10000000,
  runScripts: 'outside-only',
};

// создаем виртуальный DOM в Node.js
const dom = new JSDOM(
  `<!DOCTYPE html>
<html lang="en">
<body>
  <div class="page-wrap visually-hidden"></div>
</body>
</html>
`,
  options
).window;

const page = dom.window.document.querySelector('.page-wrap');
/* eslint-disable */
test('has document', () => {
  expect(page.nodeName).toEqual('DIV');
});

test('createElement function', () => {
  const el = createElement('div', 'anyClassName', page);
  expect(el.nodeName).toEqual('DIV');
  expect(el.className).toEqual('anyClassName');
});

test('renderForecastWeather creates elements in Block2 and 3', () => {
  const [
    tomorrowDay,
    tomorrowTemperature,
    tomorrowIcon,
    after2DaysDay,
    after2DaysTemperature,
    after2DaysIcon,
    after3DaysDay,
    after3DaysTemperature,
    after3DaysIcon,
  ] = renderForecastWeather(page);

  expect(tomorrowDay.className).toEqual('weather__forecast--day');
  expect(tomorrowTemperature.nodeName).toEqual('SPAN');
  expect(tomorrowIcon.nodeName).toEqual('DIV');
  expect(after2DaysDay.className).toEqual('weather__forecast--day');
  expect(after2DaysTemperature.nodeName).toEqual('SPAN');
  expect(after2DaysIcon.nodeName).toEqual('DIV');
  expect(after3DaysDay.className).toEqual('weather__forecast--day');
  expect(after3DaysTemperature.nodeName).toEqual('SPAN');
  expect(after3DaysIcon.nodeName).toEqual('DIV');
});

test('renderCurrentWeather creates elements in Block2 and 3', () => {
  const [
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
  ] = renderCurrentWeather(page);

  expect(temperature.className).toEqual('');
  expect(weatherIconBig.className).toEqual('weather__icon--big');
  expect(weatherIconBig.nodeName).toEqual('DIV');
  expect(weatherSummary.className).toEqual('weather__current--item');
  expect(weatherApparentLabel.nodeName).toEqual('SPAN');
  expect(weatherApparent.nodeName).toEqual('SPAN');
  expect(weatherWindLabel.nodeName).toEqual('SPAN');
  expect(weatherWind.nodeName).toEqual('SPAN');
  expect(weatherWindSign.nodeName).toEqual('SPAN');
  expect(weatherHumidityLabel.nodeName).toEqual('SPAN');
  expect(weatherHumidity.nodeName).toEqual('SPAN');
});

test('renderInput creates input from in Block 1', () => {
  const lang = 'en';
  const elArr = renderInput(page, lang);
  expect(elArr[0].className).toEqual('controls__search--form');
  expect(elArr[0].nodeName).toEqual('DIV');

  expect(elArr[1].className).toEqual('controls__search--input');
  expect(elArr[1].nodeName).toEqual('INPUT');

  expect(elArr[2].className).toEqual('controls__search--btn');
});
/* eslint-enable */
