import {generatePoint} from '../mock/point-mock.js';

export default class PointModel {
  createPoints = Array.from({length: 20}).fill().map(() => generatePoint());
  getPoints = () => this.createPoints;
}
