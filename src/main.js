import MainPresenter from './presenter/main-presenter.js';
import PointModel from './model/points-model.js';
import { allDestinationData } from './mock/destination-mock.js';
import { typesOffer } from './mock/offer-mock.js';

const tripMainElement= document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');


const pointModel = new PointModel();

const mainPresenter = new MainPresenter(
  tripEventsElement,
  pointModel,
  allDestinationData,
  tripMainElement,
  tripFiltersElement,
  typesOffer,
);

mainPresenter.init();


