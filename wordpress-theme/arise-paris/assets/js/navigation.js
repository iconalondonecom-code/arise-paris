/* Arise Paris — mobile navigation toggle */
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {
		var toggle = document.querySelector('.nav-toggle');
		var nav = document.getElementById('primary-menu');
		if (!toggle || !nav) {
			return;
		}

		function setOpen(open) {
			nav.classList.toggle('is-open', open);
			toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
		}

		toggle.addEventListener('click', function () {
			setOpen(nav.classList.contains('is-open') === false);
		});

		document.addEventListener('keydown', function (event) {
			if ('Escape' === event.key) {
				setOpen(false);
			}
		});

		nav.addEventListener('click', function (event) {
			if (event.target.closest('a')) {
				setOpen(false);
			}
		});

		window.addEventListener('resize', function () {
			if (window.innerWidth > 1024) {
				setOpen(false);
			}
		});
	});
})();
