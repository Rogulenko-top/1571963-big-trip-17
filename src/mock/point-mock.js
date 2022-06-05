import { TYPES_LIBRARY, BASE_PRICE, DESTINATIONS } from '../const.js';
import {getRandomInteger, getRandomArrayElement} from '../utils/point.js';
import { nanoid } from 'nanoid';


const generateBasePrice = () => getRandomArrayElement(BASE_PRICE);

const generateDestination = () => getRandomArrayElement(DESTINATIONS);

const generateType = () => getRandomArrayElement(TYPES_LIBRARY);

export const generatePoint = () => {
  const typePoint = generateType();
  return {
    basePrice: generateBasePrice(),
    dateFrom: `2022-05-${getRandomInteger(30, 31)}T0${getRandomInteger(1, 2)}:00:00.401Z`,
    dateTo: `2022-05-${getRandomInteger(31, 31)}T${getRandomInteger(10, 23)}:${getRandomInteger(11, 59)}:00.401Z`,
    destination: generateDestination(),
    id: nanoid(),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    type: typePoint,
    offers: [1]
  };
};
