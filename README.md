## Tulur.JsRouter
Lightweight JavaScript router for implementation “client side” part of [SPA](https://en.wikipedia.org/wiki/Single-page_application). This library can be useful if you don’t want to use complex client frameworks, like [Angular](https://angular.io/), [React](https://reactjs.org/), [Vue](https://vuejs.org/) or other.

### Features
1.	Tulur.JsRouter does not have dependencies on any components. Implementation based on native JavaScript only (ECMAScript 5).
2.	This implementation without JavaScript functions setTimeout/setInterval. Using these functions should increase response time and should create extra loading in browser. So, current implementation NOT used them.
3.	Address of routing not require hash (#) symbol. You can use relative route which you want.
4.	Support restoring current page. If you click “Refresh” (F5) in your browser or you write Url address manually, system restore current page. Warning: for correct working, your “server side” should support this feature too.
5.	Support named request parameters. For example, if you use address like `/my?a=1&b=2` you can use JS handler like `function (a, b) { … }` for processing this address. It is important point for me as developer. I faced several similar projects with one complex object of arguments, sometimes it is not clear what exact arguments my handler-function can use. As a result, code based on Tulur.JsRouter should be easier for review/understanding.
6.	Support dynamic routes. You have possibility to define routes in different JS files, also you have possibility to add new routes dynamically (at any time).
7.	Support “not found” error handling.
8.	Support browser history.
9.	Minimal size: 1 kb approx. for compact version.

### Usage
Here is a simple and complete example of using:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Tulur.JsRouter example</title>
    <script src="/Scripts/tulur.jsRouter-0.9.1.js"></script>
</head>
<body>
    <h1>
        Tulur.JsRouter example
    </h1>
    <hr />
    <div class="container">
        <h3>Menu</h3>
        <p><a href="/link1/">Link 1</a></p>
        <p><a href="/link2?name=John&id=2">Link 2 (name=John, id=2)</a></p>
    </div>
    <div class="container">
        <h3>Content</h3>
        <div id="content"></div>
    </div>
    <script>
        var router = new Router(); // Initialization

        router.map('/', function () {
            document.getElementById('content').innerHTML = 'Home';
        });

        router.map('/link1', function () {
            document.getElementById('content').innerHTML = 'Link 1';
        });

        router.map('/link2', function (id, name) {
            document.getElementById('content').innerHTML = 'Link 2: id=' + id + ', name=' + name;
        });

        router.notFound(function (url) {
            alert('Page "' + url + '" not found');
        });

        router.restore(); // Run processing of routes
    </script>
    <style>
        .container {
            float: left;
            padding: 0 20px;
        }
    </style>
</body>
</html>
```

### Remarks
1.	Tulur.JsRouter **NOT** support parameters like this: `/{Param1}/{Param2}/`. System can analyze only ordinary request parameters (after “?” symbol). Maybe this feature will be implemented in future.
2.	Example project based on ASP.NET MVC 5. But if you use another "server side" technology, you can take only 2 files: “Tulur.JsRouter.js” & “Index.html”. Example will **NOT** work if you open “Index.html” in your browser without any "server side".

### Motivation
At the beginning I tried to find ready component with features which described before. I did not find something like this. As a result I decided implement this component by myself. Also I had time and I wanted to get experience of implementing "client side" routing component.

### Donation
If my project help you, you can support my motivation to continue working on this project :-)

Webmoney: Z410376614329 or R181376873839

Yandex.Money: 410012007533568

Ethereum: 0xFcaD676Dc74ea60c2fF9fb623ff7903AC898a32d

### Similar projects
[https://github.com/chip-js/routes-js](https://github.com/chip-js/routes-js)

[https://github.com/millermedeiros/crossroads.js](https://github.com/millermedeiros/crossroads.js)

[https://github.com/krasimir/navigo](https://github.com/krasimir/navigo)

[https://github.com/flatiron/director](https://github.com/flatiron/director)

[https://github.com/riot/route](https://github.com/riot/route)

[https://github.com/Rabrennie/best-route](https://github.com/Rabrennie/best-route)
