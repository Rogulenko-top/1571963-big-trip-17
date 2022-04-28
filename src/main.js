import HeadPresenter from './presenter/head-presenter.js';
import BodyPresenter from './presenter/body-presenter.js';

const tripMainElement= document.querySelector('.trip-main');
const tripFiltersElement = tripMainElement.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');
const headPresenter = new HeadPresenter();
const bodyPresenter = new BodyPresenter();

headPresenter.init(tripMainElement, tripFiltersElement);
bodyPresenter.init(tripEventsElement);


