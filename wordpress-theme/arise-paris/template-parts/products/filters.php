<?php
/**
 * Products archive filter bar: search, collection filters, clear, results count.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

$collections = arise_paris_collections();
$total       = $args['total'] ?? 0;
?>
<div class="products-filters" data-products-filters>
	<form class="products-filters__search" role="search" method="get" action="<?php echo esc_url( get_post_type_archive_link( 'arise_product' ) ); ?>">
		<label class="screen-reader-text" for="product-search"><?php esc_html_e( 'Search products', 'arise-paris' ); ?></label>
		<input type="search" id="product-search" name="s" value="<?php echo esc_attr( get_search_query() ); ?>" placeholder="<?php esc_attr_e( 'Search products…', 'arise-paris' ); ?>" data-product-search />
		<button type="submit" class="btn btn-outline btn-small"><?php esc_html_e( 'Search', 'arise-paris' ); ?></button>
	</form>

	<div class="products-filters__tabs" role="tablist" aria-label="<?php esc_attr_e( 'Filter by collection', 'arise-paris' ); ?>">
		<button type="button" class="products-filters__tab is-active" data-product-filter="all" role="tab" aria-selected="true"><?php esc_html_e( 'All Products', 'arise-paris' ); ?></button>
		<?php foreach ( $collections as $slug => $collection ) : ?>
			<button type="button" class="products-filters__tab" data-product-filter="<?php echo esc_attr( $slug ); ?>" role="tab" aria-selected="false"><?php echo esc_html( $collection['title'] ); ?></button>
		<?php endforeach; ?>
		<button type="button" class="products-filters__tab" data-product-filter="fresh-refined" role="tab" aria-selected="false"><?php esc_html_e( 'Fresh & Refined', 'arise-paris' ); ?></button>
	</div>

	<div class="products-filters__meta">
		<p class="products-filters__count" data-products-count><?php
			/* translators: %d: number of products. */
			printf( esc_html( _n( '%d product', '%d products', $total, 'arise-paris' ) ), (int) $total );
		?></p>
		<button type="button" class="btn btn-ghost btn-small" data-products-clear><?php esc_html_e( 'Clear Filters', 'arise-paris' ); ?></button>
	</div>
</div>
