import TripInfoView from '../view/trip-info-view';
import TripFiltersView from '../view/trip-filters-view.js';

import { render,RenderPosition } from '../framework/render';

export default class HeadPresenter {
  #tripInfoView = null;
  #tripFiltersView = null;

  #headContainer = null;
  #filterContainer = null;

  constructor(headContainer, filterContainer){
    this.#headContainer = headContainer;
    this.#filterContainer = filterContainer;
  }

  init = () => {
    this.#tripInfoView = new TripInfoView();
    this.#tripFiltersView = new TripFiltersView();

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
