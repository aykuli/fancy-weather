import { openCageDataKey } from '../API/apiKeys.js';
import { createPopup } from '../modules/functions.js';

async function forwardGeocoding(settlement, lang = 'en') {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${settlement}&key=${openCageDataKey}&language=${lang}&pretty=1&no_annotations=1`;

  try {
    const response = await fetch(url, { 'Content-Type': 'application/json' });
    const json = await response.json();
    return json;
  } catch (err) {
    createPopup("Geo data hasn't been loaded. Check your connection");
  }
}

async function reverseGeocoding(lat, lng, lang = 'en') {
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=${openCageDataKey}&language=${lang}&pretty=1`;

  try {
    const response = await fetch(url);
    const json = await response.json();
    return json;
  } catch (err) {
    createPopup("This place hasn't been founded. Check your connection or maybe this place doesn't exist");
  }
}

export { forwardGeocoding, reverseGeocoding };
