/* Arise Paris — Enquiry List (localStorage powered, no e-commerce, no prices) */
(function () {
	'use strict';

	var STORAGE_KEY = 'arise_paris_enquiry_list';

	function read() {
		try {
			var raw = window.localStorage.getItem(STORAGE_KEY);
			var parsed = raw ? JSON.parse(raw) : [];
			return Array.isArray(parsed) ? parsed : [];
		} catch (error) {
			return [];
		}
	}

	function write(items) {
		try {
			window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
		} catch (error) {
			/* storage unavailable — list stays in memory for this page view */
		}
	}

	function announce(message) {
		if (window.ariseAnnounce) {
			window.ariseAnnounce(message);
		}
	}

	document.addEventListener('DOMContentLoaded', function () {
		var items = read();

		var counts = document.querySelectorAll('[data-enquiry-count]');
		var drawer = document.getElementById('enquiry-list-drawer');
		var list = document.querySelector('[data-enquiry-items]');
		var emptyMessage = document.querySelector('[data-enquiry-empty]');
		var toggle = document.querySelector('.enquiry-list-toggle');
		var close = document.querySelector('.enquiry-list-close');
		var clear = document.querySelector('[data-enquiry-clear]');
		var selectedItems = document.querySelector('[data-enquiry-selected-items]');
		var selectedEmpty = document.querySelector('[data-enquiry-selected-empty]');
		var productsField = document.querySelector('[data-enquiry-products-field]');
		var whatsappSend = document.querySelector('[data-enquiry-whatsapp-send]');

		function whatsappHref() {
			if (!window.AriseParisData) {
				return '#';
			}
			var base = (window.AriseParisData.whatsappUae || '').split('?')[0];
			var message = items.length
				? 'Hello, I would like to enquire about the following Arise Paris deodorant body sprays (250 ml) for B2B distribution:\n' +
					items.map(function (item) { return '• ' + item.name; }).join('\n')
				: (window.AriseParisData.whatsappMessage || '');
			return base ? base + '?text=' + encodeURIComponent(message) : '#';
		}

		function render() {
			counts.forEach ? counts.forEach(update) : Array.prototype.forEach.call(counts, update);
			function update(node) {
				node.textContent = String(items.length);
			}

			if (toggle) {
				toggle.setAttribute('aria-label', 'Open enquiry list (' + items.length + ' products)');
			}

			if (list) {
				list.innerHTML = '';
				items.forEach(function (item) {
					var li = document.createElement('li');

					if (item.image) {
						var img = document.createElement('img');
						img.src = item.image;
						img.alt = item.name;
						li.appendChild(img);
					}

					var link = document.createElement('a');
					link.href = item.url || '#';
					link.textContent = item.name;
					li.appendChild(link);

					var remove = document.createElement('button');
					remove.type = 'button';
					remove.setAttribute('aria-label', 'Remove ' + item.name + ' from enquiry list');
					remove.innerHTML = '&times;';
					remove.addEventListener('click', function () {
						items = items.filter(function (entry) { return entry.id !== item.id; });
						write(items);
						render();
						announce(item.name + ' removed from your enquiry list');
					});
					li.appendChild(remove);

					list.appendChild(li);
				});
			}

			if (emptyMessage) {
				emptyMessage.hidden = items.length > 0;
			}

			if (selectedItems) {
				selectedItems.innerHTML = '';
				items.forEach(function (item) {
					var li = document.createElement('li');
					li.textContent = item.name + ' — Deodorant Body Spray, 250 ml';
					selectedItems.appendChild(li);
				});
			}
			if (selectedEmpty) {
				selectedEmpty.hidden = items.length > 0;
			}
			if (productsField) {
				productsField.value = items.map(function (item) { return item.name; }).join(', ');
			}
			if (whatsappSend) {
				whatsappSend.setAttribute('href', whatsappHref());
			}

			document.querySelectorAll('[data-enquiry-add], [data-journey-add], [data-explorer-add]').forEach(function (button) {
				var id = button.getAttribute('data-product-id');
				var inList = items.some(function (item) { return String(item.id) === String(id); });
				button.setAttribute('aria-pressed', inList ? 'true' : 'false');
				button.textContent = inList ? 'Added to Enquiry' : 'Add to Enquiry';
			});
		}

		function openDrawer() {
			if (!drawer) {
				return;
			}
			drawer.hidden = false;
			var focusable = drawer.querySelector('button, a');
			if (focusable) {
				focusable.focus();
			}
		}

		function closeDrawer() {
			if (drawer) {
				drawer.hidden = true;
			}
			if (toggle) {
				toggle.focus();
			}
		}

		document.addEventListener('click', function (event) {
			var button = event.target.closest('[data-enquiry-add], [data-journey-add], [data-explorer-add]');
			if (!button) {
				return;
			}
			event.preventDefault();

			var id = button.getAttribute('data-product-id');
			var name = button.getAttribute('data-product-name');
			if (!id && !name) {
				return;
			}

			var exists = items.some(function (item) { return String(item.id) === String(id); });
			if (exists) {
				items = items.filter(function (item) { return String(item.id) !== String(id); });
				announce(name + ' removed from your enquiry list');
			} else {
				items.push({
					id: id,
					name: name,
					url: button.getAttribute('data-product-url') || '',
					image: button.getAttribute('data-product-image') || ''
				});
				announce(name + ' added to your enquiry list');
			}

			write(items);
			render();
		});

		if (toggle) {
			toggle.addEventListener('click', openDrawer);
		}
		if (close) {
			close.addEventListener('click', closeDrawer);
		}
		if (drawer) {
			drawer.addEventListener('click', function (event) {
				if (event.target === drawer) {
					closeDrawer();
				}
			});
		}
		document.addEventListener('keydown', function (event) {
			if ('Escape' === event.key && drawer && !drawer.hidden) {
				closeDrawer();
			}
		});
		if (clear) {
			clear.addEventListener('click', function () {
				items = [];
				write(items);
				render();
				announce('Enquiry list cleared');
			});
		}

		window.addEventListener('storage', function (event) {
			if (STORAGE_KEY === event.key) {
				items = read();
				render();
			}
		});

		render();
	});
})();
