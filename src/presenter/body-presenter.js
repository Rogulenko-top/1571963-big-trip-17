import TripSortView from '../view/trip-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventItemView from '../view/event-item-view.js';
import CreateNewEventFormView from '../view/new-event-form-view.js';
import CreateNewEventEditView from '../view/new-event-edit-view';

import {render} from '../render.js';

export default class BodyPresenter {
  eventListView = new EventListView();

  init = (bodyContainer) => {
    this.bodyContainer = bodyContainer;
    render(new TripSortView(), this.bodyContainer);
    render(this.eventListView, this.bodyContainer);
    render(new CreateNewEventFormView(), this.eventListView.getElement());
    render(new CreateNewEventEditView(), this.eventListView.getElement());
    for (let i = 0; i < 3; i++) {
      render(new EventItemView(), this.eventListView.getElement());
    }

  };
}
