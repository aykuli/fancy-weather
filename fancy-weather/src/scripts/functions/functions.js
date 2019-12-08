const moment = require('moment-timezone');

export function randomInt(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function celsiusToFarengeitAndReverse(temp, isToFarengheit = true) {
  return isToFarengheit ? ((9 / 5) * temp + 32).toFixed(0) : ((5 / 9) * (temp - 32)).toFixed(0);
}

export function timeThere(timezone) {
  const timeThatPlace = moment()
    .tz(timezone)
    .format();
  const hour = timeThatPlace.slice(11, 13);
  return hour;
}

export function createPopup(msg) {
  const popup = document.querySelector('.popup');
  popup.classList.remove('visually-hidden');
  popup.innerText = msg;
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
  } else if (month > 1 || month < 5) {
    res = 'spring';
  } else if (month > 4 || month < 8) {
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
