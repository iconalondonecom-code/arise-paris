<?php
/**
 * Styles and scripts enqueue.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

/**
 * Enqueue front-end assets.
 */
function arise_paris_enqueue_assets() {
	wp_enqueue_style(
		'arise-paris-fonts',
		'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&display=swap',
		array(),
		null
	);

	$main_path = ARISE_PARIS_DIR . '/assets/css/main.css';
	wp_enqueue_style( 'arise-paris-main', ARISE_PARIS_URI . '/assets/css/main.css', array(), file_exists( $main_path ) ? filemtime( $main_path ) : ARISE_PARIS_VERSION );

	$resp_path = ARISE_PARIS_DIR . '/assets/css/responsive.css';
	wp_enqueue_style( 'arise-paris-responsive', ARISE_PARIS_URI . '/assets/css/responsive.css', array( 'arise-paris-main' ), file_exists( $resp_path ) ? filemtime( $resp_path ) : ARISE_PARIS_VERSION );

	wp_enqueue_style( 'arise-paris-style', get_stylesheet_uri(), array(), ARISE_PARIS_VERSION );

	$scripts = array(
		'arise-paris-accessibility' => 'assets/js/accessibility.js',
		'arise-paris-navigation'    => 'assets/js/navigation.js',
		'arise-paris-product-journey' => 'assets/js/product-journey.js',
		'arise-paris-enquiry-list'  => 'assets/js/enquiry-list.js',
		'arise-paris-forms'         => 'assets/js/forms.js',
	);

	foreach ( $scripts as $handle => $rel_path ) {
		$path = ARISE_PARIS_DIR . '/' . $rel_path;
		wp_enqueue_script(
			$handle,
			ARISE_PARIS_URI . '/' . $rel_path,
			array(),
			file_exists( $path ) ? filemtime( $path ) : ARISE_PARIS_VERSION,
			array(
				'strategy'  => 'defer',
				'in_footer' => true,
			)
		);
	}

	wp_localize_script(
		'arise-paris-enquiry-list',
		'AriseParisData',
		array(
			'ajaxUrl'         => admin_url( 'admin-post.php' ),
			'whatsappUae'     => arise_paris_option( 'whatsapp_uae' ),
			'whatsappIndia'   => arise_paris_option( 'whatsapp_india' ),
			'whatsappMessage' => arise_paris_option( 'whatsapp_message' ),
			'strings'         => array(
				'itemAdded'   => __( 'Added to your enquiry list', 'arise-paris' ),
				'itemRemoved' => __( 'Removed from your enquiry list', 'arise-paris' ),
				'listEmpty'   => __( 'Your enquiry list is empty.', 'arise-paris' ),
			),
		)
	);

	wp_localize_script(
		'arise-paris-forms',
		'AriseParisForms',
		array(
			'requiredMessage' => __( 'This field is required.', 'arise-paris' ),
			'invalidEmail'    => __( 'Please enter a valid email address.', 'arise-paris' ),
		)
	);

	if ( is_singular() ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'arise_paris_enqueue_assets' );

/**
 * Enqueue block-editor styles matching the front end.
 */
function arise_paris_editor_assets() {
	wp_enqueue_style( 'arise-paris-editor-style', ARISE_PARIS_URI . '/assets/css/editor.css', array(), ARISE_PARIS_VERSION );
}
add_action( 'enqueue_block_editor_assets', 'arise_paris_editor_assets' );
