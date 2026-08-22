<?php
/**
 * Search form template.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;
$unique_id = wp_unique_id( 'search-form-' );
?>
<form role="search" method="get" class="search-form" action="<?php echo esc_url( home_url( '/' ) ); ?>">
	<label for="<?php echo esc_attr( $unique_id ); ?>" class="screen-reader-text"><?php esc_html_e( 'Search for:', 'arise-paris' ); ?></label>
	<input type="search" id="<?php echo esc_attr( $unique_id ); ?>" class="search-field" placeholder="<?php esc_attr_e( 'Search…', 'arise-paris' ); ?>" value="<?php echo esc_attr( get_search_query() ); ?>" name="s" />
	<button type="submit" class="search-submit btn btn-primary"><?php esc_html_e( 'Search', 'arise-paris' ); ?></button>
</form>
