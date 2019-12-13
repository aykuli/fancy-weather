import { errorMsg } from '../View/consts.js';

const moment = require('moment-timezone');

export function randomInt(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function celsiusToFarengeitAndReverse(temp, isToCelsius = true) {
  return !isToCelsius ? ((9 / 5) * temp + 32).toFixed(0) : ((temp - 32) / 1.8).toFixed(0);
}

export function timeThere(timezone) {
  const timeThatPlace = moment()
    .tz(timezone)
    .format();
  const hour = timeThatPlace.slice(11, 13);
  const tmCur = new Date();
  const hCur = tmCur.getHours();
  const delta = hour - hCur;
  return [hour, delta];
}

export function createPopup(i = 0) {
  const popup = document.querySelector('.popup');
  popup.classList.remove('visually-hidden');
  const lang = localStorage.getItem('weatherLang');
  popup.innerText = errorMsg[lang][i];
  console.log(errorMsg[lang][i]);
  setTimeout(() => popup.classList.add('visually-hidden'), 2500);
}

export function createElement(tag, classes, whereAppend) {
  const element = document.createElement(tag);
  if (classes) element.className = classes;
  whereAppend.append(element);
  return element;
}

export function getSeason(month) {
  let res = 'summer';
  if (month < 2 || month === 11) {
    res = 'winter';
  } else if (month > 1 && month < 5) {
    res = 'spring';
  } else if (month > 4 && month < 8) {
    res = '';
  } else {
    res = 'fall';
  }
  return res;
}

export function getCity(data) {
  if (data.results[0].components.city === undefined) {
    return data.results[0].components.village === undefined
      ? data.results[0].components.state
      : data.results[0].components.village;
  }
  return data.results[0].components.city;
}

export function checkTime(i) {
  return i < 10 ? `0${i}` : i;
}

export function recognitionActivityShow() {
  const bg = document.querySelector('.controls__speech--bg');
  bg.style.backgroundColor = 'rgb(256, 103, 23)';

  return window.setInterval(() => {
    let el = document.querySelector('.pos0');
    if (el) {
      el.classList.add('pos1');
      el.classList.remove('pos0');
    } else {
      el = document.querySelector('.pos1');
      el.classList.add('pos0');
      el.classList.remove('pos1');
    }
  }, 500);
}
