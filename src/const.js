const TYPES_LIBRARY = ['taxi', 'bus', 'train', 'ship', 'drive', 'flight', 'check-in', 'sightseeing', 'restaurant'];

const AUTHORIZATION = 'Basic AS277S44w9l1sl2j';
const END_POINT = 'https://17.ecmascript.pages.academy/big-trip/';

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
  destination: {
    description: ' ',
    name: 'Oslo',
    pictures: [],
  },
  isFavorite: false,
  offers: [],
  type: 'taxi',
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
  INIT: 'INIT',
};

export { MODE, SORT_TYPE, FILTER_TYPE, BLANK_POINT, TYPES_LIBRARY, UserAction, UpdateType, AUTHORIZATION, END_POINT };
