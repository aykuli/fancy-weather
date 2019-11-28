export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.showCurrentCoors();
    this.watchInput();
    this.watchLang();
    this.watchReload();

    console.log('             YANDEX');
    this.model.yandexMap();
  }

  async showCurrentCoors() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(this.success.bind(this), error, options);

    if (!navigator.geolocation) alert('Geolocation is not supported by this browser!');
  }

  success(pos) {
    console.log('5');
    var crd = pos.coords;
    console.log(crd);
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    this.view.latitudeValue.innerText = crd.latitude;
    this.view.longitudeValue.innerText = crd.longitude;

    localStorage.removeItem('weatherLat');
    localStorage.setItem('weatherLat', crd.latitude);
    localStorage.removeItem('weatherLng');
    localStorage.setItem('weatherLng', crd.longitude);

    // draw map of current geolocation
    const coors = { lat: crd.latitude, lng: crd.longitude };

    this.view.showCoordinates(coors);
    // this.view.showMap(coors);

    // return { lat: crd.latitude, lng: crd.longitude };
  }

  watchInput() {
    this.view.cityBtn.addEventListener('click', this.inputSearchResult.bind(this));
    // window.addEventListener('keydown', this.InputSearchResult.bind(this));
    return this.view.cityInput.value;
  }

  watchLang() {
    this.view.controlsLang.addEventListener('change', () => {
      console.log('\n language change');
      localStorage.removeItem('weatherLang');
      localStorage.setItem('weatherLang', this.view.controlsLang.value);
      this.getCurrentPlaceResult({ lat: localStorage.getItem('weatherLat'), lng: localStorage.getItem('weatherLng') });
      this.view.showDate();
    });
    return localStorage.getItem('weatherLang');
  }

  watchReload() {
    this.view.controlsBtnReload.addEventListener('click', () => {
      console.log('reload button');
      this.showCurrentCoors.bind(this);
    });
  }

  async inputSearchResult(e) {
    e.preventDefault();
    const settlement = this.view.cityInput.value;
    let lang = localStorage.getItem('weatherLang');
    const data = await this.model.forwardGeocoding(settlement, lang);

    let city;
    console.log('data =', data);

    if (data.results[0].components.city) {
      city = `${data.results[0].components.city}, `;
    } else if (data.results[0].components.village) {
      city = `${data.results[0].components.village}, `;
    } else if (data.results[0].components.state) {
      city = `${data.results[0].components.state}, `;
    }
    if (city === undefined) city = '';
    const country = data.results[0].components.country;
    const coors = data.results[0].geometry;

    localStorage.removeItem('weatherLat');
    localStorage.setItem('weatherLat', coors.lat);
    localStorage.removeItem('weatherLng');
    localStorage.setItem('weatherLng', coors.lng);

    console.log('city =', city);
    console.log('country =', country);

    await this.view.showCity(city, country);
    await this.view.showCoordinates(coors);
    await this.view.showMap(coors);
  }

  async getCurrentPlaceResult(coors) {
    let lang = localStorage.getItem('weatherLang');
    const data = await this.model.reverseGeocoding(coors, lang);
    console.log('data form reverseGeocoding =', data);
    let city;

    if (data.results[0].components.city) {
      city = `${data.results[0].components.city}, `;
    } else if (data.results[0].components.village) {
      city = `${data.results[0].components.village}, `;
    } else if (data.results[0].components.state) {
      city = `${data.results[0].components.state}, `;
    }
    if (city === undefined) city = '';
    const country = data.results[0].components.country;

    console.log('city =', city);
    console.log('country =', country);

    await this.view.showCity(city, country);
    // await this.view.showMap(coors);
  }
}
