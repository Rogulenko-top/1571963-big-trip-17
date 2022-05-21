import { FILTER_TYPE } from '../const.js';
import { isPointPast, isPointFuture, isPointCurrent } from './point.js';

const filter = {
  [FILTER_TYPE.EVERYTHING]: (points) => points,
  [FILTER_TYPE.FUTURE]: (points) => points.filter((point) => isPointFuture(point.dateFrom) || isPointCurrent(point.dateFrom)),
  [FILTER_TYPE.PAST]: (points) => points.filter((point) => isPointPast(point.dateTo) || isPointCurrent(point.dateTo)),
};

export { filter };
