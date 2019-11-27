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

  getInputCoors() {
    console.log('getInputCoors works');
    console.log('settlement in yandex API = ', settlement);

    fetch('https://api-maps.yandex.ru/2.1/?apikey=34a7ab76-b83a-4d53-be9a-00404d79128b&lang=ru_RU').then(data => {
      ymaps.ready(init);

      function init() {
        var myMap = new ymaps.Map('map', {
          center: [55.753994, 37.622093],
          zoom: 9,
        });
        console.log('yandex init function');
        // Поиск координат центра Нижнего Новгорода.
        ymaps
          .geocode(settlement, {
            /**
             * Опции запроса
             * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/geocode.xml
             */
            // Сортировка результатов от центра окна карты.
            // boundedBy: myMap.getBounds(),
            // strictBounds: true,
            // Вместе с опцией boundedBy будет искать строго внутри области, указанной в boundedBy.
            // Если нужен только один результат, экономим трафик пользователей.
            results: 1,
          })
          .then(function(res) {
            console.log('геокодирование. получение данных');
            // Выбираем первый результат геокодирования.
            var firstGeoObject = res.geoObjects.get(0),
              // Координаты геообъекта.
              coords = firstGeoObject.geometry.getCoordinates(),
              // Область видимости геообъекта.
              bounds = firstGeoObject.properties.get('boundedBy');

            firstGeoObject.options.set('preset', 'islands#darkBlueDotIconWithCaption');
            // Получаем строку с адресом и выводим в иконке геообъекта.
            firstGeoObject.properties.set('iconCaption', firstGeoObject.getAddressLine());

            // Добавляем первый найденный геообъект на карту.
            myMap.geoObjects.add(firstGeoObject);
            // Масштабируем карту на область видимости геообъекта.
            myMap.setBounds(bounds, {
              // Проверяем наличие тайлов на данном масштабе.
              checkZoomRange: true,
            });
            console.log('Название объекта: %s', firstGeoObject.properties.get('name'));
            console.log('Описание объекта: %s', firstGeoObject.properties.get('description'));
            console.log('Полное описание объекта: %s', firstGeoObject.properties.get('text'));
            /**
             * Прямые методы для работы с результатами геокодирования.
             * @see https://tech.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeocodeResult-docpage/#getAddressLine
             */
            console.log('\nГосударство: %s', firstGeoObject.getCountry());
            localStorage.removeItem('weatherCountry');
            localStorage.setItem('weatherCountry', firstGeoObject.getCountry());
            console.log('Населенный пункт: %s', firstGeoObject.getLocalities().join(', '));
            localStorage.removeItem('weatherPlace');
            localStorage.setItem('weatherPlace', firstGeoObject.getLocalities().join(', '));
          });
      }
    });
  }
}
