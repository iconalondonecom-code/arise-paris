/* Arise Paris — Colour Journey hero + Product Explorer + archive filtering (vanilla JS) */
(function () {
	'use strict';

	var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

	function initColourJourney() {
		var root = document.querySelector('[data-colour-journey]');
		if (!root) {
			return;
		}

		var bottles = Array.prototype.slice.call(root.querySelectorAll('[data-journey-bottle]'));
		if (!bottles.length) {
			return;
		}

		var background = root.querySelector('[data-journey-background]');
		var dots = Array.prototype.slice.call(root.querySelectorAll('[data-journey-dot]'));
		var title = root.querySelector('[data-journey-title]');
		var description = root.querySelector('[data-journey-description]');
		var view = root.querySelector('[data-journey-view]');
		var add = root.querySelector('[data-journey-add]');
		var indicator = root.querySelector('[data-journey-indicator]');
		var prev = root.querySelector('[data-journey-prev]');
		var next = root.querySelector('[data-journey-next]');
		var current = 0;
		var timer = null;

		function select(index) {
			current = (index + bottles.length) % bottles.length;
			var bottle = bottles[current];

			bottles.forEach(function (item, i) {
				item.classList.toggle('is-active', i === current);
				item.setAttribute('aria-pressed', i === current ? 'true' : 'false');
			});
			dots.forEach(function (dot, i) {
				dot.classList.toggle('is-active', i === current);
				dot.setAttribute('aria-selected', i === current ? 'true' : 'false');
			});

			if (background) {
				background.style.setProperty('--journey-glow', bottle.getAttribute('data-glow'));
				background.style.setProperty('--journey-mid', bottle.getAttribute('data-mid'));
				background.style.setProperty('--journey-deep', bottle.getAttribute('data-deep'));
			}
			if (indicator) {
				indicator.style.setProperty('--journey-glow', bottle.getAttribute('data-glow'));
			}
			if (title) {
				title.textContent = bottle.getAttribute('data-name') || '';
			}
			if (description) {
				description.textContent = bottle.getAttribute('data-description') || '';
			}
			if (view) {
				view.setAttribute('href', bottle.getAttribute('data-url') || '#');
				view.textContent = 'View ' + (bottle.getAttribute('data-name') || 'Product');
			}
			if (add) {
				add.setAttribute('data-product-name', bottle.getAttribute('data-name') || '');
				add.setAttribute('data-product-url', bottle.getAttribute('data-url') || '');
				var image = bottle.querySelector('img');
				add.setAttribute('data-product-image', image ? image.getAttribute('src') : '');
				add.setAttribute('data-product-id', bottle.getAttribute('data-slug') || '');
			}
		}

		function stop() {
			if (timer) {
				window.clearInterval(timer);
				timer = null;
			}
		}

		function start() {
			if (reduceMotion) {
				return;
			}
			stop();
			timer = window.setInterval(function () {
				select(current + 1);
			}, 5200);
		}

		bottles.forEach(function (bottle, index) {
			bottle.addEventListener('click', function () {
				select(index);
				stop();
			});
		});
		dots.forEach(function (dot, index) {
			dot.addEventListener('click', function () {
				select(index);
				stop();
			});
		});
		if (prev) {
			prev.addEventListener('click', function () {
				select(current - 1);
				stop();
			});
		}
		if (next) {
			next.addEventListener('click', function () {
				select(current + 1);
				stop();
			});
		}

		root.addEventListener('keydown', function (event) {
			if ('ArrowLeft' === event.key) {
				select(current - 1);
				stop();
			} else if ('ArrowRight' === event.key) {
				select(current + 1);
				stop();
			}
		});

		// Touch swipe.
		var startX = null;
		root.addEventListener('touchstart', function (event) {
			startX = event.touches[0].clientX;
		}, { passive: true });
		root.addEventListener('touchend', function (event) {
			if (null === startX) {
				return;
			}
			var delta = event.changedTouches[0].clientX - startX;
			if (Math.abs(delta) > 40) {
				select(delta < 0 ? current + 1 : current - 1);
				stop();
			}
			startX = null;
		});

		root.addEventListener('mouseenter', stop);
		root.addEventListener('mouseleave', start);

		select(0);
		start();
	}

	function initExplorer() {
		var root = document.querySelector('[data-product-explorer]');
		if (!root) {
			return;
		}

		var thumbs = Array.prototype.slice.call(root.querySelectorAll('[data-explorer-thumb]'));
		var images = Array.prototype.slice.call(root.querySelectorAll('[data-explorer-image]'));
		var title = root.querySelector('[data-explorer-title]');
		var description = root.querySelector('[data-explorer-description]');
		var view = root.querySelector('[data-explorer-view]');
		var add = root.querySelector('[data-explorer-add]');
		var whatsapp = root.querySelector('[data-explorer-whatsapp]');

		if (!thumbs.length) {
			return;
		}

		function select(index) {
			thumbs.forEach(function (thumb, i) {
				thumb.classList.toggle('is-active', i === index);
				thumb.setAttribute('aria-selected', i === index ? 'true' : 'false');
			});
			images.forEach(function (image, i) {
				image.classList.toggle('is-active', i === index);
			});

			var thumb = thumbs[index];
			var name = thumb.getAttribute('data-name') || '';
			if (title) {
				title.textContent = name;
			}
			if (description) {
				description.textContent = thumb.getAttribute('data-description') || '';
			}
			if (view) {
				view.setAttribute('href', thumb.getAttribute('data-url') || '#');
			}
			if (add) {
				add.setAttribute('data-product-id', thumb.getAttribute('data-product-id') || '');
				add.setAttribute('data-product-name', name);
				add.setAttribute('data-product-url', thumb.getAttribute('data-url') || '');
				add.setAttribute('data-product-image', thumb.getAttribute('data-product-image') || '');
			}
			if (whatsapp && window.AriseParisData) {
				var base = (window.AriseParisData.whatsappUae || '').split('?')[0];
				var message = 'Hello, I would like to enquire about the Arise Paris ' + name + ' deodorant body spray (250 ml) for B2B distribution.';
				if (base) {
					whatsapp.setAttribute('href', base + '?text=' + encodeURIComponent(message));
				}
			}

			thumb.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', inline: 'center', block: 'nearest' });
		}

		thumbs.forEach(function (thumb, index) {
			thumb.addEventListener('click', function () {
				select(index);
			});
		});

		select(0);
	}

	function initArchiveFilters() {
		var filters = document.querySelector('[data-products-filters]');
		var grid = document.querySelector('[data-products-grid]');
		if (!filters || !grid) {
			return;
		}

		var tabs = Array.prototype.slice.call(filters.querySelectorAll('[data-product-filter]'));
		var cards = Array.prototype.slice.call(grid.querySelectorAll('[data-product-card]'));
		var count = filters.querySelector('[data-products-count]');
		var clear = filters.querySelector('[data-products-clear]');
		var search = filters.querySelector('[data-product-search]');
		var empty = grid.querySelector('[data-products-empty]');
		var activeFilter = 'all';

		function slugify(value) {
			return (value || '').toLowerCase().replace(/&/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
		}

		function apply() {
			var query = search && search.value ? search.value.toLowerCase().trim() : '';
			var visible = 0;

			cards.forEach(function (card) {
				var collection = slugify(card.getAttribute('data-collection'));
				var name = (card.getAttribute('data-name') || '').toLowerCase();
				var matchFilter = 'all' === activeFilter || collection === activeFilter;
				var matchQuery = !query || name.indexOf(query) !== -1;
				var show = matchFilter && matchQuery;
				card.hidden = !show;
				if (show) {
					visible += 1;
				}
			});

			if (count) {
				count.textContent = visible + (1 === visible ? ' product' : ' products');
			}
			if (empty) {
				empty.hidden = visible > 0;
			}
		}

		tabs.forEach(function (tab) {
			tab.addEventListener('click', function () {
				activeFilter = tab.getAttribute('data-product-filter');
				tabs.forEach(function (item) {
					var isActive = item === tab;
					item.classList.toggle('is-active', isActive);
					item.setAttribute('aria-selected', isActive ? 'true' : 'false');
				});
				apply();
			});
		});

		if (search) {
			search.addEventListener('input', apply);
			search.form.addEventListener('submit', function (event) {
				event.preventDefault();
				apply();
			});
		}

		if (clear) {
			clear.addEventListener('click', function () {
				activeFilter = 'all';
				if (search) {
					search.value = '';
				}
				tabs.forEach(function (item, i) {
					item.classList.toggle('is-active', 0 === i);
					item.setAttribute('aria-selected', 0 === i ? 'true' : 'false');
				});
				apply();
			});
		}

		apply();
	}

	document.addEventListener('DOMContentLoaded', function () {
		initColourJourney();
		initExplorer();
		initArchiveFilters();
	});
})();
