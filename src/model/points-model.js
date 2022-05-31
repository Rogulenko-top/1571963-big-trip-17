import { generatePoint } from '../mock/point-mock.js';
import { NUM_OF_POINTS } from '../const.js';
import Observable from '../framework/observable.js';

export default class PointsModel extends Observable {
  #points = Array.from({ length: NUM_OF_POINTS }, generatePoint);

  get points() {
    return this.#points;
  }
}
