// used apis
// https://opencagedata.com/demo
// https://www.flickr.com/services/developer/api/

export default class Model {
  constructor() {}

  getCoors(success) {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    if (!navigator.geolocation) alert('Geolocation is not supported by this browser!');
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  getMap(pos) {
    var crd = pos.coords;
    // this.coorsCache.set('current')
    fetch('https://api-maps.yandex.ru/2.1/?apikey=34a7ab76-b83a-4d53-be9a-00404d79128b&lang=ru_RU')
      .then(data => {
        ymaps.ready(init);
        function init() {
          var myMap = new ymaps.Map('map', { center: [crd.latitude, crd.longitude], zoom: 7 });
        }
      })
      .catch(err => alert("map didn't loaded"));
  }

  getWeatherData(pos) {
    var crd = pos.coords;
    const apiKey = 'eefc04453f3143682c3c88d3669c3546';
    let lang = localStorage.getItem('weatherAPILang');
    let unit = 'si';

    var url = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${apiKey}/${crd.latitude},${crd.longitude}?lang=${lang}&unit=${unit}`;

    fetch(url)
      .then(res => res.json())
      .then(data => {
        // console.log('какие-то данные с darksky ', data);
      });
  }

  async getInputCoors(settlement, lang) {
    console.log('getInputCoors works');
    console.log('settlement: ', settlement, '  lang: ', lang);
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${settlement}&key=08e88a2c40fb4a34966ad1a41752ff28&language=${lang}&pretty=1&no_annotations=1`;

    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);
    return json;
  }
}
