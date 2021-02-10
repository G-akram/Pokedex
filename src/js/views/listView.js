import View from './view';

class ListView extends View {
	_data;
	_parentElement = document.querySelector('.pokemon-list');

	addHandlerRender(handler) {
		['hashchange', 'load'].forEach((ev) => {
			window.addEventListener(ev, handler);
		});
	}

	render(data) {
		this._data = data;

		let markup = this.generateMarkup();

		this._clear();

		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	generateMarkup() {
		return this._data
			.map((pokemon) => this.generatePokemon(pokemon, true))
			.join('');
	}
}

export default new ListView();
