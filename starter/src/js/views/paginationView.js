// To import icons from the original folder and make them work:
import icons from '../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return; // If we don't add if (!btn) return whenever clicks happen around the button, the function will be called with a null
      console.log(btn);

      const goToPage = +btn.dataset.goto; // (+) is to convert the number into the data set , which is a string, into a number

      handler(goToPage); // this means that the function controlPagination created on controller.js will run. That's why on init function (controller.js) we passed => paginationView.addHandlerClick(controlPagination);

      // we passed the number generated inside goToPage inside the handler function and it need to accept it on controller.js by adding goToPage as a parameter => const controlPagination = function (goToPage) {} //
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    console.log(numPages);

    //It's like 60 / 10 (the number of item set to be displayed per page)

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return `
             <button data-goto="${
               curPage + 1
             }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `<button data-goto="${
        curPage - 1
      }"class="btn--inline pagination__btn--prev">
              <svg class="search__icon">
               <use href="${icons}#icon-arrow-left"></use>
               </svg>
               <span>Page ${curPage - 1}</span>
             </button>`;
    }
    // Other page

    if (curPage < numPages) {
      return `<button data-goto="${
        curPage - 1
      }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
       <use href="${icons}#icon-arrow-left"></use>
       </svg>
       <span>Page ${curPage - 1}</span>
     </button>
        <button data-goto="${
          curPage + 1
        }"class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `;
    }

    // Page 1, and there are NO other pages
    return '';
  }
}

export default new PaginationView();
