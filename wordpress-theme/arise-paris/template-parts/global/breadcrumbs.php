<?php
/**
 * Breadcrumb trail (visual, mirrors schema.php BreadcrumbList).
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

if ( is_front_page() ) {
	return;
}
?>
<nav class="breadcrumbs" aria-label="<?php esc_attr_e( 'Breadcrumb', 'arise-paris' ); ?>">
	<div class="container">
		<ol>
			<li><a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'arise-paris' ); ?></a></li>
			<?php if ( is_singular( 'arise_product' ) ) : ?>
				<li><a href="<?php echo esc_url( get_post_type_archive_link( 'arise_product' ) ); ?>"><?php esc_html_e( 'Products', 'arise-paris' ); ?></a></li>
				<li aria-current="page"><?php the_title(); ?></li>
			<?php elseif ( is_singular( 'post' ) ) : ?>
				<li><a href="<?php echo esc_url( home_url( '/blog/' ) ); ?>"><?php esc_html_e( 'Blog', 'arise-paris' ); ?></a></li>
				<li aria-current="page"><?php the_title(); ?></li>
			<?php elseif ( is_tax( 'arise_collection' ) ) : ?>
				<li><a href="<?php echo esc_url( get_post_type_archive_link( 'arise_product' ) ); ?>"><?php esc_html_e( 'Products', 'arise-paris' ); ?></a></li>
				<li aria-current="page"><?php single_term_title(); ?></li>
			<?php elseif ( is_search() ) : ?>
				<li aria-current="page"><?php esc_html_e( 'Search Results', 'arise-paris' ); ?></li>
			<?php elseif ( is_404() ) : ?>
				<li aria-current="page"><?php esc_html_e( 'Page Not Found', 'arise-paris' ); ?></li>
			<?php elseif ( is_page() || is_singular() ) : ?>
				<li aria-current="page"><?php the_title(); ?></li>
			<?php endif; ?>
		</ol>
	</div>
</nav>
