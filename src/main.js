import MainPresenter from './presenter/main-presenter.js';
import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';
import OfferModel from './model/offer-model.js';

const tripMainElement= document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const destionationModel = new DestinationModel();
const pointModel = new PointModel();
const typesOffer = new OfferModel();

const mainPresenter = new MainPresenter(
  tripEventsElement,
  pointModel,
  destionationModel,
  tripMainElement,
  tripFiltersElement,
  typesOffer,
);

mainPresenter.init();


