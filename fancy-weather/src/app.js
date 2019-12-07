import './sass/style.scss';
import View from './scripts/MVC/View/View.js';
import Model from './scripts/MVC/Model/Model.js';
import Controller from './scripts/MVC/Controller/Controller.js';

const app = new Controller(new Model(), new View());
