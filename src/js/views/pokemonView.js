import icons from 'url:../../img/svg/icons.svg';
import View from './view';
class PokemonView extends View {
	_data;

	_parentElement = document.querySelector('.pokemon-list');

	constructor() {
		super();
		this.addHandlerBtnDetailsClick();
	}

	addHandlerVisit(handler) {
		this._parentElement.addEventListener('click', function (e) {
			const btn = e.target.closest('.btn-visit');
			if (!btn) return;

			const pokemonName = btn.dataset.name;

			handler(pokemonName);
		});
	}

	addHandlerBtnDetailsClick() {
		this._parentElement.addEventListener('click', function (e) {
			let detailsContainer;
			let btn;
			if (e.target.classList.contains('btn-details')) {
				// e.target.innerText = text;
				btn = e.target;
			}
			if (e.target.dataset.icon) {
				btn = e.target.parentElement.parentElement;
			}
			if (e.target.classList.contains('toggle-details')) {
				btn = e.target.parentElement;
			}
			if (!btn) return;
			detailsContainer = btn.parentElement.parentElement.parentElement.parentElement.querySelector(
				'.details'
			);

			detailsContainer.classList.toggle('hidden');

			// toggle show hide text
			if (btn.dataset.hide === 'true') {
				btn.firstElementChild.textContent = 'hide details';

				btn.dataset.hide = false;
			} else {
				btn.firstElementChild.textContent = 'show details';

				btn.dataset.hide = true;
			}
		});
	}

	render(pokemon) {
		this._data = pokemon;

		const markup = this.generateMarkup();
		this._clear();

		this._parentElement.insertAdjacentHTML('afterbegin', markup);

		const paginationContainer = document.querySelector('.footer .container');
		paginationContainer.innerHTML = '';
	}
	generateMarkup() {
		return this.generatePokemon(this._data);
	}
}

export default new PokemonView();
