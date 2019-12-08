import { reverseGeocoding } from '../Model/opencagedata.js';
import { createPopup, getCity } from '../../functions/functions.js';

export default async function getPlaceByCoors(lat, lng, lang = 'en') {
  const data = await reverseGeocoding(lat, lng, lang);
  if (data === undefined || data.total_results === 0) {
    createPopup('Enter valid name of city/settlement');
    return;
  }

  let city = getCity(data);
  if (city === undefined) city = '';

  const [country, continent] = [data.results[0].components.country, data.results[0].components.continent];
  return [city, country, continent]; // eslint-disable-line
}
