import View from './View.js';
import Model from './Model.js';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.showCoors();

    // shows map
    this.map();

    // this.model.getCoors(this.model.getWeatherData);
    console.log('Controller ---------- this.view.watchInput() = ', localStorage.getItem('weatherPlace'));
    // this.model.getInputCoors(localStorage.getItem('weatherPlace'));

    this.view.watchInput(this.model.getInputCoors(localStorage.getItem('weatherPlace')));
    this.view.showSettlementAndCountry();

    this.view.watchLang();
  }

  showCoors() {
    this.model.getCoors(this.view.coorsView);
  }

  map() {
    this.view.mapView();
    this.model.getCoors(this.model.getMap);
  }
}

const app = new Controller(new Model(), new View());
