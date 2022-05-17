import MainPresenter from './presenter/main-presenter.js';
import PointModel from './model/point-model.js';


const tripMainElement= document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const pointModel = new PointModel();

const mainPresenter = new MainPresenter(
  tripEventsElement,
  pointModel,
  tripMainElement,
  tripFiltersElement);

mainPresenter.init();


