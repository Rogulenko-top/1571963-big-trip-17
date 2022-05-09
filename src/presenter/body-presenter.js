import TripSortView from '../view/trip-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventItemView from '../view/event-item-view.js';
import NewEventFormView from '../view/new-event-form-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';

import {render} from '../render.js';

export default class BodyPresenter {
  #eventListView = new EventListView();
  #tripListEmptyView = new TripListEmptyView();

  #bodyContainer = null;
  #pointModel = null;
  #destinationModel = null;

  #boardDestination = [];
  #boardPoint = [];

  constructor(bodyContainer, pointModel, destinationModel){
    this.#bodyContainer = bodyContainer;
    this.#pointModel = pointModel;
    this.#destinationModel = destinationModel;

  }

  init = () => {
    this.#boardDestination = this.#destinationModel.destinations;
    this.#boardPoint = this.#pointModel.points;

    this.#renderTripPointsList();
  };

  #renderItemView = (point, descritpion) => {
    const FormViewComponent = new NewEventFormView(point, descritpion);
    const ItemViewComponent = new EventItemView(point, descritpion);

    const addFormToPoint = () => {
      ItemViewComponent.element.append(FormViewComponent.element);
    };

    const removeFormToPoint = () => {
      FormViewComponent.element.remove(ItemViewComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removeFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    ItemViewComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      addFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    FormViewComponent.element.querySelector('form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      removeFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    FormViewComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      removeFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    });
    render(ItemViewComponent, this.#eventListView.element);
  };

  #renderTripPointsList = () => {
    if(this.#boardPoint.length === 0){
      render (this.#tripListEmptyView, this.#bodyContainer);
      return;
    }
    render(new TripSortView(), this.#bodyContainer);
    render(this.#eventListView, this.#bodyContainer);

    for (let i = 0; i < this.#boardPoint.length; i++) {
      this.#renderItemView(this.#boardPoint[i], this.#boardDestination[i]);
    }
  };
}
