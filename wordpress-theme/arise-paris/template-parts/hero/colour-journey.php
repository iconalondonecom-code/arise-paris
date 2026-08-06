<?php
/**
 * Homepage interactive Colour Journey hero: 11 layered bottles, live copy, WhatsApp/Add to Enquiry.
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
	$products = array();
}

$journey_colours = arise_paris_journey_colours();
?>
<section class="colour-journey" data-colour-journey aria-roledescription="carousel" aria-label="<?php esc_attr_e( 'Arise Paris Colour Journey', 'arise-paris' ); ?>">
	<div class="colour-journey__background" data-journey-background aria-hidden="true"></div>

	<div class="container colour-journey__inner">
		<p class="colour-journey__eyebrow"><?php esc_html_e( 'The Arise Paris Colour Journey', 'arise-paris' ); ?></p>
		<h1 class="colour-journey__heading"><?php echo esc_html( arise_paris_option( 'hero_heading' ) ); ?></h1>
		<p class="colour-journey__supporting"><?php echo esc_html( arise_paris_option( 'hero_supporting' ) ); ?></p>

		<div class="colour-journey__stage">
			<button type="button" class="colour-journey__nav colour-journey__nav--prev" data-journey-prev aria-label="<?php esc_attr_e( 'Previous product', 'arise-paris' ); ?>">&#8249;</button>

			<div class="colour-journey__bottles" data-journey-bottles>
				<?php foreach ( $products as $index => $product ) :
					$slug    = $product->post_name;
					$colours = $journey_colours[ $slug ] ?? array();
					?>
					<button
						type="button"
						class="colour-journey__bottle<?php echo 0 === $index ? ' is-active' : ''; ?>"
						data-journey-bottle
						data-index="<?php echo esc_attr( $index ); ?>"
						data-name="<?php echo esc_attr( $product->post_title ); ?>"
						data-slug="<?php echo esc_attr( $slug ); ?>"
						data-description="<?php echo esc_attr( arise_paris_product_meta( $product->ID, 'short_description' ) ); ?>"
						data-url="<?php echo esc_url( get_permalink( $product ) ); ?>"
						data-glow="<?php echo esc_attr( $colours['glow'] ?? '#D8AD52' ); ?>"
						data-mid="<?php echo esc_attr( $colours['mid'] ?? '#10102D' ); ?>"
						data-deep="<?php echo esc_attr( $colours['deep'] ?? '#05091A' ); ?>"
						aria-pressed="<?php echo 0 === $index ? 'true' : 'false'; ?>"
					>
						<img
							src="<?php echo esc_url( arise_paris_product_image( $product->ID, $slug ) ); ?>"
							alt="<?php echo esc_attr( arise_paris_product_meta( $product->ID, 'image_alt', $product->post_title ) ); ?>"
							loading="<?php echo 0 === $index ? 'eager' : 'lazy'; ?>"
						/>
					</button>
				<?php endforeach; ?>
			</div>

			<button type="button" class="colour-journey__nav colour-journey__nav--next" data-journey-next aria-label="<?php esc_attr_e( 'Next product', 'arise-paris' ); ?>">&#8250;</button>
		</div>

		<div class="colour-journey__details" data-journey-live aria-live="polite">
			<span class="colour-journey__indicator" data-journey-indicator aria-hidden="true"></span>
			<h2 class="colour-journey__product-title" data-journey-title><?php echo esc_html( $products ? $products[0]->post_title : '' ); ?></h2>
			<p class="colour-journey__product-description" data-journey-description>
				<?php echo esc_html( $products ? arise_paris_product_meta( $products[0]->ID, 'short_description' ) : '' ); ?>
			</p>
			<div class="colour-journey__actions">
				<a class="btn btn-primary" data-journey-view href="<?php echo $products ? esc_url( get_permalink( $products[0] ) ) : '#'; ?>"><?php esc_html_e( 'View Product', 'arise-paris' ); ?></a>
				<button type="button" class="btn btn-outline" data-journey-add data-product-id="<?php echo $products ? esc_attr( $products[0]->ID ) : ''; ?>" data-product-name="<?php echo $products ? esc_attr( $products[0]->post_title ) : ''; ?>" data-product-url="<?php echo $products ? esc_url( get_permalink( $products[0] ) ) : ''; ?>" data-product-image="<?php echo $products ? esc_url( arise_paris_product_image( $products[0]->ID, $products[0]->post_name ) ) : ''; ?>">
					<?php esc_html_e( 'Add to Enquiry', 'arise-paris' ); ?>
				</button>
			</div>
		</div>

		<div class="colour-journey__dots" data-journey-dots role="tablist" aria-label="<?php esc_attr_e( 'Select product', 'arise-paris' ); ?>">
			<?php foreach ( $products as $index => $product ) : ?>
				<button type="button" class="colour-journey__dot<?php echo 0 === $index ? ' is-active' : ''; ?>" data-journey-dot data-index="<?php echo esc_attr( $index ); ?>" role="tab" aria-selected="<?php echo 0 === $index ? 'true' : 'false'; ?>" aria-label="<?php echo esc_attr( $product->post_title ); ?>"></button>
			<?php endforeach; ?>
		</div>
	</div>
</section>
