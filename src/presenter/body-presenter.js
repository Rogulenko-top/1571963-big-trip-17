import TripSortView from '../view/trip-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventItemView from '../view/event-item-view.js';
import NewEventEditView from '../view/new-event-edit-view';

import {render} from '../render.js';

export default class BodyPresenter {
  eventListView = new EventListView();

  init = (bodyContainer,pointModel, destinationModel) => {
    this.bodyContainer = bodyContainer;
    this.pointModel = pointModel;
    this.destinationModel = destinationModel;
    this.boardDestination = this.destinationModel.getDestinations();
    this.boardPoint = [...this.pointModel.getPoints()];

    render(new TripSortView(), this.bodyContainer);
    render(this.eventListView, this.bodyContainer);
    render(new NewEventEditView(this.boardPoint[0], this.boardDestination[0]), this.eventListView.getElement());
    for (let i = 0; i < 5; i++) {
      render(new EventItemView(this.boardPoint[i]), this.eventListView.getElement());
    }

  };
}
