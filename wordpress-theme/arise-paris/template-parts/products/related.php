<?php
defined( 'ABSPATH' ) || exit;
$current_id = get_the_ID();
$terms = get_the_terms( $current_id, 'arise_collection' );
$tax_query = array();
if ( $terms && ! is_wp_error( $terms ) ) {
	$tax_query = array( array( 'taxonomy' => 'arise_collection', 'field' => 'term_id', 'terms' => wp_list_pluck( $terms, 'term_id' ) ) );
}
$related = new WP_Query( array(
	'post_type'      => 'arise_product',
	'posts_per_page' => 4,
	'post__not_in'   => array( $current_id ),
	'tax_query'      => $tax_query,
	'orderby'        => 'rand',
) );
if ( ! $related->have_posts() ) { return; }
?>
<section class="related-products">
	<div class="container">
		<h2><?php esc_html_e( 'You May Also Consider', 'arise-paris' ); ?></h2>
		<div class="products-grid products-grid--related">
			<?php while ( $related->have_posts() ) : $related->the_post(); get_template_part( 'template-parts/products/card' ); endwhile; wp_reset_postdata(); ?>
		</div>
	</div>
</section>
