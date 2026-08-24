/* Arise Paris — accessibility helpers: focus visibility + drawer focus trap support */
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {
		document.body.classList.add('js-enabled');

		// Announce dynamic updates through a shared live region.
		if (!document.getElementById('arise-live-region')) {
			var region = document.createElement('div');
			region.id = 'arise-live-region';
			region.className = 'screen-reader-text';
			region.setAttribute('aria-live', 'polite');
			document.body.appendChild(region);
		}

		window.ariseAnnounce = function (message) {
			var region = document.getElementById('arise-live-region');
			if (region) {
				region.textContent = message;
			}
		};

		// Keep focus inside an open modal drawer.
		document.addEventListener('keydown', function (event) {
			if ('Tab' !== event.key) {
				return;
			}
			var drawer = document.querySelector('.enquiry-list-drawer:not([hidden])');
			if (!drawer) {
				return;
			}
			var focusables = drawer.querySelectorAll('a[href], button:not([disabled]), input, select, textarea');
			if (!focusables.length) {
				return;
			}
			var first = focusables[0];
			var last = focusables[focusables.length - 1];
			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		});
	});
})();
