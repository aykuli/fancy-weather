export function randomInt(min, max) {
  // получить случайное число от (min-0.5) до (max+0.5)
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

export function celsiusToFarengeitAndReverse(temp, isToFarengheit = true) {
  return isToFarengheit ? ((9 / 5) * temp + 32).toFixed(0) : ((5 / 9) * (temp - 32)).toFixed(0);
}
