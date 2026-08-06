<?php
/**
 * Lightweight native SEO output (defers to Yoast/Rank Math when active).
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

function arise_paris_seo_active() {
	return defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' );
}

function arise_paris_seo_title() {
	if ( is_singular( 'arise_product' ) ) {
		$title = arise_paris_product_meta( get_the_ID(), 'seo_title' );
		if ( $title ) {
			return $title;
		}
		return get_the_title() . ' Deodorant Body Spray | ' . get_bloginfo( 'name' );
	}

	if ( is_singular() ) {
		return get_the_title() . ' | ' . get_bloginfo( 'name' );
	}

	if ( is_post_type_archive( 'arise_product' ) ) {
		return __( 'Products', 'arise-paris' ) . ' | ' . get_bloginfo( 'name' );
	}

	if ( is_tax( 'arise_collection' ) ) {
		return single_term_title( '', false ) . ' | ' . get_bloginfo( 'name' );
	}

	if ( is_search() ) {
		return __( 'Search Results', 'arise-paris' ) . ' | ' . get_bloginfo( 'name' );
	}

	if ( is_front_page() ) {
		return get_bloginfo( 'name' ) . ' — ' . get_bloginfo( 'description' );
	}

	return wp_get_document_title();
}

function arise_paris_seo_description() {
	if ( is_singular( 'arise_product' ) ) {
		$desc = arise_paris_product_meta( get_the_ID(), 'meta_description' );
		if ( $desc ) {
			return $desc;
		}
		return arise_paris_trim( arise_paris_product_meta( get_the_ID(), 'short_description', get_the_excerpt() ) );
	}

	if ( is_singular() ) {
		$excerpt = has_excerpt() ? get_the_excerpt() : get_the_content();
		return arise_paris_trim( $excerpt );
	}

	if ( is_front_page() ) {
		return arise_paris_trim( arise_paris_option( 'hero_supporting' ) );
	}

	return get_bloginfo( 'description' );
}

function arise_paris_canonical_url() {
	if ( is_singular() ) {
		return get_permalink();
	}
	if ( is_home() || is_front_page() ) {
		return home_url( '/' );
	}
	global $wp;
	return home_url( add_query_arg( array(), $wp->request ) );
}

function arise_paris_seo_image() {
	if ( is_singular( 'arise_product' ) ) {
		return arise_paris_product_image( get_the_ID(), get_post_field( 'post_name' ) );
	}
	if ( is_singular() && has_post_thumbnail() ) {
		return get_the_post_thumbnail_url( get_the_ID(), 'large' );
	}
	return arise_paris_option( 'logo_arise' );
}

function arise_paris_output_meta_tags() {
	if ( arise_paris_seo_active() ) {
		return;
	}

	$title       = arise_paris_seo_title();
	$description = arise_paris_seo_description();
	$canonical   = arise_paris_canonical_url();
	$image       = arise_paris_seo_image();
	$site_name   = get_bloginfo( 'name' );

	echo "\n<!-- Arise Paris SEO -->\n";
	echo '<meta name="description" content="' . esc_attr( $description ) . '" />' . "\n";
	echo '<link rel="canonical" href="' . esc_url( $canonical ) . '" />' . "\n";

	echo '<meta property="og:type" content="' . ( is_singular( 'post' ) ? 'article' : 'website' ) . '" />' . "\n";
	echo '<meta property="og:title" content="' . esc_attr( $title ) . '" />' . "\n";
	echo '<meta property="og:description" content="' . esc_attr( $description ) . '" />' . "\n";
	echo '<meta property="og:url" content="' . esc_url( $canonical ) . '" />' . "\n";
	echo '<meta property="og:site_name" content="' . esc_attr( $site_name ) . '" />' . "\n";
	if ( $image ) {
		echo '<meta property="og:image" content="' . esc_url( $image ) . '" />' . "\n";
	}

	echo '<meta name="twitter:card" content="summary_large_image" />' . "\n";
	echo '<meta name="twitter:title" content="' . esc_attr( $title ) . '" />' . "\n";
	echo '<meta name="twitter:description" content="' . esc_attr( $description ) . '" />' . "\n";
	if ( $image ) {
		echo '<meta name="twitter:image" content="' . esc_url( $image ) . '" />' . "\n";
	}
	echo "<!-- /Arise Paris SEO -->\n";
}
add_action( 'wp_head', 'arise_paris_output_meta_tags', 1 );

function arise_paris_document_title_parts( $title ) {
	if ( arise_paris_seo_active() ) {
		return $title;
	}
	return $title;
}
