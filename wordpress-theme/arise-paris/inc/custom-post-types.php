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
