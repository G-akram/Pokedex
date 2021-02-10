import icons from 'url:../../img/svg/icons.svg';
export default class View {
	_data;

	_parentElement;

	render(data) {
		this._data = data;

		const markup = this.generateMarkup();
		this._clear();

		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	update(data) {
		this._data = data;
		const newMarkup = this._generateMarkup();

		const newDOM = document.createRange().createContextualFragment(newMarkup);
		const newElements = Array.from(newDOM.querySelectorAll('*'));
		const curElements = Array.from(this._parentElement.querySelectorAll('*'));

		newElements.forEach((newEl, i) => {
			const curEl = curElements[i];
			// console.log(curEl, newEl.isEqualNode(curEl));

			// Updates changed TEXT
			if (!newEl.isEqualNode(curEl) && newEl.firstChild?.nodeValue.trim() !== '') {
				// console.log('💥', newEl.firstChild.nodeValue.trim());
				curEl.textContent = newEl.textContent;
			}

			// Updates changed ATTRIBUES
			if (!newEl.isEqualNode(curEl))
				Array.from(newEl.attributes).forEach((attr) =>
					curEl.setAttribute(attr.name, attr.value)
				);
		});
	}

	renderSpinner() {
		const markup = `
            <div class="spinner">
            <svg class="fav__icon">
                <use href="${icons}#pokeball"></use>
            </svg>
                </div>  `;

		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	renderError(message) {
		const markup = `
        <div class="message">
        ${message}
        </div>
        `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	renderMessage() {}

	_clear() {
		this._parentElement.innerHTML = '';
	}

	// pokemon
	generatePokemon(data, hidden = false) {
		const markup = `
        <div class="pokemon">
        <div class="main">
            <div class="pokemon__card">
                <span class="height circle">${data.height}m</span>
                <span class="weight circle">${data.weight}kg</span>
                <span class="header">
                    <span class="number">#${data.id}</span>
                    <img src="${data.img}" alt="${data.name}" class="img" />
                </span>

                <span class="infos">
                    <span class="name">${data.name}</span>
                    <span class="genus">${data.types[0]} pokémon</span>
                    
                    <div class="type">
                    ${this._generateTypes(data.types)}
                    </div>
                </span>

                <div class="abilities">
                    ${this._generateAbilities(data.abilities)}
                </div>
            </div>

            <div class="pokemon__infos">
                <div class="stats">
                ${this._generateStats(
																	data.stats
																)}                                                    
                </div>

                <div class="actions">
                    <button data-hide="true" class="btn btn--details btn-details ">
                        <h4 class="toggle-details" >show details</h4>
                        <svg class="fav__icon">
                            <use data-icon="true" href="${icons}#pokeball"></use>
                        </svg>
                        
                    </button>

                    <button class="btn btn--fav">
                        <svg class="heart">
                            <use  href="${icons}#heart${
			!data.favorite ? '-fill' : ''
		}"></use>
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <div class="details ${hidden ? 'hidden' : ''} ">
            <div class="evolutions">
                <div class="title">
                    <h3>evolutions :</h3>
                </div>

                <div class="container">
                  ${this._generateEvolution(data.evolutionDetails)}
                </div>
            </div>

            <div class="moves">
                <div class="title">
                    <h3>moves :</h3>
                </div>
                <div class="container">
                    ${this._generateMoves(data.moves)}
                   
                </div>
            </div>
            <div class="strong">
                <div class="title">
                    <h3>Strong against :</h3>
                </div>
                <div class="container">
                ${this._generateTypes(data.strongAgainst)}
                </div>
            </div>
            <div class="weak">
                <div class="title">
                    <h3>weak against :</h3>
                </div>
                <div class="container">
                   ${this._generateTypes(data.weakAgainst)}
                </div>
            </div>
        </div>
    </div>
        `;

		return markup;
	}

	_generateTypes(types) {
		return types
			.map((type) => {
				return `<span class="type badge badge--${type}">${type}</span>`;
			})
			.join('');
	}

	_generateAbilities(abilities) {
		return abilities
			.map((ability) => {
				return `<p>${ability} </p>`;
			})
			.join('');
	}

	_generateStats(stats) {
		const generateClass = function (value) {
			let className = '';
			if (value < 250) {
				className = 'epic';
			}
			if (value < 150) {
				className = 'high';
			}
			if (value < 100) {
				className = 'medium';
			}
			if (value < 50) {
				className = 'low';
			}

			return className;
		};

		return stats
			.map((stat) => {
				return `<div class="stat">
                <p class="title">${stat.statName}</p>
                <p class="number">${stat.statValue}</p>
                <div class="bar bar-total">
                    <div class="bar bar-stat ${generateClass(
																					stat.statValue
																				)}" style="width: ${stat.statValue}px"></div>
                </div>
            </div>
                `;
			})
			.join('');

		// <div class="stat">
		//     <p class="title">attack</p>
		//     <p class="number">85</p>
		//     <div class="bar bar-total">
		//         <div class="bar bar-stat high" style="width: 85px"></div>
		//     </div>
		// </div>
	}
	_generateMoves(moves) {
		return moves
			.map((move) => {
				return `<p>${move} </p>`;
			})
			.join('');
	}

	_generateEvolution(evolutionDetails) {
		return evolutionDetails.map((evolution) => {
			return `   <div class="evolution">
                <div class="img">
                    <img src="${evolution.img}" alt="${evolution.name}" />
                </div>
                <span class="number"># ${evolution.id}</span>
                <span class="name">${evolution.name}</span>
                <div class="types">
                ${this._generateTypes(evolution.type)}
                </div>
        
                <button data-name="${
																	evolution.name
																}" class="btn btn--details btn-visit">
                    visit
                    <svg class="fav__icon">
                        <use href="${icons}#pokeball"></use>
                    </svg>
                </button>
            </div>
               
           
         
                `;
		}).join(`   <div class="arrow">
            <svg class="fav__icon">
                <use href="${icons}#right-arrow"></use>
            </svg>
        </div>`);
	}
}
