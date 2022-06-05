import { render, remove, RenderPosition } from '../framework/render.js';
import NewEventFormView from '../view/new-event-form-view.js';
import { UserAction, UpdateType } from '../const.js';
import { nanoid } from 'nanoid';
import { BLANK_POINT } from '../const.js';


export default class PointNewPresenter {
  #pointListContainer = null;
  #changeData = null;
  #pointEditComponent = null;
  #destroyCallback = null;

  #destination = null;
  #offers = null;

  constructor(pointListContainer, destination, changeData, offers) {
    this.#pointListContainer = pointListContainer;
    this.#destination = destination;
    this.#offers = offers;
    this.#changeData = changeData;
  }

  init = (callback) => {
    this.#destroyCallback = callback;

    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new NewEventFormView(BLANK_POINT, this.#destination, this.#offers);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setClickHandler(this.#handleFormClick);
    this.#pointEditComponent.setDeleteClickHandler(this.#handleDeleteClick);

    render(this.#pointEditComponent, this.#pointListContainer, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  };

  destroy = () => {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#destroyCallback?.();

    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      { id: nanoid(), ...point },
    );
    this.destroy();
  };

  #handleFormClick = () => {
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };
}
