<?php
/**
 * JSON-LD structured data (Organization, WebSite, Breadcrumbs, Article, FAQ, Product).
 * No price/rating/review/availability/offers per brand rules.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

function arise_paris_schema_active_seo_plugin() {
	return defined( 'WPSEO_VERSION' ) || defined( 'RANK_MATH_VERSION' );
}

function arise_paris_schema_organization() {
	return array(
		'@type' => 'Organization',
		'@id'   => home_url( '/#organization' ),
		'name'  => 'Arise Paris',
		'url'   => home_url( '/' ),
		'logo'  => arise_paris_option( 'logo_arise' ),
		'sameAs' => array_filter(
			array(
				arise_paris_option( 'social_instagram' ),
				arise_paris_option( 'social_facebook' ),
				arise_paris_option( 'social_linkedin' ),
				arise_paris_option( 'ronak_url' ),
			)
		),
		'parentOrganization' => array(
			'@type' => 'Organization',
			'name'  => 'Ronak Group',
			'url'   => arise_paris_option( 'ronak_url' ),
		),
		'contactPoint' => array(
			'@type'       => 'ContactPoint',
			'email'       => arise_paris_option( 'email' ),
			'telephone'   => arise_paris_option( 'phone_uae' ),
			'contactType' => 'sales',
		),
	);
}

function arise_paris_schema_website() {
	return array(
		'@type'           => 'WebSite',
		'@id'             => home_url( '/#website' ),
		'url'             => home_url( '/' ),
		'name'            => get_bloginfo( 'name' ),
		'publisher'       => array( '@id' => home_url( '/#organization' ) ),
		'inLanguage'      => get_bloginfo( 'language' ),
	);
}

function arise_paris_schema_breadcrumbs() {
	$items = array(
		array(
			'@type'    => 'ListItem',
			'position' => 1,
			'name'     => __( 'Home', 'arise-paris' ),
			'item'     => home_url( '/' ),
		),
	);
	$position = 2;

	if ( is_singular( 'arise_product' ) ) {
		$items[] = array(
			'@type'    => 'ListItem',
			'position' => $position++,
			'name'     => __( 'Products', 'arise-paris' ),
			'item'     => get_post_type_archive_link( 'arise_product' ),
		);
		$items[] = array(
			'@type'    => 'ListItem',
			'position' => $position,
			'name'     => get_the_title(),
			'item'     => get_permalink(),
		);
	} elseif ( is_singular( 'post' ) ) {
		$items[] = array(
			'@type'    => 'ListItem',
			'position' => $position++,
			'name'     => __( 'Blog', 'arise-paris' ),
			'item'     => get_permalink( get_option( 'page_for_posts' ) ) ? get_permalink( get_option( 'page_for_posts' ) ) : home_url( '/blog/' ),
		);
		$items[] = array(
			'@type'    => 'ListItem',
			'position' => $position,
			'name'     => get_the_title(),
			'item'     => get_permalink(),
		);
	} elseif ( is_page() || is_singular() ) {
		$items[] = array(
			'@type'    => 'ListItem',
			'position' => $position,
			'name'     => get_the_title(),
			'item'     => get_permalink(),
		);
	} elseif ( is_tax( 'arise_collection' ) ) {
		$items[] = array(
			'@type'    => 'ListItem',
			'position' => $position,
			'name'     => single_term_title( '', false ),
			'item'     => get_term_link( get_queried_object() ),
		);
	}

	return array(
		'@type'           => 'BreadcrumbList',
		'itemListElement' => $items,
	);
}

function arise_paris_schema_article() {
	if ( ! is_singular( 'post' ) ) {
		return null;
	}
	$post_id = get_the_ID();
	return array(
		'@type'            => 'Article',
		'headline'         => get_the_title(),
		'datePublished'    => get_the_date( 'c' ),
		'dateModified'     => get_the_modified_date( 'c' ),
		'author'           => array(
			'@type' => 'Person',
			'name'  => get_the_author(),
		),
		'publisher'        => array( '@id' => home_url( '/#organization' ) ),
		'mainEntityOfPage' => get_permalink(),
		'image'            => has_post_thumbnail( $post_id ) ? get_the_post_thumbnail_url( $post_id, 'large' ) : arise_paris_option( 'og_image' ),
		'description'      => arise_paris_trim( get_the_excerpt() ),
	);
}

function arise_paris_schema_faq_from_content( $content ) {
	if ( ! preg_match_all( '/<h[2-4][^>]*>(.*?)<\/h[2-4]>\s*(.*?)(?=<h[2-4]|$)/is', $content, $matches, PREG_SET_ORDER ) ) {
		return null;
	}
	$faqs = array();
	foreach ( $matches as $match ) {
		$question = wp_strip_all_tags( $match[1] );
		if ( '?' !== substr( trim( $question ), -1 ) ) {
			continue;
		}
		$answer = arise_paris_trim( wp_strip_all_tags( $match[2] ), 600 );
		if ( ! $answer ) {
			continue;
		}
		$faqs[] = array(
			'@type'          => 'Question',
			'name'           => $question,
			'acceptedAnswer' => array(
				'@type' => 'Answer',
				'text'  => $answer,
			),
		);
	}
	if ( empty( $faqs ) ) {
		return null;
	}
	return array(
		'@type'      => 'FAQPage',
		'mainEntity' => $faqs,
	);
}

function arise_paris_schema_product() {
	if ( ! is_singular( 'arise_product' ) ) {
		return null;
	}
	$post_id = get_the_ID();
	return array(
		'@type'       => 'Product',
		'name'        => get_the_title(),
		'description' => arise_paris_trim( arise_paris_product_meta( $post_id, 'short_description', get_the_excerpt() ), 500 ),
		'image'       => arise_paris_product_image( $post_id, get_post_field( 'post_name', $post_id ) ),
		'brand'       => array(
			'@type' => 'Brand',
			'name'  => 'Arise Paris',
		),
		'category'    => arise_paris_product_meta( $post_id, 'product_type', 'Deodorant Body Spray' ),
	);
}

function arise_paris_output_schema() {
	if ( arise_paris_schema_active_seo_plugin() ) {
		return;
	}

	$graph = array(
		arise_paris_schema_organization(),
		arise_paris_schema_website(),
		arise_paris_schema_breadcrumbs(),
	);

	$article = arise_paris_schema_article();
	if ( $article ) {
		$graph[] = $article;
	}

	$product = arise_paris_schema_product();
	if ( $product ) {
		$graph[] = $product;
	}

	if ( is_singular( 'post' ) ) {
		$faq = arise_paris_schema_faq_from_content( get_the_content() );
		if ( $faq ) {
			$graph[] = $faq;
		}
	}

	$data = array(
		'@context' => 'https://schema.org',
		'@graph'   => $graph,
	);

	echo '<script type="application/ld+json">' . wp_json_encode( $data ) . '</script>' . "\n";
}
add_action( 'wp_head', 'arise_paris_output_schema', 2 );
