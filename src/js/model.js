import { AJAX } from './helper';
import * as pokemon from './models/pokemon';
import { API_URL, RES_PER_PAGE, KEY } from './config.js';

const state = {
	pokemon: {},
	allPokemonType: {
		type: null,
		pokemonList: [],
		resultsPerPage: RES_PER_PAGE,
		numberOfPages: null,
		page: 1,
	},
	favorites: [],
};

// load pokemon by name
export const loadPokemon = async function (
	pokemonSearched,
	loadAll = false,
	fetchByName = true
) {
	try {
		let data;
		let pokemonObj;

		if (fetchByName) {
			data = await fetchPokemon(pokemonSearched);
			pokemonObj = await pokemon.generatePokemonObj(data);
			state.pokemon = pokemonObj;
		} else {
			data = await fetchPokemonByUrl(pokemonSearched);
			pokemonObj = await pokemon.generatePokemonObj(data);
			return pokemonObj;
		}
	} catch (err) {
		throw err;
	}
};

const fetchPokemon = async function (pokemon) {
	const data = await AJAX(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

	return data;
};

const fetchPokemonByUrl = async function (url) {
	const data = await AJAX(`${url}`);

	return data;
};

export const loadAllPokemon = async function (page = 1, type = 'all') {
	const data = await AJAX(
		`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=800`
	);

	state.allPokemonType.page = page;
	const start = (page - 1) * state.allPokemonType.resultsPerPage;
	const end = page * state.allPokemonType.resultsPerPage;

	const pokemonList = [];

	for (let index = start; index < end; index++) {
		const pokemonObj = await loadPokemon(data.results[index].url, true, false);
		pokemonList.push(pokemonObj);
	}

	// get the number of page so we can display numbers of pages in pagination buttons
	state.allPokemonType.type = type;
	state.allPokemonType.pokemonList = pokemonList;
	state.allPokemonType.numberOfPages = data.results.length;

	return pokemonList;
};

// loading types
export const loadAllPokemonType = async function (type, page = 1) {
	const data = await AJAX(`https://pokeapi.co/api/v2/type/${type}`);
	const allPokemonType = data.pokemon;

	state.allPokemonType.page = page;
	const start = (page - 1) * state.allPokemonType.resultsPerPage;
	const end = page * state.allPokemonType.resultsPerPage;

	const pokemonList = [];
	for (let index = start; index < end; index++) {
		const pokemonObj = await loadPokemon(
			allPokemonType[index].pokemon.url,
			true,
			false
		);

		pokemonList.push(pokemonObj);
	}

	// get the number of page so we can display numbers of pages in pagination buttons
	state.allPokemonType.type = type;
	state.allPokemonType.pokemonList = pokemonList;
	state.allPokemonType.numberOfPages = allPokemonType.length;
};

// getters

export const getPokemonList = function () {
	return state.allPokemonType.pokemonList;
};
export const getPokemon = function () {
	return state.pokemon;
};

export const getSearch = function () {
	return {
		numberOfPages: state.allPokemonType.numberOfPages,
		currentPage: state.allPokemonType.page,
		resultsPerPage: state.allPokemonType.resultsPerPage,
	};
};
