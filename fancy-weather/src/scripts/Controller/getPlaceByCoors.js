import { reverseGeocoding } from '../APIs/opencagedata.js';
import { createPopup, getCity } from '../functions/functions.js';

export default async function getPlaceByCoors(lat, lng, lang = 'en') {
  const data = await reverseGeocoding(lat, lng, lang);

  if (data === undefined) {
    createPopup(5);
    return;
  }

  if (data.total_results === 0) {
    createPopup(5);
    return;
  }

  let city = getCity(data);
  if (city === undefined) city = '';

  const [country, continent] = [data.results[0].components.country, data.results[0].components.continent];
  return [city, country, continent]; // eslint-disable-line
}
