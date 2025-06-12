# Tulur.JsRouter
Lightweight JavaScript router for implementing "client side" part of [SPA](https://en.wikipedia.org/wiki/Single-page_application). This library can be useful if you don’t want to use complex client frameworks, like [Angular](https://angular.io/), [React](https://reactjs.org/), [Vue](https://vuejs.org/) or other.

## Features
* Tulur.JsRouter is "zero dependencies" library. Implementation is based on native JavaScript only (ECMAScript 2020).
* This implementation without JavaScript functions setTimeout/setInterval. Using of these functions increases response time and creates extra loading in browser. So, current implementation does not use them.
* Address of routing does not require hash (#) symbol. You can use a relative route which you want.
* Supports restoring of current page. If you click "Refresh" (F5) in your browser or you write URL address manually, the system restores current page.
* Supports named request parameters. For example, if you use an address like `/my?a=1&b=2` you can use JS handler like a `function (a, b) { … }` for processing this address. It is important point for me as a developer. I have several similar projects with single complex objects of arguments, so sometimes it is not clear what exact data my handler-function can use. As a result, the code based on Tulur.JsRouter should be easier for review/understanding.
* Supports dynamic routes. You have a possibility to define routes in different JS files, also you have a possibility to add new routes dynamically (at any time).
* Supports "not found" error handling.
* Supports browser history.
* Supports custom scope. You can define object, which will be "this" for all handlers.
* Minimal size: 1.2 kb approx. for a compact version.

## Usage

### Simple example

```JS

const router = new Router();

// Map your route
router.mapUrl('/some-route', (id, name) => {
  // Any action
  document.getElementById('content').innerHTML = `id=${id}, name=${name}`;
});

...

// For restoring current route, if you click F5 for example
router.restore();
```

Ordinary link in markup:
```html
<div>
  <a href="/some-route?id=123&name=abc">Click me</a>
</div>
<div id="content"></div>
```

if you click this link, you will see following:
```
id=123, name=abc
```

More examples in **index.mjs**

## Quick start
1. Install packages (all these packages only for development mode - "devDependencies")

```sh
npm install
```

2. Start server

```sh
npm run demostart
```

3. Open http://localhost:3000/ in your browser

if you need build library only

```sh
npm run build
```

## Remarks
1.	Tulur.JsRouter **NOT** support parameters like this: `/{Param1}/{Param2}/`. System can analyze only ordinary request parameters (after "?" symbol). Maybe this feature will be implemented in future.
2.	Example project based on ASP.NET MVC 5. But if you use another "server side" technology, you can take only 2 files: "Tulur.JsRouter.js" & "Index.html". Example will **NOT** work if you open "Index.html" in your browser without any "server side".

## Motivation
At the beginning I tried to find ready component with all features which were described before. I did not find anything like this. As a result I decided to implement this component by myself. Also I had time and I wanted to get experience of implementing "client side" routing component.

## Similar projects
[https://github.com/chip-js/routes-js](https://github.com/chip-js/routes-js)

[https://github.com/millermedeiros/crossroads.js](https://github.com/millermedeiros/crossroads.js)

[https://github.com/krasimir/navigo](https://github.com/krasimir/navigo)

[https://github.com/flatiron/director](https://github.com/flatiron/director)

[https://github.com/riot/route](https://github.com/riot/route)

[https://github.com/Rabrennie/best-route](https://github.com/Rabrennie/best-route)
