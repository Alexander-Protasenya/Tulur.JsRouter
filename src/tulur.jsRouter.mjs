export const Router = function () {

	let _scope;
	let _notFoundErrorHandler;
	const _routes = [];

	function runRoute(handler, query) {

		const funcStr = handler.toString();
		const shift = (funcStr.startsWith('function ')) ? 10 : 1; // Common JS function or arrow function
		const argumentNames = funcStr.slice(shift, funcStr.indexOf(')')).split(', ');

		let argumentValues;
		if (query) {
			const urlParams = new URLSearchParams(query);
			const entries = Array.from(urlParams.entries());
			argumentValues = argumentNames.map(x => {
				const key = x.toLowerCase();
				return entries.find(y => key === y[0].toLowerCase())?.[1];
			});
		}

		handler.apply(_scope || document, argumentValues);
	}

	function normalizeUrl(url) {
		let resultUrl = url.trim().toLowerCase();
		if ((resultUrl !== '/') && (resultUrl.slice(-1) === '/')) {
			console.warn(`Performance recommendation: remove last symbol "/" from "${resultUrl}", if it is possible`);
			resultUrl = resultUrl.slice(0, -1);
		}

		return resultUrl;
	}

	/**
	* Map url to function, which should be run when following url will be executed
	* @param {String} url Relative url address for mapping
	* @param {Function} handler Function for executing
	*/
	function mapUrl(url, handler) {
		_routes.push({ url: normalizeUrl(url), handler });
	}

	/**
	* Run function which associated with following url
	* @param {String} url Relative url address
	*/
	function redirect(url) {
		const parts = url.split('?');
		const relativeUrl = normalizeUrl(parts[0]);
		const query = parts[1];

		const route = _routes.find(x => x.url === relativeUrl);
		if (route) {
			history.pushState(null, null, url);
			runRoute(route.handler, query);
			return;
		}

		if (_notFoundErrorHandler) {
			_notFoundErrorHandler.apply(_scope || document, [url]);
		}
	}

	/**
	* Set object which should be use as 'this' object for redirect() function
	* @param {Object} scope Any object
	*/
	function setScope(scope) {
		_scope = scope;
	}

	/**
	* Set function which should be run when not mapped url will be executed
	* @param {Function} handler
	*/
	function mapNotFoundUrl(handler) {
		_notFoundErrorHandler = handler;
	}

	/**
	* Run function which associated with current url
	*/
	function restore() {
		redirect(document.location.pathname + document.location.search);
	}

	document.addEventListener('click', e => {

		if (e.target.tagName !== 'A') {
			return;
		}

		const url = e.target.getAttribute('href');
		if (url) {
			if ((url[0] === '#') || (e.target.host !== window.location.host)) {
				return;
			}

			e.preventDefault();
			redirect(url);
		}
	}, false);

	return {
		mapUrl,
		mapNotFoundUrl,
		redirect,
		setScope,
		restore,
	};
};