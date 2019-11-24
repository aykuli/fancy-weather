export default class View {
  constructor() {
    this.app = document.querySelector('.page-wrap');

    console.log('generatingControlElements works');

    // Block 1: control elements and input form
    this.controls = this.createElement('div', 'controls', this.app);

    this.controlsBtns = this.createElement('div', 'controls__btns', this.controls);

    this.controlsBtnRefresh = this.createElement('button', 'controls__btn', this.controlsBtns);
    this.controlsBtnRefresh.classList.add('controls__btn--refresh');
    this.controlsBtnLang = this.createElement('select', 'controls__btn', this.controlsBtns);
    this.controlsBtnLang.classList.add('controls__btn--lang');

    const lang = ['EN', 'RU', 'BE'];
    for (let i = 0; i < 3; i += 1) {
      const option = new Option(lang[i], lang[1], false, false);
      this.controlsBtnLang.append(option);
    }

    this.controlsBtnFarengeit = this.createElement('button', 'controls__btn', this.controlsBtns);
    this.controlsBtnFarengeit.classList.add('controls__btn--farengeit');
    this.controlsBtnFarengeit.innerText = '°F';
    this.controlsBtnCelsius = this.createElement('button', 'controls__btn', this.controlsBtns);
    this.controlsBtnCelsius.classList.add('controls__btn--celsius');
    this.controlsBtnFarengeit.classList.add('controls__btn--active');
    this.controlsBtnCelsius.innerText = '°С';

    this.citySearchForm = this.createElement('form', 'controls__search-form', this.controls);
    this.cityInput = this.createElement('input', 'controls__search-input', this.citySearchForm);
    this.cityInput.setAttribute('placeholder', 'Search city or ZIP');
    this.cityInput.setAttribute('type', 'text');
    this.cityInput.setAttribute('id', 'city-input');
    this.cityInputLabel = this.createElement('label', 'visually-hidden', this.citySearchForm);
    this.cityInputLabel.setAttribute('for', 'city-input');
    this.cityInputLabel.innerText = 'Enter city name or Zip to search';

    this.cityBtn = this.createElement('button', 'controls__search-btn', this.citySearchForm);
    this.cityBtn.innerText = 'Search';

    // Block 2: Showing current weather
    this.weather = this.createElement('div', 'weather', this.app);

    this.place = this.createElement('p', 'weather__place', this.weather);
    this.city = this.createElement('span', 'weather__city', this.place);
    this.city.innerText = 'Novosibirsk, ';
    this.country = this.createElement('span', 'weather__country', this.place);
    this.country.innerText = 'Russia';

    this.time = this.createElement('p', 'weather__date', this.weather);
    this.dateDDMM = this.createElement('span', 'weather__date--ddmm', this.time);
    this.dateDDMM.innerText = 'Mon 28 October ';
    this.dateHHMM = this.createElement('span', 'weather__date--hhmm', this.time);
    this.dateHHMM.innerText = '17:23';

    this.temperatureWrap = this.createElement('p', 'weather__temperature--wrap', this.weather);
    this.temperature = this.createElement('span', 'weather__temperature', this.temperatureWrap);
    this.temperature.innerText = '10';
    this.temperatureSign = this.createElement('span', 'weather__temperature--sign', this.temperatureWrap);
    this.temperatureSign.innerText = '°';
    this.weatherIconBig = this.createElement('img', 'weather__icon--big', this.temperatureWrap);
    this.weatherIconBig.setAttribute('url', './images/icon-cloud.svg');
  }

  // Create an element with an optional CSS class
  createElement(tag, className, whereAppend) {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    whereAppend.append(element);
    return element;
  }

  // Retrieve an element from the DOM
  getElement(selector) {
    const element = document.querySelector(selector);
    return element;
  }
}
