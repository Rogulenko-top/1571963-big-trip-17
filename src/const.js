
const TYPES_LIBRARY = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const OFFERS_TITLE = ['Upgrade to a business class', 'Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train', 'Choose the radio station'];

const CITIES_LIBRARY = ['Tokyo','Wellington', 'Canberra', 'Toronto', 'Oslo'];

const BASE_PRICE = [20, 50, 160, 180, 600];

const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva'];

const NUM_OF_POINTS = 5;

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
  EVERYTHING: 'EVERYTHING',
  FUTURE: 'FUTURE',
  PAST: 'PAST',
};

const BLANK_POINT = {
  basePrice: '',
  dateFrom: null,
  dateTo: null,
  destination: 'Amsterdam',
  type: 'taxi',
  offers: [],
};

const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { MODE, SORT_TYPE, FILTER_TYPE, BLANK_POINT, TYPES_LIBRARY, OFFERS_TITLE, CITIES_LIBRARY, BASE_PRICE, DESTINATIONS, NUM_OF_POINTS, UserAction, UpdateType };
