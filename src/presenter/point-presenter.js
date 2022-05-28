import { render, replace, remove } from '../framework/render.js';
import { MODE } from '../const.js';

import EventItemView from '../view/event-item-view.js';
import NewEventFormView from '../view/new-event-form-view.js';


export default class PointPresenter {

  #eventListContainer = null;

  #pointFormComponent = null;
  #pointComponent = null;

  #changeData = null;
  #changeMode = null;
  #destionationData = null;
  #typesOfferData = null;

  #point = null;
  #mode = MODE.DEFAULT;

  constructor(eventListContainer, destionationData, changeData, changeMode, typesOfferData) {
    this.#eventListContainer = eventListContainer;
    this.#destionationData = destionationData;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
    this.#typesOfferData = typesOfferData;
  }

  init = (point) => {
    this.#point = point;

    const prevPointFormComponent = this.#pointFormComponent;
    const prevPointComponent = this.#pointComponent;

    this.#pointFormComponent = new NewEventFormView(point, this.#destionationData, this.#typesOfferData);
    this.#pointComponent = new EventItemView(point, this.#typesOfferData);

    this.#pointComponent.setClickHandler(this.#handlerFormToPointClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#pointFormComponent.setFormSubmitHandler(this.#handlerFormSubmit);
    this.#pointFormComponent.setClickHandler(this.#handlerPointToFormClick);

    if (prevPointComponent === null || prevPointFormComponent === null) {
      render(this.#pointComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === MODE.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === MODE.EDITING) {
      replace(this.#pointFormComponent, prevPointFormComponent);
    }

    remove(prevPointComponent);
    remove(prevPointFormComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointFormComponent);
  };

  resetView = () => {
    if (this.#mode !== MODE.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointFormComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = MODE.DEFAULT;
  };

  #replacePointToForm = () => {
    replace(this.#pointFormComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = MODE.EDITING;
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePointToForm();
    }
  };

  #handlerFormToPointClick = () => {
    this.#replacePointToForm();
  };

  #handlerFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();
  };

  #handlerPointToFormClick = () => {
    this.#replaceFormToPoint();
  };

}
