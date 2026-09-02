<?php
/**
 * Register the arise_product custom post type.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register CPT.
 */
function arise_paris_register_post_types() {
	$labels = array(
		'name'               => __( 'Products', 'arise-paris' ),
		'singular_name'      => __( 'Product', 'arise-paris' ),
		'add_new_item'       => __( 'Add New Product', 'arise-paris' ),
		'edit_item'          => __( 'Edit Product', 'arise-paris' ),
		'new_item'           => __( 'New Product', 'arise-paris' ),
		'view_item'          => __( 'View Product', 'arise-paris' ),
		'search_items'       => __( 'Search Products', 'arise-paris' ),
		'not_found'          => __( 'No products found', 'arise-paris' ),
		'all_items'          => __( 'All Products', 'arise-paris' ),
		'menu_name'          => __( 'Products', 'arise-paris' ),
	);

	register_post_type(
		'arise_product',
		array(
			'labels'        => $labels,
			'public'        => true,
			'has_archive'   => 'products',
			'rewrite'       => array( 'slug' => 'products', 'with_front' => false ),
			'menu_icon'     => 'dashicons-flask',
			'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'custom-fields' ),
			'show_in_rest'  => true,
			'menu_position' => 5,
		)
	);
}
add_action( 'init', 'arise_paris_register_post_types' );

/**
 * Register the post type + taxonomies and flush rewrite rules.
 *
 * Without this the product archive (/products/) and single product / article
 * permalinks 404 until someone manually opens Settings → Permalinks and clicks
 * Save. Runs on theme activation and, via the version gate below, once after the
 * theme files are updated.
 */
function arise_paris_flush_rewrite_rules() {
	arise_paris_register_post_types();
	if ( function_exists( 'arise_paris_register_taxonomies' ) ) {
		arise_paris_register_taxonomies();
	}
	flush_rewrite_rules();
}
add_action( 'after_switch_theme', 'arise_paris_flush_rewrite_rules' );

/**
 * Flush rewrite rules once after the theme version changes, so uploading a new
 * build over an existing install repairs the product/article URLs on the next
 * page load without needing a theme re-activation or a Permalinks save.
 */
function arise_paris_maybe_flush_rewrite_rules() {
	if ( get_option( 'arise_paris_rewrites_version' ) === ARISE_PARIS_VERSION ) {
		return;
	}
	arise_paris_flush_rewrite_rules();
	update_option( 'arise_paris_rewrites_version', ARISE_PARIS_VERSION );
}
add_action( 'init', 'arise_paris_maybe_flush_rewrite_rules', 99 );
