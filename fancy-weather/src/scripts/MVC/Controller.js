import { celsiusToFarengeitAndReverse, timeThere } from '../modules/math';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.continent = 'Asia';

    this.init();

    this.watchInput();
    this.watchLang();
    // this.watchReload();
    this.view.watchUnitChanging();
  }

  init() {
    document.addEventListener('DOMContentLoaded', this.getCurrentCoors.bind(this));
  }

  getCurrentCoors() {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function error(err) {
      alert(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(this.success.bind(this), error, options);

    if (!navigator.geolocation) alert('Geolocation is not supported by this browser!');
  }

  async success(pos) {
    const [lat, lng] = [pos.coords.latitude, pos.coords.longitude];

    localStorage.removeItem('weatherCurrentLng');
    localStorage.setItem('weatherCurrentLng', lng);

    // draw map of current geolocation
    this.view.showCoordinates(lat, lng);
    this.model.mapbox(lat, lng);

    let lang = localStorage.getItem('weatherLang');
    let data = await this.getPlaceByCoors(lat, lng, lang);
    let [city, country] = data;
    this.view.showCity(city, country);
    const weatherData = await this.model.getWeatherData(lat, lng);
    console.log('weatherData=', weatherData);
    this.view.showWeatherData(weatherData);

    this.view.dateHH.innerText = timeThere(weatherData.timezone);

    this.showAppBg(lat, lng, weatherData, city, country);
  }

  watchInput() {
    this.view.cityBtn.addEventListener('click', this.inputSearchResult.bind(this));
  }

  watchLang() {
    this.view.controlsLang.addEventListener('change', () => {
      const lang = this.view.controlsLang.value;
      localStorage.removeItem('weatherLang');
      localStorage.setItem('weatherLang', lang);

      const lat = localStorage.getItem('weatherLat');
      const lng = localStorage.getItem('weatherLng');

      const [city, country] = this.getPlaceByCoors(lat, lng, lang);

      this.view.showCity(city, country);
      this.view.showDate();
      this.view.showWeatherUnits(lang);
    });
  }

  watchReload() {
    this.view.controlsBtnReload.addEventListener('click', this.init.bind(this));
  }

  async inputSearchResult(e) {
    console.log('\ninputSearchResult');
    e.preventDefault();
    const settlement = this.view.cityInput.value;
    let lang = localStorage.getItem('weatherLang');
    let data = await this.model.forwardGeocoding(settlement, lang);
    console.log(data);
    let city;

    if (data.results[0].components.city) {
      city = data.results[0].components.city;
    } else if (data.results[0].components.village) {
      city = data.results[0].components.village;
    } else if (data.results[0].components.state) {
      city = data.results[0].components.state;
    }
    if (city === undefined) city = '';
    const country = data.results[0].components.country;
    const coors = data.results[0].geometry;

    localStorage.removeItem('weatherLat');
    localStorage.setItem('weatherLat', coors.lat);
    localStorage.removeItem('weatherLng');
    localStorage.setItem('weatherLng', coors.lng);

    await this.view.showCity(city, country);
    await this.view.showCoordinates(coors.lat, coors.lng);
    await this.view.cleanMap();
    await this.model.mapbox(coors.lat, coors.lng);

    const unit = localStorage.getItem('weatherUnit');
    const weatherData = await this.model.getWeatherData(coors.lat, coors.lng, unit);
    console.log('\nweatherData of input', weatherData.timezone);
    this.view.showWeatherData(weatherData);

    this.view.dateHH.innerText = timeThere(weatherData.timezone);

    this.showAppBg(coors.lat, coors.lng, weatherData, city, country);
  }

  async getPlaceByCoors(lat, lng, lang = 'en') {
    const data = await this.model.reverseGeocoding(lat, lng, lang);
    console.log(data);
    let city;

    if (data.results[0].components.city) {
      city = data.results[0].components.city;
    } else if (data.results[0].components.village) {
      city = data.results[0].components.village;
    } else if (data.results[0].components.state) {
      city = data.results[0].components.state;
    }
    if (city === undefined) city = '';
    const country = data.results[0].components.country;
    this.continent = data.results[0].components.continent;

    return [city, country];
  }

  async showAppBg(lat, lng, weatherData, city, country) {
    let data = await this.getPlaceByCoors(lat, lng, 'en');
    [city, country] = data;

    let tm = new Date();
    const month = tm.getMonth();
    let season = () => {
      if (month < 2 || month === 11) {
        return 'winter';
      } else if (month > 1 || month < 5) {
        return 'spring';
      } else if (month > 4 || month < 8) {
        return '';
      } else {
        return 'fall';
      }
    };

    if (this.continent === 'Africa' || this.continent === 'Oceania' || this.continent === 'South America') {
      season = () => {
        return 'summer';
      };
    }

    const time = this.view.dateHH.textContent;
    const dayTime = () => {
      if (time > 6 && time < 20) {
        return 'day';
      } else {
        return 'night';
      }
    };

    const icon = weatherData.currently.icon;

    // data = await this.model.unsplashForBG(country, city, season(), dayTime(), icon);
    // this.view.page.style.backgroundImage = `url(${data})`;
  }

  // async getBackground() {
  //   console.log('getBackground works');
  //   const data = await this.model.unsplashForBg();
  //   console.log('data =', data);

  //   // this.view.page.style.backgroundImage = `url(${data})`;
  //   // this.view.page.style.backgroundBlendMode = 'multiply';
  //   // this.view.page.style.backgroundColor = 'rgb(41, 55, 71, .7)';
  // }
}
