<?php
defined( 'ABSPATH' ) || exit;

remove_action( 'wp_head', 'wp_generator' );
add_filter( 'xmlrpc_enabled', '__return_false' );

function arise_paris_show_form_notices() {
	if ( empty( $_GET['arise_form'] ) ) {
		return;
	}
	$status = sanitize_text_field( wp_unslash( $_GET['arise_form'] ) );
	$msg    = isset( $_GET['arise_msg'] ) ? sanitize_text_field( wp_unslash( $_GET['arise_msg'] ) ) : '';
	$class  = 'success' === $status ? 'notice-success' : 'notice-error';
	echo '<div class="form-notice ' . esc_attr( $class ) . '" role="alert">' . esc_html( $msg ) . '</div>';
}
add_action( 'arise_paris_form_notices', 'arise_paris_show_form_notices' );
