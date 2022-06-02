
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

const UserAction = {
  UPDATE_TASK: 'UPDATE_TASK',
  ADD_TASK: 'ADD_TASK',
  DELETE_TASK: 'DELETE_TASK',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};

export { MODE, SORT_TYPE, FILTER_TYPE, BLANK_POINT, TYPES_LIBRARY, OFFERS_TITLE, CITIES_LIBRARY, BASE_PRICE, DESTINATIONS, NUM_OF_POINTS, UserAction, UpdateType };
