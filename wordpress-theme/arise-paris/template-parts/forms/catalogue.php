<?php
defined( 'ABSPATH' ) || exit;
?>
<form class="arise-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" data-arise-form novalidate>
	<input type="hidden" name="action" value="arise_catalogue" />
	<?php wp_nonce_field( 'arise_catalogue', 'arise_catalogue_nonce' ); ?>
	<p class="hp-field" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off" /></label></p>
	<div class="form-row"><label for="cat-name"><?php esc_html_e( 'Name', 'arise-paris' ); ?> <span class="required">*</span></label><input type="text" id="cat-name" name="name" required aria-required="true" /></div>
	<div class="form-row"><label for="cat-email"><?php esc_html_e( 'Email', 'arise-paris' ); ?> <span class="required">*</span></label><input type="email" id="cat-email" name="email" required aria-required="true" /></div>
	<div class="form-row"><label for="cat-company"><?php esc_html_e( 'Company', 'arise-paris' ); ?></label><input type="text" id="cat-company" name="company" /></div>
	<div class="form-row"><label for="cat-country"><?php esc_html_e( 'Country', 'arise-paris' ); ?></label><input type="text" id="cat-country" name="country" /></div>
	<div class="form-errors" role="alert" data-form-errors hidden></div>
	<button type="submit" class="btn btn-primary" data-form-submit><?php esc_html_e( 'Request Catalogue', 'arise-paris' ); ?></button>
</form>
