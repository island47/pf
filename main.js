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
	scrollIntoView(link);
});

//  handle click on "contact me" button on home
const homeContactBtn = document.querySelector('.home__contact');
homeContactBtn.addEventListener('click', e => {
	scrollIntoView('#contact');
});

// handle home when scrolling to transparent
const home = document.querySelector('.home__container');
const homeHeight = home.scrollHeight;
document.addEventListener('scroll', () => {
	home.style.opacity = 1 - window.scrollY / homeHeight;
});

//  show arrow up btn
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
	if (window.scrollY > homeHeight / 2) {
		arrowUp.classList.add('visible');
	} else {
		arrowUp.classList.remove('visible');
	}
});

// handle click on the arrow up btn
arrowUp.addEventListener('click', () => {
	scrollIntoView('#home');
});

// function scrollIntoView
function scrollIntoView(selector) {
	document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
}
