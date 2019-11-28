import { darkSkyKey, openCageDataKey } from './apiKeys.js';

export default class Model {
  constructor() {}

  getWeatherData(pos) {
    var crd = pos.coords;
    const apiKey = darkSkyKey;
    let lang = localStorage.getItem('weatherAPILang');
    let unit = 'si';

    var url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${crd.latitude},${crd.longitude}?lang=${lang}&unit=${unit}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log('какие-то данные с darksky ', data);
      });
  }

  async forwardGeocoding(settlement, lang) {
    console.log('forwardGeocoding works');
    console.log('settlement: ', settlement, '  lang: ', lang);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${settlement}&key=${openCageDataKey}&language=${lang}&pretty=1&no_annotations=1`;

    const response = await fetch(url);
    const json = await response.json();
    return json;
  }

  async reverseGeocoding() {
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}%2C${lng}&key=${openCageDataKey}`;
  }
}
