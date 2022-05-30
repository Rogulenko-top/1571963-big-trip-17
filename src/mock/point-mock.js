import { TYPES_LIBRARY, BASE_PRICE, DESTINATIONS } from '../const.js';
import {getRandomInteger, getRandomArrayElement} from '../utils/point.js';
import { nanoid } from 'nanoid';


const generateBasePrice = () => getRandomArrayElement(BASE_PRICE);

const generateDestination = () => getRandomArrayElement(DESTINATIONS);

const generateType = () => getRandomArrayElement(TYPES_LIBRARY);

export const generatePoint = () => {
  const typePoint = generateType();
  return {
    id: nanoid(),
    basePrice: generateBasePrice(),
    dateFrom: `2022-05-${getRandomInteger(15, 20)}T0${getRandomInteger(1, 3)}:16:54.401Z`,
    dateTo: `2022-05-${getRandomInteger(20, 25)}T0${getRandomInteger(3, 5)}:${getRandomInteger(17, 59)}:54.401Z`,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    destination: generateDestination(),
    offers: [1],
    type: typePoint,
  };
};
