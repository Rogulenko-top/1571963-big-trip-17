import TripInfoView from '../view/trip-info-view';
import TripFiltersView from '../view/trip-filters-view.js';
import { generateFilter } from '../mock/filter-mock.js';

import { render,RenderPosition } from '../framework/render';

export default class HeadPresenter {
  #tripInfoView = null;
  #tripFiltersView = null;

  #headContainer = null;
  #filterContainer = null;

  #pointData = null;

  constructor(headContainer, filterContainer,pointData){
    this.#headContainer = headContainer;
    this.#filterContainer = filterContainer;
    this.#pointData = pointData;
  }

  init = () => {
    this.#tripInfoView = new TripInfoView();
    this.#tripFiltersView = new TripFiltersView(generateFilter(this.#pointData));

    this.#renderInfoView();
    this.#renderFiltersView();
  };

  #renderInfoView = () =>{
    render(this.#tripInfoView, this.#headContainer, RenderPosition.AFTERBEGIN);
  };

  #renderFiltersView = () =>{
    render(this.#tripFiltersView, this.#filterContainer);
  };
}
