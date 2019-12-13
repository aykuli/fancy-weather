import { darkSkyKey } from './apiKeys.js';

export default async function getWeatherData(lat, lng) {
  const apiKey = darkSkyKey;
  const lang = localStorage.getItem('weatherLang');
  const unit = localStorage.getItem('weatherUnit');
  const url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${lat},${lng}?lang=${lang}&units=${unit}`;

  const response = await fetch(url, { type: 'no-cors' });
  const json = await response.json();
  return json;
}
