import {createElement} from '../render.js';

const createTripFiltersTemplate = () => (
  `<form class="trip-filters" action="#" method="get">
    <div class="trip-filters__filter">
      <input id="filter-everything" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-fivalue="everything">
      <label class="trip-filters__filter-label" for="filter-everything">Everything</label>
    </div>

    <div class="trip-filters__filter">
       <input id="filter-future" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-fivalue="future">
      <label class="trip-filters__filter-label" for="filter-future">Future</label>
    </div>

    <div class="trip-filters__filter">
       <input id="filter-past" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-fivalue="past" checked>
      <label class="trip-filters__filter-label" for="filter-past">Past</label>
    </div>

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`
);

export default class TripFiltersView {
  getTemplate() {
    return createTripFiltersTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
