<?php
/**
 * 404 template.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div class="container content-area error-404">
	<h1><?php esc_html_e( 'Page Not Found', 'arise-paris' ); ?></h1>
	<p><?php esc_html_e( 'The page you are looking for does not exist. Try searching, or explore the Arise Paris collection.', 'arise-paris' ); ?></p>
	<?php get_search_form(); ?>
	<p><a class="btn btn-primary" href="<?php echo esc_url( get_post_type_archive_link( 'arise_product' ) ); ?>"><?php esc_html_e( 'Explore the Collection', 'arise-paris' ); ?></a></p>
</div>
<?php
get_footer();
