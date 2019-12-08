import {
  randomInt,
  celsiusToFarengeitAndReverse,
  timeThere,
  createPopup,
  getSeason,
  getCity,
} from '../scripts/functions/functions.js';

/* eslint-disable */
test('typeof functions must be function', () => {
  expect(typeof randomInt).toBe('function');
  expect(typeof celsiusToFarengeitAndReverse).toBe('function');
  expect(typeof timeThere).toBe('function');
  expect(typeof createPopup).toBe('function');
});

test('Check calculation temperature from celcius to Farengeit and reverse', () => {
  let tempCelcius = celsiusToFarengeitAndReverse(20);
  expect(tempCelcius).toStrictEqual('68');

  tempCelcius = celsiusToFarengeitAndReverse(100.4);
  expect(tempCelcius).toStrictEqual('213');

  let tempFarengheit = celsiusToFarengeitAndReverse(41, false);
  expect(tempFarengheit).toStrictEqual('5');

  tempFarengheit = celsiusToFarengeitAndReverse(131, false);
  expect(tempFarengheit).toStrictEqual('55');
});

test('Check randomInt function', () => {
  const numb = randomInt(15, 37);

  expect(numb).toBeGreaterThanOrEqual(15);
  expect(numb).toBeLessThanOrEqual(37);
});

test('getSeason function', () => {
  let month = 0; // January
  let season = getSeason(month);
  expect(season).toEqual('winter');

  month = 4; // May
  season = getSeason(month);
  expect(season).toEqual('spring');

  month = 7; // August
  season = getSeason(month);
  expect(season).toEqual('');

  month = 8; //September
  season = getSeason(month);
  expect(season).toEqual('fall');
});

test('getCity function', () => {
  let data = {
    results: {
      0: {
        components: { city: 'Moscow' },
      },
    },
  };
  expect(getCity(data)).toEqual('Moscow');

  data = {
    results: {
      0: {
        components: { state: 'SomePlaceOnTheEarth' },
      },
    },
  };
  expect(getCity(data)).toEqual('SomePlaceOnTheEarth');
});
/* eslint-enable */
