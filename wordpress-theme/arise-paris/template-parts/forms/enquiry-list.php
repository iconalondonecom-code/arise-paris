<?php
defined( 'ABSPATH' ) || exit;
?>
<form class="arise-form arise-form--enquiry-list" method="post" action="<?php echo esc_url( admin_url( 'admin-post.php' ) ); ?>" data-arise-form data-enquiry-list-form novalidate>
	<input type="hidden" name="action" value="arise_enquiry_list" />
	<input type="hidden" name="products" data-enquiry-products-field value="" />
	<?php wp_nonce_field( 'arise_enquiry_list', 'arise_enquiry_list_nonce' ); ?>
	<p class="hp-field" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off" /></label></p>

	<div class="enquiry-list-selected" data-enquiry-selected>
		<p class="enquiry-list-selected__empty" data-enquiry-selected-empty><?php esc_html_e( 'Your enquiry list is empty. Add products first.', 'arise-paris' ); ?></p>
		<ul data-enquiry-selected-items></ul>
	</div>

	<div class="form-row"><label for="el-name"><?php esc_html_e( 'Name', 'arise-paris' ); ?> <span class="required">*</span></label><input type="text" id="el-name" name="name" required aria-required="true" /></div>
	<div class="form-row"><label for="el-company"><?php esc_html_e( 'Company', 'arise-paris' ); ?></label><input type="text" id="el-company" name="company" /></div>
	<div class="form-row"><label for="el-email"><?php esc_html_e( 'Email', 'arise-paris' ); ?> <span class="required">*</span></label><input type="email" id="el-email" name="email" required aria-required="true" /></div>
	<div class="form-row"><label for="el-phone"><?php esc_html_e( 'Phone', 'arise-paris' ); ?></label><input type="tel" id="el-phone" name="phone" /></div>
	<div class="form-row"><label for="el-country"><?php esc_html_e( 'Country', 'arise-paris' ); ?></label><input type="text" id="el-country" name="country" /></div>
	<div class="form-row"><label for="el-type"><?php esc_html_e( 'Enquiry Type', 'arise-paris' ); ?></label>
		<select id="el-type" name="enquiry_type">
			<option value="wholesale"><?php esc_html_e( 'Wholesale', 'arise-paris' ); ?></option>
			<option value="distribution"><?php esc_html_e( 'Distribution', 'arise-paris' ); ?></option>
			<option value="retail"><?php esc_html_e( 'Retail', 'arise-paris' ); ?></option>
		</select>
	</div>
	<div class="form-row"><label for="el-message"><?php esc_html_e( 'Message', 'arise-paris' ); ?></label><textarea id="el-message" name="message" rows="4"></textarea></div>
	<div class="form-errors" role="alert" data-form-errors hidden></div>
	<div class="enquiry-list-form-actions">
		<button type="submit" class="btn btn-primary" data-form-submit><?php esc_html_e( 'Submit Enquiry', 'arise-paris' ); ?></button>
		<a class="btn btn-outline" data-enquiry-whatsapp-send href="<?php echo esc_url( arise_paris_whatsapp_link() ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'WhatsApp Our Team', 'arise-paris' ); ?></a>
	</div>
</form>
