import View from './View.js';
import Model from './Model.js';
import { O_DSYNC } from 'constants';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.showCoors();
    this.map();
    this.watchInput();
    this.view.watchLang();
  }

  showCoors() {
    this.model.getCoors(this.view.coorsView);
  }

  map() {
    this.view.mapView();
    this.model.getCoors(this.model.getMap);
  }

  watchInput() {
    console.log('1 watchInput');
    this.view.cityBtn.addEventListener('click', this.searchResult.bind(this));
    // window.addEventListener('keydown', this.searchResult.bind(this));
    return this.view.cityInput.value;
  }

  async searchResult() {
    const settlement = this.view.cityInput.value;
    let lang = localStorage.getItem('weatherLang');
    const data = await this.model.getInputCoors(settlement, lang);
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

    console.log('city =', city);
    console.log('country =', country);

    await this.view.showCity(city, country);
    await this.view.showCoordinates(coors);
  }
}

const app = new Controller(new Model(), new View());
