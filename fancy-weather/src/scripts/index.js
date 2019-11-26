import View from './View.js';
import Model from './Model.js';

class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    this.showCoors();
    this.map();
  }

  showCoors() {
    this.model.getCoors(this.view.coorsView);
  }

  map() {
    this.view.mapView();
    this.model.getMap();
  }
}

const app = new Controller(new Model(), new View());
