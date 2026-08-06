<?php
defined( 'ABSPATH' ) || exit;
$product_name = $args['product_name'] ?? get_the_title();
?>
<form class="arise-form arise-form--product-enquiry" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" data-arise-form novalidate>
	<input type="hidden" name="action" value="arise_product_enquiry" />
	<input type="hidden" name="product_name" value="<?php echo esc_attr( $product_name ); ?>" />
	<?php wp_nonce_field( 'arise_product_enquiry', 'arise_product_enquiry_nonce' ); ?>
	<p class="hp-field" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off" /></label></p>
	<div class="form-row"><label for="pe-name"><?php esc_html_e( 'Name', 'arise-paris' ); ?> <span class="required">*</span></label><input type="text" id="pe-name" name="name" required aria-required="true" /></div>
	<div class="form-row"><label for="pe-email"><?php esc_html_e( 'Email', 'arise-paris' ); ?> <span class="required">*</span></label><input type="email" id="pe-email" name="email" required aria-required="true" /></div>
	<div class="form-row"><label for="pe-message"><?php esc_html_e( 'Message', 'arise-paris' ); ?></label><textarea id="pe-message" name="message" rows="4"><?php
		echo esc_textarea( sprintf( __( 'I am interested in %s for distribution.', 'arise-paris' ), $product_name ) );
	?></textarea></div>
	<div class="form-errors" role="alert" data-form-errors hidden></div>
	<button type="submit" class="btn btn-primary" data-form-submit><?php esc_html_e( 'Add to Enquiry', 'arise-paris' ); ?></button>
</form>
