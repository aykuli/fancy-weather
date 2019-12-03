import { celsiusToFarengeitAndReverse } from './math';

export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.init();
    this.watchInput();
    this.watchLang();
    this.watchReload();
    this.watchUnitChanging();
  }

  async init() {
    const [lat, lng] = [Number(localStorage.getItem('weatherLat')), Number(localStorage.getItem('weatherLng'))];

    try {
      if (lat && lng) {
        this.view.showCoordinates(lat, lng);
        this.getPlaceByCoors(lat, lng);
        this.view.cleanMap();
        this.model.mapbox(lat, lng);
        const weatherData = await this.model.getWeatherData(lat, lng);
        this.view.showWeatherData(weatherData);
      } else {
        this.showCurrentCoors();
      }
    } catch (err) {
      alert("cannot render page, some api didn't work");
    }
  }

  async showCurrentCoors() {
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
    var crd = pos.coords;

    this.view.latitudeValue.innerText = crd.latitude;
    this.view.longitudeValue.innerText = crd.longitude;

    localStorage.removeItem('weatherLat');
    localStorage.setItem('weatherLat', crd.latitude);
    localStorage.removeItem('weatherLng');
    localStorage.setItem('weatherLng', crd.longitude);

    // draw map of current geolocation
    this.view.showCoordinates(crd.latitude, crd.longitude);
    this.view.cleanMap();
    this.model.mapbox(crd.latitude, crd.longitude);

    const weatherData = await this.model.getWeatherData(crd.latitude, crd.longitude);
    this.view.showWeatherData(weatherData);

    // const data = await this.model.flickr('Almaty', 'winter', 'night');
    // console.log('flickr data =', data);

    // this.view.page.style.backgroundImage = `url(${data})`;
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

      this.getPlaceByCoors(lat, lng);
      this.view.showDate();
      this.view.showWeatherUnits(lang);
    });
  }

  watchReload() {
    this.view.controlsBtnReload.addEventListener('click', this.init.bind(this));
  }

  async inputSearchResult(e) {
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
    // console.log('\nпришли данные с darkSky');
    // console.log('днные с darkSky: ', weatherData);
    this.view.showWeatherData(weatherData);
    this.showAppBg(city, weatherData.daily.data[0].icon);
    // data = await this.model.unsplashForBG(city, 'winter', 'night');
    data = await this.model.unsplashForBG();
    // console.log('unsplash: ', data);

    this.view.page.style.backgroundImage = `url(${data})`;
  }

  async getPlaceByCoors(lat, lng) {
    let lang = localStorage.getItem('weatherLang');
    const data = await this.model.reverseGeocoding(lat, lng, lang);
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

    await this.view.showCity(city, country);
  }

  async showAppBg(city, icon) {
    let tm = new Date();
    const month = tm.getMonth();
    const season = () => {
      if (month < 2 || month === 11) {
        return 'winter';
      } else if (month > 1 || month < 5) {
        return 'spring';
      } else if (month > 4 || month < 8) {
        return 'summer';
      } else {
        return 'fall';
      }
    };

    const day = tm.getHours();
    const dayTime = () => {
      if (dayTime > 4 || dayTime < 11) {
        return 'morning';
      } else if (dayTime > 10 || dayTime < 19) {
        return 'day';
      } else if (dayTime > 18 || dayTime < 23) {
        return 'evening';
      } else {
        return 'night';
      }
    };

    const data = await this.model.unsplashForBG(city, season(), dayTime(), icon);
    this.view.page.style.backgroundImage = `url(${data})`;
  }

  watchUnitChanging() {
    this.view.units.addEventListener('click', e => {
      console.log('кликаем на смену фарегейта');
      const active = document.querySelector('.controls__btn--unit-active');
      localStorage.removeItem('weatherUnit');

      if (e.target !== active) {
        active.classList.remove('controls__btn--unit-active');
        switch (e.target) {
          case this.view.farengheit:
            this.view.farengheit.classList.add('controls__btn--unit-active');

            const celsius = Number(this.view.temperature.innerText);
            const celsiusTomorrow = Number(this.view.tomorrowTemperature.innerText);
            const celsiusAfter2Days = Number(this.view.after2DaysTemperature.innerText);
            const celsiusAfter3Days = Number(this.view.after3DaysTemperature.innerText);

            this.view.temperature.innerText = celsiusToFarengeitAndReverse(celsius);
            this.view.tomorrowTemperature.innerText = celsiusToFarengeitAndReverse(celsiusTomorrow);
            this.view.after2DaysTemperature.innerText = celsiusToFarengeitAndReverse(celsiusAfter2Days);
            this.view.after3DaysTemperature.innerText = celsiusToFarengeitAndReverse(celsiusAfter3Days);

            localStorage.setItem('weatherUnit', 'us');
            break;
          case this.view.celsius:
            this.view.celsius.classList.add('controls__btn--unit-active');

            const farengheit = Number(this.view.temperature.innerText);
            const farengheitTomorrow = Number(this.view.tomorrowTemperature.innerText);
            const farengheitAfter2Days = Number(this.view.after2DaysTemperature.innerText);
            const farengheitAfter3Days = Number(this.view.after3DaysTemperature.innerText);

            this.view.temperature.innerText = celsiusToFarengeitAndReverse(farengheit, false);
            this.view.tomorrowTemperature.innerText = celsiusToFarengeitAndReverse(farengheitTomorrow, false);
            this.view.after2DaysTemperature.innerText = celsiusToFarengeitAndReverse(farengheitAfter2Days, false);
            this.view.after3DaysTemperature.innerText = celsiusToFarengeitAndReverse(farengheitAfter3Days, false);

            localStorage.setItem('weatherUnit', 'si');
            break;
          default:
            alert('Something wrong with units. Reload page');
        }
      }
    });
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
