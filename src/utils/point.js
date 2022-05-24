// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import minMax from 'dayjs/plugin/minMax.js';
import duration from 'dayjs/plugin/duration.js';
dayjs.extend(utc);
dayjs.extend(minMax);
dayjs.extend(duration);

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomArrayElement = (elements) => (elements[getRandomInteger(0, elements.length - 1)]);

const getRandomMultipleArrayElement = (elements) => {
  const randomArrayNumber = getRandomInteger(1, elements.length - 1);
  for (let i = elements.length - 1; i > 0; i--) {
    const randomSort = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[randomSort]] = [elements[randomSort], elements[i]];
  }
  const array = elements.slice(0, randomArrayNumber);
  return array;
};
const getDurationDates = (dateStart, dateFinish) => {
  const diff = dateFinish.diff(dateStart);
  const daysCount = dayjs.duration(diff).format('DD');
  const hoursCount = dayjs.duration(diff).format('HH');
  const minutesCount = dayjs.duration(diff).format('mm');

  if (daysCount > 0) {
    return `${daysCount}D ${hoursCount}H ${minutesCount}M`;
  }
  if (hoursCount > 0) {
    return `${hoursCount}H ${minutesCount}M`;
  } else {
    return `${minutesCount}M`;
  }
};


const getTitle = (boardPoint) => {
  let pretextTitle = 'to';
  if (boardPoint.type.includes('sightseeing') || boardPoint.type.includes('restaurant')) {
    pretextTitle = 'in';
  }
  if (boardPoint.type.includes('check-in')) {
    pretextTitle = 'at';
  }
  return pretextTitle;
};

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

// Раздел по сортировки данных

// Сравнение цены
const comparePrice = (priceA, priceB) => {
  if (priceA > priceB) {
    return -1;
  }
  if (priceA < priceB) {
    return 1;
  }
  return 0;
};

//Функция сортировки по цене для передачи в метод sort
const sortPointByPrice = (pointA, pointB) => comparePrice(pointA.basePrice, pointB.basePrice);

//Сравнение времени
const compareTime = (timeA, timeB) => {
  if (timeA > timeB) {
    return 1;
  }
  if (timeA < timeB) {
    return -1;
  }
  return 0;
};

//Функция сортировки по времени для передачи в метод sort
const sortByTime = (pointA, pointB) => {
  const timeA = pointA.dateFrom.diff(pointA.dateTo);
  const timeB = pointB.dateFrom.diff(pointB.dateTo);
  return compareTime(timeA, timeB);
};

const isPointPast = (date) => dayjs().isAfter(date, 'day');
const isPointFuture = (date) => dayjs().isBefore(date, 'day');
const isPointCurrent = (date) => dayjs().isSame(date, 'day');


export {getRandomInteger, getRandomArrayElement, getRandomMultipleArrayElement, getDurationDates, getTitle, updateItem, sortPointByPrice, sortByTime, isPointPast, isPointFuture, isPointCurrent };