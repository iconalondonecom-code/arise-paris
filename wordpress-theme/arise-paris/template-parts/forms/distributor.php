<?php
defined( 'ABSPATH' ) || exit;
$products = get_posts( array( 'post_type' => 'arise_product', 'posts_per_page' => -1, 'orderby' => 'title', 'order' => 'ASC' ) );
?>
<form class="arise-form" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" data-arise-form novalidate>
	<input type="hidden" name="action" value="arise_distributor" />
	<?php wp_nonce_field( 'arise_distributor', 'arise_distributor_nonce' ); ?>
	<p class="hp-field" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off" /></label></p>

	<div class="form-row"><label for="dist-name"><?php esc_html_e( 'Contact Name', 'arise-paris' ); ?> <span class="required">*</span></label><input type="text" id="dist-name" name="contact_name" required aria-required="true" /></div>
	<div class="form-row"><label for="dist-email"><?php esc_html_e( 'Email', 'arise-paris' ); ?> <span class="required">*</span></label><input type="email" id="dist-email" name="contact_email" required aria-required="true" /></div>
	<div class="form-row"><label for="dist-phone"><?php esc_html_e( 'Phone', 'arise-paris' ); ?></label><input type="tel" id="dist-phone" name="contact_phone" /></div>
	<div class="form-row"><label for="dist-company"><?php esc_html_e( 'Company Name', 'arise-paris' ); ?> <span class="required">*</span></label><input type="text" id="dist-company" name="company_name" required aria-required="true" /></div>
	<div class="form-row"><label for="dist-type"><?php esc_html_e( 'Business Type', 'arise-paris' ); ?></label>
		<select id="dist-type" name="business_type">
			<option value="distributor"><?php esc_html_e( 'Distributor', 'arise-paris' ); ?></option>
			<option value="wholesaler"><?php esc_html_e( 'Wholesaler', 'arise-paris' ); ?></option>
			<option value="retailer"><?php esc_html_e( 'Retailer', 'arise-paris' ); ?></option>
		</select>
	</div>
	<div class="form-row"><label for="dist-market"><?php esc_html_e( 'Country / Market', 'arise-paris' ); ?></label><input type="text" id="dist-market" name="country_market" /></div>
	<div class="form-row"><label for="dist-volume"><?php esc_html_e( 'Estimated Order Volume', 'arise-paris' ); ?></label><input type="text" id="dist-volume" name="estimated_volume" /></div>
	<fieldset class="form-row">
		<legend><?php esc_html_e( 'Products of Interest', 'arise-paris' ); ?></legend>
		<?php foreach ( $products as $product ) : ?>
			<label class="checkbox-label"><input type="checkbox" name="products_of_interest[]" value="<?php echo esc_attr( $product->post_title ); ?>" /> <?php echo esc_html( $product->post_title ); ?></label>
		<?php endforeach; ?>
	</fieldset>
	<div class="form-row"><label for="dist-message"><?php esc_html_e( 'Message', 'arise-paris' ); ?></label><textarea id="dist-message" name="message" rows="4"></textarea></div>
	<div class="form-errors" role="alert" data-form-errors hidden></div>
	<button type="submit" class="btn btn-primary" data-form-submit><?php esc_html_e( 'Become a Distributor', 'arise-paris' ); ?></button>
</form>
