import TripSortView from '../view/trip-sort-view.js';
import EventListView from '../view/event-list-view.js';
import EventItemView from '../view/event-item-view.js';
import NewEventFormView from '../view/new-event-form-view.js';
import TripListEmptyView from '../view/trip-list-empty-view.js';

import { render, replace } from '../framework/render.js';

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

    const replacePointToForm = () => {
      replace(ItemViewComponent, FormViewComponent);
    };

    const replaceFormToPoint = () => {
      replace(FormViewComponent, ItemViewComponent);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replacePointToForm();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    ItemViewComponent.setClickHandler(() => {
      replaceFormToPoint();
      document.addEventListener('keydown', onEscKeyDown);
    });

    FormViewComponent.setFormSubmitHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    FormViewComponent.setClickHandler (() => {
      replacePointToForm();
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
