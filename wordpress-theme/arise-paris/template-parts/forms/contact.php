<?php
defined( 'ABSPATH' ) || exit;
?>
<form class="arise-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" data-arise-form novalidate>
	<input type="hidden" name="action" value="arise_contact" />
	<?php wp_nonce_field( 'arise_contact', 'arise_contact_nonce' ); ?>
	<p class="hp-field" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off" /></label></p>

	<div class="form-row">
		<label for="contact-name"><?php esc_html_e( 'Name', 'arise-paris' ); ?> <span class="required" aria-hidden="true">*</span></label>
		<input type="text" id="contact-name" name="name" required aria-required="true" />
	</div>
	<div class="form-row">
		<label for="contact-email"><?php esc_html_e( 'Email', 'arise-paris' ); ?> <span class="required" aria-hidden="true">*</span></label>
		<input type="email" id="contact-email" name="email" required aria-required="true" />
	</div>
	<div class="form-row">
		<label for="contact-phone"><?php esc_html_e( 'Phone', 'arise-paris' ); ?></label>
		<input type="tel" id="contact-phone" name="phone" />
	</div>
	<div class="form-row">
		<label for="contact-message"><?php esc_html_e( 'Message', 'arise-paris' ); ?> <span class="required" aria-hidden="true">*</span></label>
		<textarea id="contact-message" name="message" rows="5" required aria-required="true"></textarea>
	</div>
	<div class="form-errors" role="alert" data-form-errors hidden></div>
	<button type="submit" class="btn btn-primary" data-form-submit><?php esc_html_e( 'Contact Our Team', 'arise-paris' ); ?></button>
</form>
