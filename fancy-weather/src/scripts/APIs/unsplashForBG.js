import { unsplasKey } from './apiKeys.js';
import { randomInt } from '../functions/functions.js';

export default async function unsplashForBG(...args) {
  const max = document.documentElement.clientWidth;
  const orientation = max > 600 ? 'landscape' : 'portrait';
  let query = '';

  if (args.length === 0) {
    query = localStorage.getItem('weatherBgQuery');
  } else {
    for (const arg of args) {
      query += `${arg}-`;
    }
    localStorage.removeItem('weatherBgQuery');
    localStorage.setItem('weatherBgQuery', query);
  }

  const url = `https://api.unsplash.com/search/photos?page=1&per_page=100&orientation=${orientation}&query=${query}&client_id=${unsplasKey}`;

  try {
    const response = await fetch(url);
    const json = await response.json();

    const imgUrl = () => {
      const num = randomInt(0, json.results.length);
      return max < 600 ? json.results[num].urls.small : json.results[num].urls.regular;
    };

    localStorage.removeItem('weatherBgImg');
    localStorage.setItem('weatherBgImg', imgUrl());
    return imgUrl();
  } catch (err) {
    return localStorage.getItem('weatherBgImg');
  }
}
