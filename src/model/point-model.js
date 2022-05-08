import {generatePoint} from '../mock/point-mock.js';

export default class PointModel {
  #createPoints = Array.from({length: 3}).fill().map(() => generatePoint());

  get points() {
    return this.#createPoints;
  }
}
