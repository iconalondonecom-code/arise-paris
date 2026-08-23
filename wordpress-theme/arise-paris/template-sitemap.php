<?php
/** Template Name: Sitemap
 * @package Arise_Paris */
defined( 'ABSPATH' ) || exit;
get_header();
get_template_part( 'template-parts/hero/page-hero', null, array( 'eyebrow' => __( 'Sitemap', 'arise-paris' ), 'heading' => __( 'Site Map', 'arise-paris' ) ) );
$products = get_posts( array( 'post_type' => 'arise_product', 'posts_per_page' => -1, 'orderby' => 'title', 'order' => 'ASC' ) );
$posts    = get_posts( array( 'post_type' => 'post', 'posts_per_page' => -1, 'orderby' => 'title', 'order' => 'ASC' ) );
$pages    = get_pages( array( 'sort_column' => 'post_title' ) );
?>
<div class="container content-area sitemap-grid">
	<div><h2><?php esc_html_e( 'Pages', 'arise-paris' ); ?></h2><ul><?php foreach ( $pages as $p ) : ?><li><a href="<?php echo esc_url( get_permalink( $p ) ); ?>"><?php echo esc_html( $p->post_title ); ?></a></li><?php endforeach; ?></ul></div>
	<div><h2><?php esc_html_e( 'Products', 'arise-paris' ); ?></h2><ul><?php foreach ( $products as $p ) : ?><li><a href="<?php echo esc_url( get_permalink( $p ) ); ?>"><?php echo esc_html( $p->post_title ); ?></a></li><?php endforeach; ?></ul></div>
	<div><h2><?php esc_html_e( 'Blog Posts', 'arise-paris' ); ?></h2><ul><?php foreach ( $posts as $p ) : ?><li><a href="<?php echo esc_url( get_permalink( $p ) ); ?>"><?php echo esc_html( $p->post_title ); ?></a></li><?php endforeach; ?></ul></div>
</div>
<?php get_footer(); EOF

