// used apis
// https://www.gismeteo.ru/api/
// https://opencagedata.com/demo
// https://www.flickr.com/services/developer/api/

export default class Model {
  constructor() {}

  getCoors(success) {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  // getMap() {
  //   ymaps.ready(init);
  //   function init() {
  //     var myMap = new ymaps.Map('map', {
  //       center: [55.76, 37.64],
  //       zoom: 7,
  //     });
  //   }
  // }

  getMap() {
    fetch('https://api-maps.yandex.ru/2.1/?apikey=34a7ab76-b83a-4d53-be9a-00404d79128b&lang=ru_RU')
      // .then(res => res.json())
      .then(data => {
        console.log(data);
        ymaps.ready(init);
        function init() {
          var myMap = new ymaps.Map('map', { center: [55.76, 37.64], zoom: 7 });
        }
      });
    // .catch(err => alert("map didn't loaded"));
  }
}
