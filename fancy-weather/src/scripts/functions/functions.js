import { errorMsg } from '../View/consts.js';

const moment = require('moment-timezone');

export function randomInt(min, max) {
  // get rundom number from (min-0.5) to (max+0.5)
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function celsiusToFarengeitAndReverse(temp, isToCelsius = true) {
  return isToCelsius ? ((temp - 32) / 1.8).toFixed(0) : ((9 / 5) * temp + 32).toFixed(0);
}

export function timeThere(timezone) {
  const timeThatPlace = moment()
    .tz(timezone)
    .format();
  const hour = timeThatPlace.slice(11, 13);
  const tmCur = new Date();
  const hCur = tmCur.getHours();
  const delta = hour - hCur;
  localStorage.setItem('hoursDelta', delta);
}

export function createPopup(errorType) {
  const popup = document.querySelector('.popup');
  popup.classList.remove('visually-hidden');
  const lang = localStorage.getItem('weatherLang');
  popup.innerText = errorMsg[lang][errorType];
  setTimeout(() => popup.classList.add('visually-hidden'), 2500);
}

export function createElement(tag, classes, whereAppend) {
  const element = document.createElement(tag);
  if (classes) element.className = classes;
  whereAppend.append(element);
  return element;
}

export function getSeason(month) {
  const winter = [11, 0, 1];
  const spring = [2, 3, 4];
  const fall = [8, 9, 10];

  if (winter.includes(month)) return 'winter';
  if (spring.includes(month)) return 'spring';
  if (fall.includes(month)) return 'fall';
  return 'summer';
}

export function getCity(data) {
  const place = data.results[0].components;

  if (place.city !== undefined) return place.city;
  if (place.town !== undefined) return place.town;
  if (place.village !== undefined) return place.village;
  if (place.state !== undefined) return place.state;
  return '';
}

export function zeroAdd(i) {
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
