import AbstractView from '../framework/view/abstract-view.js';
import { FILTER_TYPE } from '../const.js';

const NoPointTextType = {
  [FILTER_TYPE.EVERYTHING]: 'Click New Event to create your first point',
  [FILTER_TYPE.FUTURE]: 'There are no future events now',
  [FILTER_TYPE.PAST]: 'There are no past events now',
};

const createTripListEmptyTemplate = (filterType) => {
  const noPointTextValue = NoPointTextType[filterType];

  return (
    `<p class="trip-events__msg">
      ${noPointTextValue}
    </p>`);
};


export default class TripListEmptyView extends AbstractView {
  #filterType = null;

  constructor(filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createTripListEmptyTemplate(this.#filterType);
  }
}
