'use strict';

// set navbar transparent
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.scrollHeight;

document.addEventListener('scroll', () => {
	if (window.scrollY > navbarHeight) {
		navbar.classList.add('navbar-dark');
	} else {
		navbar.classList.remove('navbar-dark');
	}
});

//  handle scrolling when click on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');

navbarMenu.addEventListener('click', e => {
	const target = e.target;
	const link = target.dataset.link;
	if (link == null) {
		return;
	}

	console.log(e.target.dataset.link);
	const scrollTo = document.querySelector(link);
	scrollTo.scrollIntoView({ behavior: 'smooth' });
});
