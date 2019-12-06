import { renderControlBtns } from '../scripts/MVC/renderControlBtns.js';
import { renderInput } from '../scripts/MVC/renderInput.js';
import { createPopup, createElement } from '../scripts/modules/functions.js';
import { forwardGeocoding, reverseGeocoding } from '../scripts/API/opencagedata.js';

require('@babel/register');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

describe('render DOM elements in View class', () => {
  const options = {
    contentType: 'text/html',
    includeNodeLocations: true,
    storageQuota: 10000000,
    runScripts: 'outside-only',
  };

  const dom = new JSDOM(
    `<!DOCTYPE html>
  <html lang="en">
  <body>
    <div class="page-wrap visually-hidden"></div>
  </body>
  </html>
  `,
    options
  ).window;

  let page = dom.window.document.querySelector('.page-wrap');

  it('has document', function() {
    expect(page.nodeName).toEqual('DIV');
  });

  it('createElement function', () => {
    const el = createElement('div', 'anyClassName', page);
    expect(el.nodeName).toEqual('DIV');
    expect(el.className).toEqual('anyClassName');
  });

  it('renderControlBtns creates btns in Block 1', () => {
    const elArr = renderControlBtns(page);

    expect(elArr[0].className).toEqual('controls');
    expect(elArr[1].classList.contains('controls__btn--lang')).toEqual(true);
    expect(elArr[2].classList.contains('controls__btn--refresh')).toEqual(true);
    expect(elArr[3].className).toEqual('controls__unit');
    expect(elArr[4].classList.contains('controls__btn--farengeit')).toEqual(true);
    expect(elArr[5].classList.contains('controls__btn--celsius')).toEqual(true);
  });

  it('renderInput creates input from in Block 1', () => {
    const elArr = renderInput(page);

    expect(elArr[0].className).toEqual('controls__search--form');
    expect(elArr[0].nodeName).toEqual('FORM');

    expect(elArr[1].className).toEqual('controls__search--input');
    expect(elArr[1].nodeName).toEqual('INPUT');

    expect(elArr[2].className).toEqual('controls__search--btn');
    expect(elArr[2].innerText).toEqual('Search');
  });
});

describe('API test', () => {
  it('reverseGeocoding', async () => {
    const el = createElement('div', 'popup', page);

    const data = await reverseGeocoding(51.5, 0);
    console.log(data);
  });
});
