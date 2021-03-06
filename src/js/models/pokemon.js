import { AJAX } from '../helper';

const fetchData = async function (pokemon) {
	const data = await AJAX(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

	return data;
};

export const generatePokemonObj = async function (data) {
	const typesInfos = generatePokemonTypesInfos(data.types);
	const types = generatePokemonTypesName(typesInfos);
	const moves = generatePokemonMoves(data.moves);
	const stats = generatePokemonStats(data.stats);
	const abilities = generatePokemonAbilities(data.abilities);

	// we need to get pokemon species to get the chain infos and weaknesses
	// but we get only name,lvl , item and trigger , we dont get imgUrl , types etc for parents-child pokemons , that's why we make another fetch "getEvolutionDetails" TO GET ALL DETAILS
	const evolutionChain = await getEvolutionChain(data.species);

	// after getting Evolutions pokemons names , we fetch more details (img , id , types ..)
	const evolutionDetails = await getEvolutionDetails(evolutionChain);

	// we need typesInfo (type url) to make the search
	const { weakAgainst } = await getWeaknessesInfos(typesInfos);
	const { strongAgainst } = await getWeaknessesInfos(typesInfos);

	const pokemon = {
		id: data.id,
		order: data.order,
		name: data.name,
		height: data.height,
		weight: data.weight,
		stats: stats,
		typesInfos: types,
		types: types,
		abilities: abilities,
		moves: moves,
		img: data.sprites.front_default,
		urlSpecies: data.species,
		evolutionDetails: evolutionDetails,
		weakAgainst,
		strongAgainst,
		favorite: false,
	};

	return pokemon;
};

//////////////////////////////////////
// shit happens here
/////////////////////////

//evolution
const getEvolutionChain = async function (urlSpecies) {
	// we need to get specie first to get evolution infos
	const speciesInfos = await AJAX(`${urlSpecies.url}`);
	const evolutionChainUrl = speciesInfos.evolution_chain.url;

	const evoData = await AJAX(`${evolutionChainUrl}`);

	let evoList = [];
	let evoChainData = evoData.chain;

	do {
		let evoDetails = evoChainData['evolution_details'][0];

		evoList.push({
			pokemonName: evoChainData.species.name,
			minLevel: !evoDetails ? 1 : evoDetails.min_level,
			triggerName: !evoDetails ? null : evoDetails.trigger.name,
			item: !evoDetails ? null : evoDetails.item,
		});

		evoChainData = evoChainData['evolves_to'][0];
	} while (!!evoChainData && evoChainData.hasOwnProperty('evolves_to'));

	return evoList;
};

const getEvolutionDetails = async function (evolutionChain) {
	const pokemonList = [];
	const evoluteTo = [];
	evolutionChain.forEach((el) => {
		const pokemon = {
			name: el.pokemonName,
			minLvl: el.minLevel,
			triggerName: el.triggerName,
			item: el.item,
		};

		pokemonList.push(el.pokemonName);
		evoluteTo.push(pokemon);
	});

	const allPokemonInfos = [];

	for (const pokemon of pokemonList) {
		const infos = await fetchData(pokemon);
		allPokemonInfos.push(infos);
	}

	allPokemonInfos.forEach((pokemonInfos, index) => {
		const typesInfos = generatePokemonTypesInfos(pokemonInfos.types);
		const typesNames = [];

		typesInfos.forEach((typeInfo) => {
			typesNames.push(typeInfo.name);
		});

		evoluteTo[index].id = pokemonInfos.id;
		evoluteTo[index].type = typesNames;
		evoluteTo[index].img = pokemonInfos.sprites.front_default;
	});

	return evoluteTo;
};

// generate pokemon interne objects : stats , types , moves , abilities

// we need types infos for weaknesses and strengths (search by url type)
const generatePokemonTypesInfos = function (typesArray) {
	const types = [];
	typesArray.forEach((typeObj) => {
		types.push({ name: typeObj.type.name, url: typeObj.type.url });
	});

	return types;
};

const generatePokemonMoves = function (movesArray) {
	const moves = [];
	movesArray.forEach((moveObj) => {
		moves.push(moveObj.move.name);
	});

	return moves;
};

const generatePokemonStats = function (statsArray) {
	const stats = [];
	statsArray.forEach((statsObj) => {
		stats.push({
			statName: statsObj.stat.name,
			statValue: statsObj.base_stat,
		});
	});

	return stats;
};

const generatePokemonAbilities = function (abilitiesArray) {
	const abilities = [];
	abilitiesArray.forEach((abilityObj) => {
		abilities.push(abilityObj.ability.name);
	});

	return abilities;
};

const generatePokemonTypesName = function (types) {
	const typesList = [];
	types.forEach((type) => {
		typesList.push(type.name);
	});

	return typesList;
};

// weakness and strength

const getWeaknessesInfos = async function (types) {
	const weaknessesInfos = [];
	for (const type of types) {
		const infos = await AJAX(`${type.url}`);

		weaknessesInfos.push({ type: infos.name, infos: infos.damage_relations });
	}

	let weakAgainst = [];
	let strongAgainst = [];

	weaknessesInfos.forEach((damageRelations) => {
		// weak against
		damageRelations.infos.double_damage_from.forEach((type) => {
			weakAgainst.push(type.name);
		});

		damageRelations.infos.half_damage_to.forEach((type) => {
			weakAgainst.push(type.name);
		});

		damageRelations.infos.no_damage_to.forEach((type) => {
			weakAgainst.push(type.name);
		});

		// strong against

		damageRelations.infos.double_damage_to.forEach((type) => {
			strongAgainst.push(type.name);
		});

		damageRelations.infos.half_damage_from.forEach((type) => {
			strongAgainst.push(type.name);
		});

		damageRelations.infos.no_damage_from.forEach((type) => {
			strongAgainst.push(type.name);
		});
	});

	// to compare and remove duplicated value ( if type in both list , remove it)
	weakAgainst = weakAgainst.filter((type) => !strongAgainst.includes(type));
	strongAgainst = strongAgainst.filter((type) => !weakAgainst.includes(type));
	return {
		weakAgainst: [...new Set(weakAgainst)],
		strongAgainst: [...new Set(strongAgainst)],
	};
};
