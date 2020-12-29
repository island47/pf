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
	selectNavItem(target);
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

// IntersectionObserver
// 1. 모든 섹션 요소들과 메뉴아이템들을 가지고 온다
// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화시킨다
// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다
const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
const sections = sectionIds.map(id => {
	return document.querySelector(id);
});
const navItems = sectionIds.map(id => {
	return document.querySelector(`[data-link="${id}"]`);
});

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected) {
	selectedNavItem.classList.remove('active');
	selectedNavItem = selected;
	selectedNavItem.classList.add('active');
}

// function scrollIntoView
function scrollIntoView(selector) {
	document.querySelector(selector).scrollIntoView({ behavior: 'smooth' });
	selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
	root: null,
	rootMargin: '0px',
	threshold: 0.3
};
const observerCallback = (entries, observer) => {
	entries.forEach(entry => {
		if (!entry.isIntersecting && entry.intersectionRatio > 0) {
			const index = sectionIds.indexOf(`#${entry.target.id}`);
			if (entry.boundingClientRect.y < 0) {
				selectedNavIndex = index + 1;
			} else {
				selectedNavIndex = index - 1;
			}
		}
	});
};
const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => {
	observer.observe(section);
});

window.addEventListener('wheel', () => {
	if (window.scrollY === 0) {
		selectedNavIndex = 0;
	} else if (Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) {
		selectedNavIndex = navItems.length - 1;
	}
	selectNavItem(navItems[selectedNavIndex]);
});
