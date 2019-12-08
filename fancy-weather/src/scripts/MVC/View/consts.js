const lang = ['en', 'ru', 'be'];
const controlsLocale = {
  en: ['Search', 'Search city or ZIP', 'Latitude: ', 'Longintude: ', 'Feels like: ', 'Wind: ', ' m/s', 'Humidity: '],
  ru: [
    'Найти',
    'Найти по названию/индексу',
    'Широта: ',
    'Долгота: ',
    'Ощущается как ',
    'Ветер: ',
    ' м/с',
    'Влажность: ',
  ],
  be: [
    'Знайсці',
    'Пошук горад/паштовы індэкс',
    'Шырата: ',
    'Даўгата: ',
    'Адчуваецца як ',
    'Вецер: ',
    ' м/с',
    'Вільготнасць: ',
  ],
};

const weekDayArr = {
  en: [
    'Sun',
    'Mon',
    'Tue',
    'Wed',
    'Thu',
    'Fri',
    'Sat',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thusday',
    'Friday',
    'Saturday',
  ],
  ru: [
    'Вс',
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ],
  be: [
    'Няд',
    'Пнд',
    'Аўт',
    'Сер',
    'Чцв',
    'Пят',
    'Суб',
    'Нядзеля',
    'Панядзелак',
    'Аўторак',
    'Серада',
    'Чацьвер',
    'Пятніца',
    'Субота',
  ],
};

const monthArr = {
  en: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  ru: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ],
  be: [
    'Студзень',
    'Люты',
    'Сакавiк',
    'Красавiк',
    'Май',
    'Червень',
    'Лiпень',
    'Жнiвень',
    'Верасень',
    'Кастрычнiк',
    'Лiстапад',
    'Снежань',
  ],
};

const weatherIcons = new Map([
  ['clear-day', 'clear-day'],
  ['clear-night', 'clear-night'],
  ['rain', 'rain'],
  ['snow', 'snow'],
  ['sleet', 'sleet'],
  ['wind', 'wind'],
  ['fog', 'fog'],
  ['cloudy', 'cloudy'],
  ['partly-cloudy-day', 'partly-cloudy-day'],
  ['partly-cloudy-night', 'partly-cloudy-night'],
]);

export { weekDayArr, monthArr, lang, controlsLocale, weatherIcons };