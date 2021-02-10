class SearchView {
	_parentElement = document.querySelector('.search');
	_data;

	getQuery() {
		const query = this._parentElement
			.querySelector('.search__field')
			.value.toLowerCase();
		// this._parentElement.querySelector('.search__field').value = '';
		return query;
	}
	addHandlerSearch(handler) {
		this._parentElement.addEventListener('submit', function (e) {
			e.preventDefault();

			handler();
		});
	}
}

export default new SearchView();
