import TripSortView from '../view/trip-sort-view.js';
import EventListView from '../view/event-list-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import HeadPresenter from './head-presenter.js';

import { render } from '../framework/render.js';
import { updateItem } from '../utils.js';

export default class MainPresenter {

  #eventListView = new EventListView();
  #tripListEmptyView = new TripListEmptyView();
  #tripSortView = new TripSortView();

  #headPresenter = null;

  #tripMainDOM = null;
  #tripFiltersDOM = null;

  #tripEventsDOM = null;
  #pointData = null;

  #arrayDataDestination = [];
  #arrayDataPoint = [];

  #savePointView = new Map();

  constructor(tripEventsDOM, pointData, tripMainDOM, tripFiltersDOM){
    this.#tripMainDOM = tripMainDOM;
    this.#tripFiltersDOM = tripFiltersDOM;
    this.#tripEventsDOM = tripEventsDOM;
    this.#pointData = pointData;
  }

  init = () => {
    this.#headPresenter = new HeadPresenter(this.#tripMainDOM, this.#tripFiltersDOM);
    this.#headPresenter.init();

    this.#arrayDataPoint = this.#pointData.points;

    this.#renderPointsList();
  };

  #renderListEmptyView = () => {
    render (this.#tripListEmptyView, this.#tripEventsDOM);
  };

  #renderSortView = () => {
    render(this.#tripSortView, this.#tripEventsDOM);
  };

  #clearPointsList = () => {
    this.#savePointView.forEach((presenter) => presenter.destroy());
    this.#savePointView.clear();
  };

  #handleModeChange = () => {
    this.#savePointView.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#arrayDataPoint = updateItem(this.#arrayDataPoint, updatedPoint);
    this.#savePointView.get(updatedPoint.id).init(updatedPoint);
  };

  #renderPointView = (point) => {
    const pointPresenter = new PointPresenter(this.#eventListView.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#savePointView.set(point.id, pointPresenter);
  };

  #renderPointsList = () => {
    if(this.#arrayDataPoint.length === 0){
      this.#renderListEmptyView();
      return;
    }
    this.#renderSortView();
    render(this.#eventListView, this.#tripEventsDOM);

    for (let i = 0; i < this.#arrayDataPoint.length; i++) {
      this.#renderPointView(this.#arrayDataPoint[i], this.#arrayDataDestination[i]);
    }
  };
}
