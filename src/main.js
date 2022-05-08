import HeadPresenter from './presenter/head-presenter.js';
import BodyPresenter from './presenter/body-presenter.js';
import PointModel from './model/point-model.js';
import DestinationModel from './model/destination-model.js';

const tripMainElement= document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');


const pointModel = new PointModel();
const destinationModel = new DestinationModel();
const headPresenter = new HeadPresenter();

const bodyPresenter = new BodyPresenter(tripEventsElement, pointModel, destinationModel);

headPresenter.init(tripMainElement, tripFiltersElement);
bodyPresenter.init(tripEventsElement, pointModel, destinationModel);


