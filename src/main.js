import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import PointModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import { allDestinationData } from './mock/destination-mock.js';
import { typesOffer } from './mock/offer-mock.js';
import PointsApiService from './points-api-service.js';
import { AUTHORIZATION, END_POINT } from './const.js';

//кнопка
import { render, RenderPosition } from './framework/render.js';
import NewPointButtonView from './view/new-point-button-view.js';


const tripFiltersElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

//кнопка
const siteHeaderElement = document.querySelector('.trip-main__trip-controls');


const pointModel = new PointModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filterModel = new FilterModel();

const mainPresenter = new MainPresenter(  tripEventsElement, pointModel, allDestinationData,
  typesOffer, filterModel);

const filterPresenter = new FilterPresenter(tripFiltersElement, pointModel, filterModel);


const newPointButtonComponent = new NewPointButtonView();

const handleNewPointFormClose = () => {
  newPointButtonComponent.element.disabled = false;
};

const handleNewPointButtonClick = () => {
  mainPresenter.createPoint(handleNewPointFormClose);
  newPointButtonComponent.element.disabled = true;
};


filterPresenter.init();
mainPresenter.init();
pointModel.init()
  .finally(() => {
    render(newPointButtonComponent, siteHeaderElement, RenderPosition.AFTEREND);
    newPointButtonComponent.setClickHandler(handleNewPointButtonClick);
  });

