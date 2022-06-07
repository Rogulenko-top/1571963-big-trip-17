import TripSortView from '../view/trip-sort-view.js';
import EventListView from '../view/event-list-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';
import LoadingView from '../view/trip-loading-view.js';
import PointPresenter from './point-presenter.js';
import PointNewPresenter from './point-new-presenter.js';

import { SORT_TYPE, UpdateType, UserAction, FILTER_TYPE } from '../const.js';

import { remove, render, RenderPosition } from '../framework/render.js';
import { sortPointByPrice, sortByTime, sortPointUp } from '../utils/point.js';
import { filter } from '../utils/filter.js';

export default class MainPresenter {

  #eventListView = new EventListView(); // создаем экземпляр пустого списка точек маршрута
  #tripListEmptyView = null; //Создаем экземпляр вьюшки вывода сообщения при отсутствии точек маршрута
  #loadingComponent = new LoadingView();
  #sortComponent = null; //создаем экземпляр вьюшки сортировки

  #filterModel = null;

  #tripEventsDOM = null;
  #pointData = null;


  #savePointView = new Map();
  #pointNewPresenter = null;
  #currentSortType = SORT_TYPE.DEFAULT;
  #filterType = FILTER_TYPE.EVERYTHING;
  #isLoading = true;

  constructor(tripEventsDOM, pointData, filterModel){
    this.#tripEventsDOM = tripEventsDOM;
    this.#pointData = pointData;
    this.#filterModel = filterModel;

    this.#pointNewPresenter = new PointNewPresenter(this.#eventListView.element, this.#handleViewAction, this.#pointData);

    this.#pointData.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    this.#filterType = this.#filterModel.filter;
    const tasks = this.#pointData.points;
    const filteredPoints = filter[this.#filterType](tasks);

    switch (this.#currentSortType) {
      case SORT_TYPE.PRICE:
        return filteredPoints.sort(sortPointByPrice);
      case SORT_TYPE.TIME:
        return filteredPoints.sort(sortByTime);
      case SORT_TYPE.DEFAULT:
        return filteredPoints.sort(sortPointUp);
    }
    return filteredPoints;
  }

  init = () => {
    this.#renderСonditionPointsView();
  };

  createPoint = (callback) => {
    this.#currentSortType = SORT_TYPE.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MINOR, FILTER_TYPE.EVERYTHING);
    this.#pointNewPresenter.init(callback);
  };

  #renderListEmptyView = () => {
    this.#tripListEmptyView = new TripListEmptyView(this.#filterType);
    render (this.#tripListEmptyView, this.#tripEventsDOM, RenderPosition.AFTERBEGIN);

    render(this.#tripListEmptyView, this.#tripEventsDOM, RenderPosition.AFTERBEGIN);
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearPointsList();
    this.#renderСonditionPointsView();
  };

  #renderSortView = () => {
    this.#sortComponent = new TripSortView(this.#currentSortType);

    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#tripEventsDOM, RenderPosition.AFTERBEGIN);
  };

  #clearPointsList = ({ resetSortType = false } = {}) => {
    this.#pointNewPresenter.destroy();
    this.#savePointView.forEach((presenter) => presenter.destroy());
    this.#savePointView.clear();

    remove(this.#sortComponent);

    if (this.#tripListEmptyView) {
      remove(this.#tripListEmptyView);
    }

    if (resetSortType) {
      this.#currentSortType = SORT_TYPE.DEFAULT;
    }
  };

  #handleModeChange = () => {
    this.#pointNewPresenter.destroy();
    this.#savePointView.forEach((presenter) => presenter.resetView());
  };


  #handleViewAction = (actionType, updateType, update) => {
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointData.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointData.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
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
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#renderСonditionPointsView();
        break;
    }
  };

  #renderLoading = () => {
    render(this.#loadingComponent, this.#tripEventsDOM, RenderPosition.AFTERBEGIN);
  };


  #renderAmountPointsView = (points) => {
    points.forEach((point) => this.#renderCreatePointView(point));
  };

  #renderCreatePointView = (point) => {
    const pointPresenter = new PointPresenter(this.#eventListView.element, this.#handleViewAction, this.#handleModeChange, this.#pointData);

    pointPresenter.init(point);
    this.#savePointView.set(point.id, pointPresenter);
  };

  #renderСonditionPointsView = () => {

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    const points = this.points;
    const pointCount = points.length;

    if(pointCount === 0){
      this.#renderListEmptyView();
      return;
    }
    this.#renderSortView();
    render(this.#eventListView, this.#tripEventsDOM);
    this.#renderAmountPointsView(points);
  };
}
