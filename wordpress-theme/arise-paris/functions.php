<?php
/**
 * Arise Paris theme bootstrap.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

define( 'ARISE_PARIS_VERSION', '1.0.2' );
define( 'ARISE_PARIS_DIR', get_template_directory() );
define( 'ARISE_PARIS_URI', get_template_directory_uri() );

$arise_paris_includes = array(
	'inc/helpers.php',
	'inc/product-data.php',
	'inc/blog-data.php',
	'inc/setup.php',
	'inc/enqueue.php',
	'inc/custom-post-types.php',
	'inc/taxonomies.php',
	'inc/meta-boxes.php',
	'inc/customizer.php',
	'inc/seo.php',
	'inc/schema.php',
	'inc/forms.php',
	'inc/enquiry-list.php',
	'inc/security.php',
	'inc/demo-import.php',
);

foreach ( $arise_paris_includes as $arise_paris_file ) {
	$path = ARISE_PARIS_DIR . '/' . $arise_paris_file;
	if ( file_exists( $path ) ) {
		require_once $path;
	}
}
unset( $arise_paris_includes, $arise_paris_file, $path );
