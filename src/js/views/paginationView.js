import icons from 'url:../../img/svg/icons.svg';
import View from './view';

class PaginationView extends View {
	_parentElement = document.querySelector('.footer .container');

	addHandlerClick(handler) {
		this._parentElement.addEventListener('click', function (e) {
			const btn = e.target.closest('.btn-pagination');
			if (!btn) return;

			const goToPage = +btn.dataset.goto;

			handler(goToPage);
		});
	}

	render(data) {
		this._data = data;

		let markup = this._generateMarkup();
		this._clear();

		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}
	_generateMarkup() {
		const curPage = this._data.currentPage;
		const numPages = Math.ceil(
			this._data.numberOfPages / this._data.resultsPerPage
		);

		// Page 1, and there are other pages
		if (curPage === 1 && numPages > 1) {
			return `
            <button  data-goto="${
													curPage + 1
												}" class="btn btn--next btn-pagination">
            <p>page ${curPage + 1}</p>
            <svg class="fav__icon">
                <use href="${icons}#right-arrow"></use>
            </svg>
        </button>
            
	  `;
		}

		// Last page
		if (curPage === numPages && numPages > 1) {
			return `
            <button data-goto="${
													curPage - 1
												}" class="btn btn--previous btn-pagination">
            
				<svg class="fav__icon">
					<use href="${icons}#left-arrow"></use>
				</svg>
				<p>page ${curPage - 1}</p>
            </button>
	  `;
		}

		// Other page
		if (curPage < numPages) {
			return `
            <button data-goto="${
													curPage - 1
												}" class="btn btn--previous btn-pagination">

            <svg class="fav__icon">
            <use href="${icons}#left-arrow"></use>
            </svg>
            <p>page ${curPage - 1}</p>
            </button>
        

        <button  data-goto="${
									curPage + 1
								}" class="btn btn--next btn-pagination">
        <p>page ${curPage + 1}</p>
        <svg class="fav__icon">
                <use href="${icons}#right-arrow"></use>
            </svg>
    </button>
	  `;
		}

		// Page 1, and there are NO other pages
		return '';
	}
}

export default new PaginationView();
