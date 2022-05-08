import TripInfoView from '../view/trip-info-view';
import TripFiltersView from '../view/trip-filters-view.js';

import {RenderPosition,render} from '../render.js';

export default class HeadPresenter {
  #tripInfoView = new TripInfoView();
  #tripFiltersView = new TripFiltersView();

  #headContainer = null;
  #filterContainer = null;

  constructor(headContainer, filterContainer){
    this.#headContainer = headContainer;
    this.#filterContainer = filterContainer;
  }

  #renderInfoView = () =>{
    render(this.#tripInfoView, this.#headContainer, RenderPosition.AFTERBEGIN);
  };

  #renderFiltersView = () =>{
    render(this.#tripFiltersView, this.#filterContainer);
  };

  init = () => {
    this.#renderInfoView();
    this.#renderFiltersView();
  };
}
