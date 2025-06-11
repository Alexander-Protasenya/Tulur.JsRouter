## Tulur.JsRouter
Lightweight JavaScript router for implementing “client side” part of [SPA](https://en.wikipedia.org/wiki/Single-page_application). This library can be useful if you don’t want to use complex client frameworks, like [Angular](https://angular.io/), [React](https://reactjs.org/), [Vue](https://vuejs.org/) or other.

### Features
1.	Tulur.JsRouter does not have dependencies on any components. Implementation is based on native JavaScript only (ECMAScript 2019).
2.	This implementation without JavaScript functions setTimeout/setInterval. Using of these functions increases response time and creates extra loading in browser. So, current implementation does not use them.
3.	Address of routing does not require hash (#) symbol. You can use a relative route which you want.
4.	Supports restoring of current page. If you click “Refresh” (F5) in your browser or you write URL address manually, the system restores current page.
5.	Supports named request parameters. For example, if you use an address like `/my?a=1&b=2` you can use JS handler like a `function (a, b) { … }` for processing this address. It is important point for me as a developer. I have several similar projects with single complex objects of arguments, so sometimes it is not clear what exact data my handler-function can use. As a result, the code based on Tulur.JsRouter should be easier for review/understanding.
6.	Supports dynamic routes. You have a possibility to define routes in different JS files, also you have a possibility to add new routes dynamically (at any time).
7.	Supports “not found” error handling.
8.	Supports browser history.
9.	Minimal size: 1 kb approx. for a compact version.

### Usage

Simple and complete example of using:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>Tulur.JsRouter example</title>
    <script src="/Scripts/tulur.jsRouter-0.9.2.js"></script>
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
        var router = new Router();

        router.mapUrl('/', function () {
            document.getElementById('content').innerHTML = 'Home';
        });

        router.mapUrl('/link1', function () {
            document.getElementById('content').innerHTML = 'Link 1';
        });

        router.mapUrl('/link2', function (id, name) {
            document.getElementById('content').innerHTML = 'Link 2: id=' + id + ', name=' + name;
        });

        router.notFoundUrl(function (url) {
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
At the beginning I tried to find ready component with all features which were described before. I did not find anything like this. As a result I decided to implement this component by myself. Also I had time and I wanted to get experience of implementing "client side" routing component.

### Similar projects
[https://github.com/chip-js/routes-js](https://github.com/chip-js/routes-js)

[https://github.com/millermedeiros/crossroads.js](https://github.com/millermedeiros/crossroads.js)

[https://github.com/krasimir/navigo](https://github.com/krasimir/navigo)

[https://github.com/flatiron/director](https://github.com/flatiron/director)

[https://github.com/riot/route](https://github.com/riot/route)

[https://github.com/Rabrennie/best-route](https://github.com/Rabrennie/best-route)
