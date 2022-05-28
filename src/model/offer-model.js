import { createTypes } from '../mock/offer-mock.js';

export default class OfferModel {
  get typesOffer() {
    return createTypes();
  }
}
