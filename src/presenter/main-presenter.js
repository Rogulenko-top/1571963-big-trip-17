import TripSortView from '../view/trip-sort-view.js';
import EventListView from '../view/event-list-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import PointPresenter from './point-presenter.js';
import HeadPresenter from './head-presenter.js';
import { SORT_TYPE, UpdateType, UserAction } from '../const.js';

import { render } from '../framework/render.js';
import { sortPointByPrice, sortByTime } from '../utils/point.js';

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

  #savePointView = new Map();
  #currentSortType = SORT_TYPE.DEFAULT;

  constructor(tripEventsDOM, pointData, destionationData, tripMainDOM, tripFiltersDOM, typesOfferData){
    this.#tripMainDOM = tripMainDOM;
    this.#tripFiltersDOM = tripFiltersDOM;
    this.#tripEventsDOM = tripEventsDOM;
    this.#pointData = pointData;
    this.#destionationData = destionationData;
    this.#typesOfferData = typesOfferData;

    this.#pointData.addObserver(this.#handleModelEvent);
  }

  init = () => {
    this.#renderHeadPresenter();

    this.#renderСonditionPointsView();
  };

  get points(){
    switch (this.#currentSortType) {
      case SORT_TYPE.PRICE:
        return [...this.#pointData.points].sort(sortPointByPrice);
      case SORT_TYPE.TIME:
        return [...this.#pointData.points].sort(sortByTime);
    }
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

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderAmountPointsView();
  };

  #renderAmountPointsView = () => {
    render(this.#eventListView, this.#tripEventsDOM);
    for (let i = 0; i < this.points.length; i++) {
      this.#renderCreatePointView(this.points[i]);
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#pointData.updatePoint(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#pointData.addPoint(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#pointData.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#savePointView.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearPointsList();
        this.#renderСonditionPointsView();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this.#clearPointsList({ resetSortType: true });
        this.#renderСonditionPointsView();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #renderCreatePointView = (point) => {
    const pointPresenter = new PointPresenter(this.#eventListView.element, this.#destionationData, this.#handleViewAction, this.#handleModeChange, this.#typesOfferData);
    pointPresenter.init(point);
    this.#savePointView.set(point.id, pointPresenter);
  };

  #renderСonditionPointsView = () => {
    const points = this.points;
    const pointCount = points.length;
    if(pointCount === 0){
      this.#renderListEmptyView();
      return;
    }
    this.#renderSortView();
    this.#renderAmountPointsView();
  };
}
