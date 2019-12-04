const moment = require('moment-timezone');

export function randomInt(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function celsiusToFarengeitAndReverse(temp, isToFarengheit = true) {
  return isToFarengheit ? ((9 / 5) * temp + 32).toFixed(0) : ((5 / 9) * (temp - 32)).toFixed(0);
}

export function timeThere(timezone) {
  const timeThere = moment()
    .tz(timezone)
    .format();
  const hour = timeThere.slice(11, 13);
  return hour;
}

export function createPopup(msg) {
  const popup = document.querySelector('.popup');
  popup.classList.remove('visually-hidden');
  popup.innerText = msg;
  setTimeout(() => popup.classList.add('visually-hidden'), 5000);
}
