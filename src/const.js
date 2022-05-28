
const MODE = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

const SORT_TYPE = {
  DEFAULT: 'DEFAULT',
  PRICE: 'PRICE',
  TIME: 'TIME',
};

const FILTER_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

const BLANK_POINT = {
  type: 'taxi',
  destination: 'Amsterdam',
  dateFrom: null,
  dateTo: null,
  basePrice: null,
};

export { MODE, SORT_TYPE, FILTER_TYPE, BLANK_POINT };
