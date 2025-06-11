import { Router } from './src/tulur.jsRouter.mjs';

const router = new Router();

router.mapUrl('/', () => {
	document.getElementById('content').innerHTML = 'Home';
});

router.mapUrl('/link1', () => {
	document.getElementById('content').innerHTML = 'Link 1';
});

router.mapUrl('/link2', (id, name) => {
	document.getElementById('content').innerHTML = 'Link 2: id=' + id + ', name=' + name;
});

router.mapUrl('/Section1/SECTION2/section3/Section4/link3', (a, b) => {
	document.getElementById('content').innerHTML = 'Link 3: a=' + a + ', b=' + b;
});

router.mapUrl('/link4', () => {
	router.redirect('/Section1/SECTION2/section3/Section4/link3?b=Hello+%26+world');
});

router.mapNotFoundUrl(url => {
	alert('Page "' + url + '" not found');
});

router.restore();