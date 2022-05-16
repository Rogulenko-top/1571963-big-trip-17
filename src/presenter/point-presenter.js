import EventItemView from '../view/event-item-view.js';
import NewEventFormView from '../view/new-event-form-view.js';

import { render, replace, remove } from '../framework/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};


export default class PointPresenter{

  #eventListContainer = null;

  #formComponent = null;
  #pointComponent = null;

  #changeData = null;
  #changeMode = null;

  #point = null;
  #mode = Mode.DEFAULT;

  constructor(eventListContainer, changeData, changeMode){
    this.#eventListContainer = eventListContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) =>{
    this.#point = point;

    const prevFormComponent = this.#formComponent;
    const prevPointComponent = this.#pointComponent;

    this.#formComponent = new NewEventFormView(point);
    this.#pointComponent = new EventItemView(point);

    this.#pointComponent.setClickHandler(this.#handlerFormToPointClick);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#formComponent.setFormSubmitHandler(this.#handlerFormSubmit);
    this.#formComponent.setClickHandler(this.#handlerPointToFormClick);


    render(this.#pointComponent, this.#eventListContainer);

    if (prevFormComponent === null || prevPointComponent === null) {
      render(this.#pointComponent, this.#eventListContainer);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#formComponent, prevFormComponent);
    }

    remove(prevFormComponent);
    remove(prevPointComponent);
  };

  destroy = () => {
    remove(this.#formComponent);
    remove(this.#pointComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  };

  #replaceFormToPoint = () => {
    replace(this.#formComponent, this.#pointComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #replacePointToForm = () => {
    replace(this.#pointComponent, this.#formComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#replacePointToForm();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #handlerFormToPointClick = () => {
    this.#replaceFormToPoint();
  };

  #handlerFormSubmit = () => {
    this.#replacePointToForm();
  };

  #handlerPointToFormClick = () => {
    this.#replacePointToForm();
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#point, isFavorite: !this.#point.isFavorite});
  };

}
