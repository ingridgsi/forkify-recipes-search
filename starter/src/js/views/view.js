// To import icons from the original folder and make them work:
import icons from '../../img/icons.svg';

export default class View {
  _data;
  _errorMessage = 'No recipes found for your query! Please try again :)';
  _successMessage = '';

  /**
   *Render the received object to the DOM
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe).
   * @param {boolean} [render=true] If false, create markup string instead of rendering to the DOM.
   * @returns {undefined | string} A markup string is returned if render=false
   * @this {Object} Via instances
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderErrorMessage();
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    // Insert the html to the parent element (div recipes)
    // First clear the inner html in order to contain only the new rendered content
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const NewMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(NewMarkup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUTES
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  // To make a spinner show up while the recipe container is loading
  renderSpinner() {
    const markup = `
         <div class="spinner">
            <svg>
              <use href="${icons}.svg#icon-loader"></use>
            </svg>
          </div>
    
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderErrorMessage(message = this._errorMessage) {
    const markup = `
      <div class="error">
              <div>
                <svg>
                  <use href="${icons}icon-alert-triangle"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSuccessMessage(message = this._successMessage) {
    const markup = `
      <div class="message">
              <div>
                <svg>
                  <use href="${icons}icon-smile"></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>`;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
