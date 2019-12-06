import { randomInt, celsiusToFarengeitAndReverse, timeThere, createPopup } from '../scripts/modules/functions.js';

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
