<?php
/**
 * Centre-focus Product Explorer with thumbnail strip (used on the products archive).
 * WhatsApp appears as a visually secondary action; Add to Enquiry / View Product are primary.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

$products = get_posts(
	array(
		'post_type'      => 'arise_product',
		'posts_per_page' => -1,
		'orderby'        => 'menu_order',
		'order'          => 'ASC',
	)
);

if ( empty( $products ) ) {
	return;
}
?>
<section class="product-explorer" data-product-explorer aria-label="<?php esc_attr_e( 'Product Explorer', 'arise-paris' ); ?>">
	<div class="container">
		<div class="product-explorer__stage">
			<div class="product-explorer__focus" data-explorer-focus>
				<?php foreach ( $products as $index => $product ) : ?>
					<figure class="product-explorer__image<?php echo 0 === $index ? ' is-active' : ''; ?>" data-explorer-image data-index="<?php echo esc_attr( $index ); ?>">
						<img src="<?php echo esc_url( arise_paris_product_image( $product->ID, $product->post_name, 'arise-product-hero' ) ); ?>" alt="<?php echo esc_attr( arise_paris_product_meta( $product->ID, 'image_alt', $product->post_title ) ); ?>" loading="lazy" />
					</figure>
				<?php endforeach; ?>
			</div>

			<div class="product-explorer__info" data-explorer-info aria-live="polite">
				<h3 data-explorer-title><?php echo esc_html( $products[0]->post_title ); ?></h3>
				<p data-explorer-description><?php echo esc_html( arise_paris_product_meta( $products[0]->ID, 'short_description' ) ); ?></p>
				<div class="product-explorer__actions">
					<a class="btn btn-primary" data-explorer-view href="<?php echo esc_url( get_permalink( $products[0] ) ); ?>"><?php esc_html_e( 'View Product', 'arise-paris' ); ?></a>
					<button type="button" class="btn btn-outline" data-explorer-add data-product-id="<?php echo esc_attr( $products[0]->ID ); ?>" data-product-name="<?php echo esc_attr( $products[0]->post_title ); ?>" data-product-url="<?php echo esc_url( get_permalink( $products[0] ) ); ?>" data-product-image="<?php echo esc_url( arise_paris_product_image( $products[0]->ID, $products[0]->post_name ) ); ?>">
						<?php esc_html_e( 'Add to Enquiry', 'arise-paris' ); ?>
					</button>
					<a class="link-whatsapp" data-explorer-whatsapp href="<?php echo esc_url( arise_paris_whatsapp_link() ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'WhatsApp Our Team', 'arise-paris' ); ?></a>
				</div>
			</div>
		</div>

		<div class="product-explorer__thumbs" data-explorer-thumbs role="tablist" aria-label="<?php esc_attr_e( 'Product thumbnails', 'arise-paris' ); ?>">
			<?php foreach ( $products as $index => $product ) : ?>
				<button
					type="button"
					class="product-explorer__thumb<?php echo 0 === $index ? ' is-active' : ''; ?>"
					data-explorer-thumb
					data-index="<?php echo esc_attr( $index ); ?>"
					data-name="<?php echo esc_attr( $product->post_title ); ?>"
					data-description="<?php echo esc_attr( arise_paris_product_meta( $product->ID, 'short_description' ) ); ?>"
					data-url="<?php echo esc_url( get_permalink( $product ) ); ?>"
					data-product-id="<?php echo esc_attr( $product->ID ); ?>"
					data-product-image="<?php echo esc_url( arise_paris_product_image( $product->ID, $product->post_name ) ); ?>"
					role="tab"
					aria-selected="<?php echo 0 === $index ? 'true' : 'false'; ?>"
				>
					<img src="<?php echo esc_url( arise_paris_product_image( $product->ID, $product->post_name, 'arise-product-card' ) ); ?>" alt="<?php echo esc_attr( $product->post_title ); ?>" loading="lazy" />
				</button>
			<?php endforeach; ?>
		</div>
	</div>
</section>
