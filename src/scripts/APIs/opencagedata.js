import { openCageDataKey } from './apiKeys.js';

async function forwardGeocoding(settlement, lang = 'en') {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${settlement}&key=${openCageDataKey}&language=${lang}&pretty=1&no_annotations=1`;

  const response = await fetch(url, { 'Content-Type': 'application/json' });
  return response.json();
}

async function reverseGeocoding(lat, lng, lang = 'en') {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=${openCageDataKey}&language=${lang}&pretty=1`;
  const response = await fetch(url);
  return response.json();
}

export { forwardGeocoding, reverseGeocoding };
