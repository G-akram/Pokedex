import * as model from './model';
import searchView from './views/searchView';
import pokemonView from './views/pokemonView';
import listView from './views/listView';
import paginationView from './views/paginationView';

const controlPokemon = async function (pokemon) {
	window.location = `#${pokemon}`;
	pokemonView.renderSpinner();
	try {
		await model.loadPokemon(pokemon);
		pokemonView.render(model.getPokemon());
	} catch (err) {
		// console.log(err);
		pokemonView.renderError(
			'sorry pokemon not found ! , you can try pikachu or charmander for example'
		);
	}
};

const controlSearchResult = function () {
	const userInput = searchView.getQuery();
	if (!userInput) return;
	controlPokemon(userInput);
};

const controlVisitPokemon = function (pokemon) {
	controlPokemon(pokemon);
};

//types results

const controlResults = async function () {
	// load first page of pokemons

	controlPokemonListToRender();
};

const controlPokemonListToRender = async function (page = 1) {
	const hash = window.location.hash;
	if (!hash.includes('type')) return;
	const type = hash.slice(1).split('-')[1];

	if (!type) return;

	try {
		listView.renderSpinner();
		if (type === 'all') {
			await model.loadAllPokemon(page);
		} else {
			await model.loadAllPokemonType(type, page);
		}

		listView.render(model.getPokemonList());
		paginationView.render(model.getSearch());
	} catch (err) {
		console.log(err);
		pokemonView.renderError(
			'sorry an mysterious error occurred , try again pls !'
		);
	}
};

const controlPagination = function (goToPage) {
	// load the REQUESTED PAGE of pokemons
	controlPokemonListToRender(goToPage);
};

const init = function () {
	searchView.addHandlerSearch(controlSearchResult);
	pokemonView.addHandlerVisit(controlVisitPokemon);

	listView.addHandlerRender(controlResults);
	paginationView.addHandlerClick(controlPagination);
};

init();
