import { getRandomInteger } from '../utils/point.js';


const typesOffer = [
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: getRandomInteger(0, 100)
      }, {
        id: 2,
        title: 'Choose the radio station',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'bus',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Add breakfast',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Add luggage',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Switch to comfort',
        price: getRandomInteger(0, 100)
      },
      {
        id: 2,
        title: 'Add luggage',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Book tickets',
        price: getRandomInteger(0, 100)
      }
    ]
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Wi-Fi',
        price: getRandomInteger(0, 100)
      }
    ]
  },
];

export {typesOffer};

