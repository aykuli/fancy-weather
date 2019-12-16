export default function showMap(elem) {
  const width = document.body.clientWidth;

  if (width >= 1000) {
    elem.setAttribute('style', 'width: 320px; height: 320px');
  }

  if (width < 1000 && width >= 650) {
    elem.setAttribute('style', `width: ${width - 80}px; height: ${width / 2}px`);
  }

  if (width < 650 && width > 400) {
    elem.setAttribute('style', `width: ${width - 80}px; height: ${width}px`);
  }
  if (width <= 400) {
    elem.setAttribute('style', `width: ${width - 20}px; height: ${width}px`);
  }
}
