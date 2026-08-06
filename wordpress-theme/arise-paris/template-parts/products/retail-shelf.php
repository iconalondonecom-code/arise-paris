<?php
/**
 * Retail shelf layout: full range shown together for B2B retail visualisation.
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
<section class="retail-shelf">
	<div class="container">
		<?php
		get_template_part(
			'template-parts/global/section-heading',
			null,
			array(
				'eyebrow' => __( 'Retail Ready', 'arise-paris' ),
				'heading' => __( 'The Complete Range on the Shelf', 'arise-paris' ),
				'text'    => __( 'All eleven variants share a consistent 250 ml format, making planogram planning simple for retail and wholesale partners.', 'arise-paris' ),
			)
		);
		?>
		<div class="retail-shelf__row">
			<?php foreach ( $products as $product ) : ?>
				<a class="retail-shelf__item" href="<?php echo esc_url( get_permalink( $product ) ); ?>">
					<img src="<?php echo esc_url( arise_paris_product_image( $product->ID, $product->post_name, 'arise-product-card' ) ); ?>" alt="<?php echo esc_attr( arise_paris_product_meta( $product->ID, 'image_alt', $product->post_title ) ); ?>" loading="lazy" />
					<span><?php echo esc_html( $product->post_title ); ?></span>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>
