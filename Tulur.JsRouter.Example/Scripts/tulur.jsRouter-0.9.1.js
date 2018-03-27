function Router() {

	var routes = [];
	var notFoudErrorHandler;
	var _this = this;

	function getQueryParameter(name, query) {
		var pairs = query.split('&');
		name = name.toLocaleLowerCase();

		for (var i = 0; i < pairs.length; i++) {
			var param = pairs[i].split('=');
			if (param[0].toLocaleLowerCase() === name) {
				return decodeURIComponent(param[1]).split('+').join(' ');
			}
		}

		return null;
	};

	function runRoute(handler, query) {
		var args = handler.toString()
			.replace(/((\/\/.*$)|(\/\*[\s\S]*?\*\/)|(\s))/mg, '')
			.match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m)[1]
			.split(/,/);

		var values = [];

		for (var i = 0; i < args.length; i++) {
			if (args[i]) {
				values.push(getQueryParameter(args[i], query));
			}
		}

		handler.apply(document, values); // TODO: "document" will be "this" object inside handler "apply", maybe will be better use custom object with helpfull info
	}

	function normalizeUrl(url) {
		url = url.trim().toLowerCase();
		if ((url !== '/') && (url[url.length - 1] === '/')) {
			console.warn('Performance recommendation: remove last symbol "/" from "' + url + '", if it is possible');
			url = url.slice(0, -1);
		}

		return url;
	}

	this.map = function (url, handler) {
		routes.push({ url: normalizeUrl(url), handler: handler });
	};

	this.go = function (url) {

		var parts = url.split('?');
		var relativeUrl = normalizeUrl(parts[0]);
		var query = parts[1];

		for (var i = 0; i < routes.length; i++) {
			var route = routes[i];
			if (route.url === relativeUrl) {
				history.pushState(null, null, url);
				runRoute(route.handler, query);
				return;
			}
		}

		if (notFoudErrorHandler) {
			notFoudErrorHandler.call(this, url);
		}
	}

	this.notFound = function (handler) {
		notFoudErrorHandler = handler;
	}

	this.restore = function () {
		this.go(document.location.pathname + document.location.search);
	}

	document.addEventListener('click', function (e) {
		var url = e.target.getAttribute('href');
		if (url) {
			e.preventDefault();
			_this.go(url);
		}
	});
};