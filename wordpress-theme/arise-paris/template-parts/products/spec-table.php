<?php
defined( 'ABSPATH' ) || exit;
$product_id = get_the_ID();
?>
<table class="product-spec-table">
	<tbody>
		<tr><th><?php esc_html_e( 'Product Type', 'arise-paris' ); ?></th><td><?php echo esc_html( arise_paris_product_meta( $product_id, 'product_type', 'Deodorant Body Spray' ) ); ?></td></tr>
		<tr><th><?php esc_html_e( 'Net Volume', 'arise-paris' ); ?></th><td><?php echo esc_html( arise_paris_product_meta( $product_id, 'net_volume', '250 ml' ) ); ?></td></tr>
		<tr><th><?php esc_html_e( 'Fluid Ounce', 'arise-paris' ); ?></th><td><?php echo esc_html( arise_paris_product_meta( $product_id, 'fluid_ounce', '8.45 fl. oz.' ) ); ?></td></tr>
		<tr><th><?php esc_html_e( 'Visual Identity', 'arise-paris' ); ?></th><td><?php echo esc_html( arise_paris_product_meta( $product_id, 'visual_identity' ) ); ?></td></tr>
	</tbody>
</table>
<p class="product-spec-note"><?php esc_html_e( 'Product information and packaging may be updated. Commercial specifications are available upon enquiry.', 'arise-paris' ); ?></p>
