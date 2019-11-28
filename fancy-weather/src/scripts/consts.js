const lang = ['en', 'ru', 'be'];

const controlsLocale = {
  en: ['Search', 'Search city or ZIP', 'Latitude: ', 'Longintude: '],
  ru: ['Найти', 'Найти по названию или индексу', 'Широта: ', 'Долгота: '],
  be: ['Знайсці', 'Пошук горад ці паштовы індэкс', 'Шырата: ', 'Даўгата: '],
};

const weekDayArr = {
  en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
  be: ['Няд', 'Пнд', 'Аўт', 'Сер', 'Чцв', 'Пят', 'Суб'],
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

export { weekDayArr, monthArr, lang, controlsLocale };
