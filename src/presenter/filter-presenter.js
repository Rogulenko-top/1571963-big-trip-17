import { render, replace, remove  } from '../framework/render.js';
import TripFiltersView from '../view/trip-filters-view.js';
import { filter } from '../utils/filter.js';
import { FILTER_TYPE, UpdateType } from '../const.js';

export default class FilterPresenter {

  #tripFiltersView = null;
  #filterContainer = null;

  #pointsModel = null;
  #filterModel = null;

  constructor(filterContainer, pointsModel, filterModel){
    this.#filterContainer = filterContainer;
    this.#pointsModel = pointsModel;
    this.#filterModel = filterModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const points = this.#pointsModel.points;

    return [
      {
        type: FILTER_TYPE.EVERYTHING,
        name: 'EVERYTHING',
        count: filter[FILTER_TYPE.EVERYTHING](points).length,
      },
      {
        type: FILTER_TYPE.FUTURE,
        name: 'FUTURE',
        count: filter[FILTER_TYPE.FUTURE](points).length,
      },
      {
        type: FILTER_TYPE.PAST,
        name: 'PAST',
        count: filter[FILTER_TYPE.PAST](points).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#tripFiltersView;

    this.#tripFiltersView = new TripFiltersView(filters, this.#filterModel.filter);
    this.#tripFiltersView.setFilterTypeChengeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#tripFiltersView, this.#filterContainer);
      return;
    }

    replace(this.#tripFiltersView, prevFilterComponent);
    remove(prevFilterComponent);

  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
