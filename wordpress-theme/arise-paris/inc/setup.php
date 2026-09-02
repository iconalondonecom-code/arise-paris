<?php
/**
 * Core theme setup: supports, menus, image sizes, block patterns.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register theme supports and nav menus.
 */
function arise_paris_setup() {
	load_theme_textdomain( 'arise-paris', ARISE_PARIS_DIR . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );
	add_theme_support( 'custom-logo', array(
		'height'      => 80,
		'width'       => 240,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_editor_style( 'assets/css/editor.css' );

	// Product imagery is bottle-on-transparent artwork with varied aspect ratios,
	// so it must be resized without a hard crop — a forced crop clips the bottle
	// top and bottom on the retail shelf and explorer thumbnails.
	add_image_size( 'arise-product-card', 640, 900, false );
	add_image_size( 'arise-product-hero', 900, 1300, false );
	add_image_size( 'arise-blog-card', 800, 500, true );

	register_nav_menus(
		array(
			'primary' => __( 'Primary Menu', 'arise-paris' ),
			'footer'  => __( 'Footer Menu', 'arise-paris' ),
			'legal'   => __( 'Legal Menu', 'arise-paris' ),
			'product' => __( 'Product Menu', 'arise-paris' ),
		)
	);
}
add_action( 'after_setup_theme', 'arise_paris_setup' );

/**
 * Register block pattern categories and patterns used across landing sections.
 */
function arise_paris_register_block_patterns() {
	register_block_pattern_category(
		'arise-paris',
		array( 'label' => __( 'Arise Paris', 'arise-paris' ) )
	);

	register_block_pattern(
		'arise-paris/cta-band',
		array(
			'title'      => __( 'CTA Band', 'arise-paris' ),
			'categories' => array( 'arise-paris' ),
			'content'    => '<!-- wp:group {"align":"full","backgroundColor":"foundation-navy","textColor":"white","layout":{"type":"constrained"}} -->
<div class="wp-block-group alignfull has-white-color has-foundation-navy-background-color has-text-color has-background"><!-- wp:heading {"textAlign":"center","fontFamily":"heading"} -->
<h2 class="wp-block-heading has-text-align-center has-heading-font-family">' . esc_html__( 'Partner with Arise Paris', 'arise-paris' ) . '</h2>
<!-- /wp:heading -->
<!-- wp:buttons {"layout":{"type":"flex","justifyContent":"center"}} -->
<div class="wp-block-buttons"><!-- wp:button -->
<div class="wp-block-button"><a class="wp-block-button__link wp-element-button" href="/become-a-distributor/">' . esc_html__( 'Become a Distributor', 'arise-paris' ) . '</a></div>
<!-- /wp:button --></div>
<!-- /wp:buttons --></div>
<!-- /wp:group -->',
		)
	);

	register_block_pattern(
		'arise-paris/b2b-partnership-intro',
		array(
			'title'      => __( 'B2B Partnership Intro', 'arise-paris' ),
			'categories' => array( 'arise-paris' ),
			'content'    => '<!-- wp:group {"align":"wide"} -->
<div class="wp-block-group alignwide"><!-- wp:heading -->
<h2 class="wp-block-heading">' . esc_html__( 'Built for Distributors, Wholesalers and Retailers', 'arise-paris' ) . '</h2>
<!-- /wp:heading -->
<!-- wp:paragraph -->
<p>' . esc_html__( 'Arise Paris supports international B2B partners with a diverse eleven-variant deodorant body spray range in a consistent 250 ml format.', 'arise-paris' ) . '</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->',
		)
	);

	register_block_pattern(
		'arise-paris/ronak-association',
		array(
			'title'      => __( 'Ronak Group Association', 'arise-paris' ),
			'categories' => array( 'arise-paris' ),
			'content'    => '<!-- wp:group {"align":"wide"} -->
<div class="wp-block-group alignwide"><!-- wp:paragraph -->
<p>' . esc_html__( 'Arise Paris is a brand of Ronak Group.', 'arise-paris' ) . '</p>
<!-- /wp:paragraph --></div>
<!-- /wp:group -->',
		)
	);

	register_block_pattern(
		'arise-paris/blog-preview',
		array(
			'title'      => __( 'Blog Preview', 'arise-paris' ),
			'categories' => array( 'arise-paris' ),
			'content'    => '<!-- wp:query {"query":{"postType":"post","postsPerPage":3}} -->
<div class="wp-block-query"><!-- wp:post-template -->
<!-- wp:post-title /-->
<!-- wp:post-excerpt /-->
<!-- /wp:post-template --></div>
<!-- /wp:query -->',
		)
	);
}
add_action( 'init', 'arise_paris_register_block_patterns' );

/**
 * Register widget/footer areas.
 */
function arise_paris_widgets_init() {
	register_sidebar(
		array(
			'name'          => __( 'Blog Sidebar', 'arise-paris' ),
			'id'            => 'blog-sidebar',
			'before_widget' => '<div class="widget %2$s">',
			'after_widget'  => '</div>',
			'before_title'  => '<h3 class="widget-title">',
			'after_title'   => '</h3>',
		)
	);
}
add_action( 'widgets_init', 'arise_paris_widgets_init' );
