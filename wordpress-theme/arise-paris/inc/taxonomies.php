<?php
/**
 * Register arise_collection taxonomy and seed default terms.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register taxonomy.
 */
function arise_paris_register_taxonomies() {
	register_taxonomy(
		'arise_collection',
		array( 'arise_product' ),
		array(
			'labels'       => array(
				'name'          => __( 'Collections', 'arise-paris' ),
				'singular_name' => __( 'Collection', 'arise-paris' ),
			),
			'public'       => true,
			'hierarchical' => true,
			'show_in_rest' => true,
			'rewrite'      => array( 'slug' => 'collection' ),
		)
	);
}
add_action( 'init', 'arise_paris_register_taxonomies' );

/**
 * Seed default collection terms on theme activation.
 */
function arise_paris_seed_taxonomy_terms() {
	if ( ! taxonomy_exists( 'arise_collection' ) ) {
		return;
	}

	$terms = array( 'Bold & Dynamic', 'Deep & Rich', 'Soft & Expressive', 'Fresh & Refined' );

	foreach ( $terms as $term ) {
		if ( ! term_exists( $term, 'arise_collection' ) ) {
			wp_insert_term( $term, 'arise_collection' );
		}
	}
}
add_action( 'after_switch_theme', 'arise_paris_seed_taxonomy_terms' );
