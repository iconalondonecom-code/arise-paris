/* Arise Paris — client-side form validation (server-side validation always re-checks) */
(function () {
	'use strict';

	document.addEventListener('DOMContentLoaded', function () {
		var strings = window.AriseParisForms || {};
		var forms = document.querySelectorAll('[data-arise-form]');

		Array.prototype.forEach.call(forms, function (form) {
			var errorBox = form.querySelector('[data-form-errors]');

			form.addEventListener('submit', function (event) {
				var errors = [];

				Array.prototype.forEach.call(form.querySelectorAll('[required]'), function (field) {
					var value = (field.value || '').trim();
					var label = form.querySelector('label[for="' + field.id + '"]');
					var name = label ? label.textContent.replace('*', '').trim() : field.name;

					if (!value || ('checkbox' === field.type && !field.checked)) {
						errors.push(name + ': ' + (strings.requiredMessage || 'This field is required.'));
						field.setAttribute('aria-invalid', 'true');
					} else if ('email' === field.type && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
						errors.push(name + ': ' + (strings.invalidEmail || 'Please enter a valid email address.'));
						field.setAttribute('aria-invalid', 'true');
					} else {
						field.removeAttribute('aria-invalid');
					}
				});

				if (errors.length) {
					event.preventDefault();
					if (errorBox) {
						errorBox.hidden = false;
						errorBox.innerHTML = '<ul>' + errors.map(function (error) {
							var item = document.createElement('li');
							item.textContent = error;
							return item.outerHTML;
						}).join('') + '</ul>';
						errorBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
					}
					var firstInvalid = form.querySelector('[aria-invalid="true"]');
					if (firstInvalid) {
						firstInvalid.focus();
					}
					return;
				}

				if (errorBox) {
					errorBox.hidden = true;
					errorBox.innerHTML = '';
				}

				var submit = form.querySelector('[data-form-submit]');
				if (submit) {
					submit.setAttribute('disabled', 'disabled');
					window.setTimeout(function () {
						submit.removeAttribute('disabled');
					}, 6000);
				}
			});
		});
	});
})();
