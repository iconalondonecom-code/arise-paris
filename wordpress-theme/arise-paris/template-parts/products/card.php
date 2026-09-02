<?php
/**
 * Single product card. Expects global $post (arise_product).
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

$product_id = get_the_ID();
$slug       = get_post_field( 'post_name', $product_id );
$image      = arise_paris_product_image( $product_id, $slug, 'arise-product-card' );
$alt        = arise_paris_product_meta( $product_id, 'image_alt', get_the_title() );
$accent     = arise_paris_product_meta( $product_id, 'accent', '#D8AD52' );
$terms      = get_the_terms( $product_id, 'arise_collection' );
$collection = ( $terms && ! is_wp_error( $terms ) ) ? $terms[0]->name : '';
?>
<article class="product-card" style="--product-accent: <?php echo esc_attr( $accent ); ?>" data-product-card data-collection="<?php echo esc_attr( $collection ); ?>" data-name="<?php echo esc_attr( get_the_title() ); ?>">
	<a class="product-card__media" href="<?php the_permalink(); ?>">
		<img src="<?php echo esc_url( $image ); ?>" alt="<?php echo esc_attr( $alt ); ?>" loading="lazy" width="546" height="1920" />
	</a>
	<div class="product-card__body">
		<?php if ( $collection ) : ?>
			<p class="product-card__collection"><?php echo esc_html( $collection ); ?></p>
		<?php endif; ?>
		<h3 class="product-card__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
		<p class="product-card__meta"><?php echo esc_html( arise_paris_product_meta( $product_id, 'product_type', 'Deodorant Body Spray' ) ); ?> — <?php echo esc_html( arise_paris_product_meta( $product_id, 'net_volume', '250 ml' ) ); ?></p>
		<p class="product-card__desc"><?php echo esc_html( arise_paris_trim( arise_paris_product_meta( $product_id, 'short_description', get_the_excerpt() ), 110 ) ); ?></p>
		<div class="product-card__actions">
			<a class="btn btn-outline btn-small" href="<?php the_permalink(); ?>"><?php esc_html_e( 'View Product', 'arise-paris' ); ?></a>
			<button
				type="button"
				class="btn btn-primary btn-small"
				data-enquiry-add
				data-product-id="<?php echo esc_attr( $product_id ); ?>"
				data-product-name="<?php echo esc_attr( get_the_title() ); ?>"
				data-product-url="<?php the_permalink(); ?>"
				data-product-image="<?php echo esc_url( $image ); ?>"
			>
				<?php esc_html_e( 'Add to Enquiry', 'arise-paris' ); ?>
			</button>
		</div>
	</div>
</article>
