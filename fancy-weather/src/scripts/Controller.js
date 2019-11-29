export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.showCurrentCoors();
    this.watchInput();
    this.watchLang();
    this.watchReload();
    this.watchUnitChanging();
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

  async success(pos) {
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
    this.view.showMap(coors);
    this.model.mapbox(crd.latitude, crd.longitude);

    const unit = localStorage.getItem('weatherUnit');
    const weatherData = await this.model.getWeatherData(crd.latitude, crd.longitude, unit);
    console.log('днные с darkSky: ', weatherData);
    this.view.showWeatherData(weatherData);
  }

  watchInput() {
    this.view.cityBtn.addEventListener('click', this.inputSearchResult.bind(this));
  }

  watchLang() {
    this.view.controlsLang.addEventListener('change', () => {
      console.log('\n language change');
      localStorage.removeItem('weatherLang');
      localStorage.setItem('weatherLang', this.view.controlsLang.value);

      const lat = localStorage.getItem('weatherLat');
      const lng = localStorage.getItem('weatherLng');

      this.getCurrentPlaceResult(lat, lng);
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
    await this.model.mapbox(coors.lat, coors.lng);

    const unit = localStorage.getItem('weatherUnit');
    const weatherData = await this.model.getWeatherData(coors.lat, coors.lng, unit);
    console.log('\nпришли данные с darkSky');
    console.log('днные с darkSky: ', weatherData);
    this.view.showWeatherData(weatherData);
  }

  async getCurrentPlaceResult(lat, lng) {
    let lang = localStorage.getItem('weatherLang');
    const data = await this.model.reverseGeocoding(lat, lng, lang);
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
  }

  watchUnitChanging() {
    this.view.units.addEventListener('click', e => {
      if (e.target === this.view.farengheit) {
        if (this.view.temperatureSign.innerText === '°') {
          localStorage.removeItem('weatherUnit');
          localStorage.setItem('weatherUnit', 'us');

          const celsius = Number(this.view.temperature.innerText);
          this.view.temperature.innerText = ((9 / 5) * celsius + 32).toFixed(0);
          this.view.temperatureSign.innerText = '°F';

          const active = document.querySelector('.controls__btn--unit-active');
          active.classList.remove('controls__btn--unit-active');
          this.view.farengheit.classList.add('controls__btn--unit-active');
        } else return;
      } else {
        if (this.view.temperatureSign.innerText === '°F') {
          localStorage.removeItem('weatherUnit');
          localStorage.setItem('weatherUnit', 'si');

          const farengheit = Number(this.view.temperature.innerText);
          this.view.temperature.innerText = ((5 / 9) * (farengheit - 32)).toFixed(0);
          this.view.temperatureSign.innerText = '°';

          const active = document.querySelector('.controls__btn--unit-active');
          active.classList.remove('controls__btn--unit-active');
          this.view.celsius.classList.add('controls__btn--unit-active');
        } else return;
      }
    });
  }
}
