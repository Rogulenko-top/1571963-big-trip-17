import TripSortView from '../view/trip-sort-view.js';
import EventListView from '../view/event-list-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import HeadPresenter from './head-presenter.js';
import { SORT_TYPE } from '../const.js';

import { render } from '../framework/render.js';
import { updateItem, sortPointByPrice, sortByTime } from '../utils/point.js';

export default class MainPresenter {

  #eventListView = new EventListView(); // создаем экземпляр пустого списка точек маршрута
  #tripListEmptyView = new TripListEmptyView(); //Создаем экземпляр вьюшки вывода сообщения при отсутствии точек маршрута
  #tripSortView = new TripSortView(); //создаем экземпляр вьюшки сортировки

  #headPresenter = null;

  #tripMainDOM = null;
  #tripFiltersDOM = null;

  #tripEventsDOM = null;
  #pointData = null;
  #destionationData = null;
  #typesOfferData = null;

  #arrayDataPoint = [];
  #sourcedArrayDataPoint = [];

  #savePointView = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;

  constructor(tripEventsDOM, pointData, destionationData, tripMainDOM, tripFiltersDOM, typesOfferData){
    this.#tripMainDOM = tripMainDOM;
    this.#tripFiltersDOM = tripFiltersDOM;
    this.#tripEventsDOM = tripEventsDOM;
    this.#pointData = pointData;
    this.#destionationData = destionationData;
    this.#typesOfferData = typesOfferData;
  }

  init = () => {
    this.#renderHeadPresenter();

    this.#arrayDataPoint = [...this.#pointData.points];
    this.#sourcedArrayDataPoint = [...this.#pointData.points];


    this.#renderСonditionPointsView();
  };

  get points(){
    return this.#pointData.points;
  }

  #renderHeadPresenter = () => {
    this.#headPresenter = new HeadPresenter(this.#tripMainDOM, this.#tripFiltersDOM, this.#pointData.points);
    this.#headPresenter.init();
  };

  #renderListEmptyView = () => {
    render (this.#tripListEmptyView, this.#tripEventsDOM);
  };

  #renderSortView = () => {
    render(this.#tripSortView, this.#tripEventsDOM);
    this.#tripSortView.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #clearPointsList = () => {
    this.#savePointView.forEach((presenter) => presenter.destroy());
    this.#savePointView.clear();
  };

  #handleModeChange = () => {
    this.#savePointView.forEach((presenter) => presenter.resetView());
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SORT_TYPE.PRICE:
        this.#arrayDataPoint.sort(sortPointByPrice);
        break;
      case SORT_TYPE.TIME:
        this.#arrayDataPoint.sort(sortByTime);
        break;
      case SORT_TYPE.DEFAULT:
        this.#arrayDataPoint = [...this.#sourcedArrayDataPoint];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    this.#clearPointsList();
    this.#renderAmountPointsView();
  };

  #renderAmountPointsView = () => {
    render(this.#eventListView, this.#tripEventsDOM);
    for (let i = 0; i < this.#arrayDataPoint.length; i++) {
      this.#renderCreatePointView(this.#arrayDataPoint[i]);
    }
  };

  #handlePointChange = (updatedPoint) => {
    this.#arrayDataPoint = updateItem(this.#arrayDataPoint, updatedPoint);
    this.#sourcedArrayDataPoint = updateItem(this.#sourcedArrayDataPoint, updatedPoint);
    this.#savePointView.get(updatedPoint.id).init(updatedPoint);
  };

  #renderCreatePointView = (point) => {
    const pointPresenter = new PointPresenter(this.#eventListView.element, this.#destionationData, this.#handlePointChange, this.#handleModeChange, this.#typesOfferData);
    pointPresenter.init(point);
    this.#savePointView.set(point.id, pointPresenter);
  };

  #renderСonditionPointsView = () => {
    if(this.#arrayDataPoint.length === 0){
      this.#renderListEmptyView();
      return;
    }
    this.#renderSortView();
    this.#renderAmountPointsView();
  };
}
