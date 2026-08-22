<?php
/**
 * Single product template.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

get_header();
while ( have_posts() ) :
	the_post();
	$product_id = get_the_ID();
	$slug       = get_post_field( 'post_name', $product_id );
	$accent     = arise_paris_product_meta( $product_id, 'accent', '#D8AD52' );
	?>
	<article <?php post_class( 'product-single' ); ?> style="--product-accent: <?php echo esc_attr( $accent ); ?>">
		<div class="container product-single__inner">
			<div class="product-single__media">
				<img src="<?php echo esc_url( arise_paris_product_image( $product_id, $slug, 'arise-product-hero' ) ); ?>" alt="<?php echo esc_attr( arise_paris_product_meta( $product_id, 'image_alt', get_the_title() ) ); ?>" loading="eager" />
			</div>
			<div class="product-single__info">
				<p class="product-single__eyebrow"><?php echo esc_html( arise_paris_product_meta( $product_id, 'product_type', 'Deodorant Body Spray' ) ); ?></p>
				<h1 class="product-single__title"><?php the_title(); ?></h1>
				<p class="product-single__short"><?php echo esc_html( arise_paris_product_meta( $product_id, 'short_description', get_the_excerpt() ) ); ?></p>

				<?php get_template_part( 'template-parts/products/spec-table' ); ?>

				<div class="product-single__actions">
					<button
						type="button"
						class="btn btn-primary"
						data-enquiry-add
						data-product-id="<?php echo esc_attr( $product_id ); ?>"
						data-product-name="<?php echo esc_attr( get_the_title() ); ?>"
						data-product-url="<?php the_permalink(); ?>"
						data-product-image="<?php echo esc_url( arise_paris_product_image( $product_id, $slug ) ); ?>"
					>
						<?php esc_html_e( 'Add to Enquiry', 'arise-paris' ); ?>
					</button>
					<a class="btn btn-outline" href="<?php echo esc_url( arise_paris_whatsapp_link( sprintf( __( 'Hello, I am interested in %s for B2B distribution. Please share more information.', 'arise-paris' ), get_the_title() ) ) ); ?>" target="_blank" rel="noopener noreferrer">
						<?php esc_html_e( 'WhatsApp Our Team', 'arise-paris' ); ?>
					</a>
				</div>
			</div>
		</div>

		<?php if ( get_the_content() ) : ?>
			<div class="container product-single__description">
				<div class="entry-content"><?php the_content(); ?></div>
			</div>
		<?php endif; ?>

		<div class="container">
			<h2 class="product-single__enquiry-heading"><?php esc_html_e( 'Enquire About This Product', 'arise-paris' ); ?></h2>
			<?php get_template_part( 'template-parts/forms/product-enquiry', null, array( 'product_name' => get_the_title() ) ); ?>
		</div>

		<?php get_template_part( 'template-parts/products/related' ); ?>
	</article>
	<?php
endwhile;
get_footer();
