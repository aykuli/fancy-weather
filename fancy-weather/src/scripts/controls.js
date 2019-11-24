export default function generatingControlElements(container) {
  console.log('generatingControlElements works');
  const controls = document.createElement('div');
  controls.className = 'controls';
  container.append(controls);

  const controlsBtns = document.createElement('div');
  controlsBtns.className = 'controls__btns';
  controls.append(controlsBtns);

  const controlsBtnRefresh = document.createElement('button');
  controlsBtnRefresh.className = 'controls__btn';
  controlsBtnRefresh.classList.add('controls__btn--refresh');
  controlsBtns.append(controlsBtnRefresh);

  const controlsBtnLang = document.createElement('select');
  controlsBtnLang.className = 'controls__btn';
  controlsBtnLang.classList.add('controls__btn--lang');
  controlsBtns.append(controlsBtnLang);

  const lang = ['EN', 'RU', 'BE'];
  for (let i = 0; i < 3; i += 1) {
    const option = new Option(lang[i], lang[1], false, false);
    controlsBtnLang.append(option);
  }

  const controlsBtnFarengeit = document.createElement('button');
  controlsBtnFarengeit.className = 'controls__btn';
  controlsBtnFarengeit.classList.add('controls__btn--farengeit');
  controlsBtns.append(controlsBtnFarengeit);

  const controlsBtnCelsius = document.createElement('button');
  controlsBtnCelsius.className = 'controls__btn';
  controlsBtnCelsius.classList.add('controls__btn--celsius');
  controlsBtns.append(controlsBtnCelsius);
}
