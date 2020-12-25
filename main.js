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
	navbarMenu.classList.remove('open');
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

// navbar toggle btn
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
	navbarMenu.classList.toggle('open');
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

// work
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

workBtnContainer.addEventListener('click', e => {
	const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
	if (filter == null) {
		return;
	}
	// work btn event to selected
	const active = document.querySelector('.category__btn.selected');
	active.classList.remove('selected');
	const target = e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
	target.classList.add('selected');

	projectContainer.classList.add('anim-out');
	setTimeout(() => {
		projects.forEach(project => {
			if (filter === '*' || filter === project.dataset.type) {
				project.classList.remove('invisible');
			} else {
				project.classList.add('invisible');
			}
		});
		projectContainer.classList.remove('anim-out');
	}, 300);
});

// function scrollIntoView
function scrollIntoView(selector) {
	document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
}
