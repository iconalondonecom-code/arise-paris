<?php
/**
 * Shared helper functions and the single source of truth for brand defaults.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

/**
 * Default brand/contact values. Every template must read contact info through
 * arise_paris_option() rather than hardcoding it, so Customizer edits always win.
 *
 * @return array<string,string>
 */
function arise_paris_defaults() {
	return array(
		'logo_arise'          => ARISE_PARIS_URI . '/assets/images/logos/arise-paris.png',
		'logo_ronak'          => ARISE_PARIS_URI . '/assets/images/logos/ronak-group.png',
		'email'               => 'contact@ronak.global',
		'phone_uae'           => '+971 50 137 7674',
		'phone_india'         => '+91 99985 69923',
		'whatsapp_uae'        => 'https://wa.me/971501377674',
		'whatsapp_india'      => 'https://wa.me/919998569923',
		'whatsapp_message'    => 'Hello, I am interested in Arise Paris products for B2B distribution. Please share more information.',
		'address_line1'       => 'Ronak Group Building',
		'address_line2'       => 'Gotri Road, Next to Nilgiri Terrace',
		'address_line3'       => 'Gadapura, Hari Nagar',
		'address_city'        => 'Vadodara, Gujarat 390021',
		'address_country'     => 'India',
		'ronak_url'           => 'https://ronak.global/',
		'social_instagram'    => '',
		'social_facebook'     => '',
		'social_linkedin'     => '',
		'footer_description'  => 'Arise Paris is a contemporary body fragrance brand offering a distinctive collection of 250 ml deodorant body sprays for international B2B customers.',
		'copyright'           => '© ' . gmdate( 'Y' ) . ' Arise Paris — A Ronak Group Brand. All rights reserved.',
		'catalogue_destination' => '',
		'hero_heading'        => 'Discover the Arise Paris Colour Journey',
		'hero_supporting'     => 'Eleven distinctive deodorant body spray identities, each with its own colour story — explore the range built for global B2B distribution.',
		'cta_primary_label'   => 'Explore the Collection',
		'cta_secondary_label' => 'Become a Distributor',
		'blog_show_date'      => true,
		'floating_whatsapp'   => true,
	);
}

/**
 * Fetch a single branded/contact option, preferring the Customizer value.
 *
 * @param string $key Option key from arise_paris_defaults().
 * @return string|bool
 */
function arise_paris_option( $key ) {
	$defaults = arise_paris_defaults();
	$default  = $defaults[ $key ] ?? '';
	$value    = get_theme_mod( 'arise_paris_' . $key, $default );

	return $value;
}

/**
 * Build a wa.me link with an optional custom message.
 *
 * @param string $message Optional message to prefill.
 * @param string $which   'uae' or 'india'.
 * @return string
 */
function arise_paris_whatsapp_link( $message = '', $which = 'uae' ) {
	$base = 'india' === $which ? arise_paris_option( 'whatsapp_india' ) : arise_paris_option( 'whatsapp_uae' );
	$msg  = $message ? $message : arise_paris_option( 'whatsapp_message' );

	return $base . '?text=' . rawurlencode( $msg );
}

/**
 * Return the full postal address as a single escaped string (comma separated).
 *
 * @return string
 */
function arise_paris_full_address() {
	return implode(
		', ',
		array_filter(
			array(
				arise_paris_option( 'address_line1' ),
				arise_paris_option( 'address_line2' ),
				arise_paris_option( 'address_line3' ),
				arise_paris_option( 'address_city' ),
				arise_paris_option( 'address_country' ),
			)
		)
	);
}

/**
 * Get the meta value for a product, checking ACF first when available.
 *
 * @param int    $post_id Product post ID.
 * @param string $key     Meta key without leading underscore.
 * @param mixed  $default Fallback value.
 * @return mixed
 */
function arise_paris_product_meta( $post_id, $key, $default = '' ) {
	if ( function_exists( 'get_field' ) ) {
		$value = get_field( $key, $post_id );
		if ( '' !== $value && null !== $value && false !== $value ) {
			return $value;
		}
	}

	$value = get_post_meta( $post_id, '_arise_' . $key, true );

	return '' !== $value ? $value : $default;
}

/**
 * Get a product's primary image URL: featured image first, seed fallback second.
 *
 * @param int    $post_id Product post ID.
 * @param string $slug    Product slug (for seed fallback).
 * @param string $size    Image size.
 * @return string
 */
function arise_paris_product_image( $post_id, $slug = '', $size = 'large' ) {
	if ( has_post_thumbnail( $post_id ) ) {
		return get_the_post_thumbnail_url( $post_id, $size );
	}

	if ( $slug ) {
		return ARISE_PARIS_URI . '/assets/images/products/' . sanitize_title( $slug ) . '.png';
	}

	return ARISE_PARIS_URI . '/assets/images/placeholders/product-placeholder.svg';
}

/**
 * Nav menu locations helper output, falls back to a static list of pages.
 *
 * @param string $location Registered menu location.
 * @return void
 */
function arise_paris_nav_fallback( $location ) {
	echo '<ul class="menu-fallback">';
	wp_list_pages(
		array(
			'title_li' => '',
			'depth'    => 1,
		)
	);
	echo '</ul>';
}

/**
 * Truncate a string of text safely for excerpts.
 *
 * @param string $text   Source text.
 * @param int    $length Character length.
 * @return string
 */
function arise_paris_trim( $text, $length = 160 ) {
	$text = wp_strip_all_tags( $text );
	if ( mb_strlen( $text ) <= $length ) {
		return $text;
	}

	return mb_substr( $text, 0, $length - 1 ) . '…';
}
