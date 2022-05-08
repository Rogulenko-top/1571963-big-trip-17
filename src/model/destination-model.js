import { createDestinations } from '../mock/destination-mock.js';

export default class DestinationModel {
  get destinations() {
    return createDestinations();
  }
}
