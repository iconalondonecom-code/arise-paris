<?php
/**
 * Product grid loop. Args: query (WP_Query), empty_message.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

$query = $args['query'] ?? null;

if ( ! $query instanceof WP_Query || ! $query->have_posts() ) {
	?>
	<p class="products-grid__empty" data-products-empty>
		<?php echo esc_html( $args['empty_message'] ?? __( 'No products match your filters. Try clearing the filters or searching a different term.', 'arise-paris' ) ); ?>
	</p>
	<?php
	return;
}
?>
<div class="products-grid" data-products-grid>
	<?php
	while ( $query->have_posts() ) :
		$query->the_post();
		get_template_part( 'template-parts/products/card' );
	endwhile;
	wp_reset_postdata();
	?>
</div>
