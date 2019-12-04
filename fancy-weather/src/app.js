import './sass/style.scss';
import View from './scripts/MVC/View.js';
import Model from './scripts/MVC/Model.js';
import Controller from './scripts/MVC/Controller.js';

const app = new Controller(new Model(), new View());
