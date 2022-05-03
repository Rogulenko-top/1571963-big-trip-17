import TripInfoView from '../view/trip-info-view';
import TripFiltersView from '../view/trip-filters-view.js';

import {RenderPosition,render} from '../render.js';

export default class HeadPresenter {

  init = (headContainer, filterContainer) => {
    this.headContainer = headContainer;
    this.filterContainer = filterContainer;

    render(new TripInfoView(), this.headContainer, RenderPosition.AFTERBEGIN);
    render(new TripFiltersView(), this.filterContainer);
  };
}
