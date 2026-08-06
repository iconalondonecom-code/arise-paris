<?php
defined( 'ABSPATH' ) || exit;

function arise_paris_check_rate_limit( $key ) {
	$ip = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
	$transient = 'arise_rl_' . md5( $key . $ip );
	if ( get_transient( $transient ) ) {
		return false;
	}
	set_transient( $transient, 1, 30 );
	return true;
}

function arise_paris_redirect_notice( $status, $msg = '' ) {
	$ref = wp_get_referer() ? wp_get_referer() : home_url( '/' );
	$url = add_query_arg( array( 'arise_form' => $status, 'arise_msg' => rawurlencode( $msg ) ), $ref );
	wp_safe_redirect( $url );
	exit;
}

function arise_paris_send_mail( $subject, $body ) {
	$to = arise_paris_option( 'email' );
	$headers = array( 'Content-Type: text/plain; charset=UTF-8' );
	return wp_mail( $to, $subject, $body, $headers );
}

function arise_paris_handle_contact_form() {
	if ( ! isset( $_POST['arise_contact_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['arise_contact_nonce'] ) ), 'arise_contact' ) ) {
		arise_paris_redirect_notice( 'error', __( 'Security check failed.', 'arise-paris' ) );
	}
	if ( ! empty( $_POST['website'] ) ) {
		arise_paris_redirect_notice( 'success' );
	}
	if ( ! arise_paris_check_rate_limit( 'contact' ) ) {
		arise_paris_redirect_notice( 'error', __( 'Please wait before submitting again.', 'arise-paris' ) );
	}

	$name    = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
	$email   = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$phone   = isset( $_POST['phone'] ) ? sanitize_text_field( wp_unslash( $_POST['phone'] ) ) : '';
	$message = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';

	if ( ! $name || ! is_email( $email ) || ! $message ) {
		arise_paris_redirect_notice( 'error', __( 'Please complete all required fields with a valid email.', 'arise-paris' ) );
	}

	$body = "New contact enquiry\n\nName: $name\nEmail: $email\nPhone: $phone\n\nMessage:\n$message";
	arise_paris_send_mail( __( 'New Contact Enquiry - Arise Paris', 'arise-paris' ), $body );
	arise_paris_redirect_notice( 'success', __( 'Thank you, your message has been sent.', 'arise-paris' ) );
}
add_action( 'admin_post_arise_contact', 'arise_paris_handle_contact_form' );
add_action( 'admin_post_nopriv_arise_contact', 'arise_paris_handle_contact_form' );

function arise_paris_handle_distributor_form() {
	if ( ! isset( $_POST['arise_distributor_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['arise_distributor_nonce'] ) ), 'arise_distributor' ) ) {
		arise_paris_redirect_notice( 'error', __( 'Security check failed.', 'arise-paris' ) );
	}
	if ( ! empty( $_POST['website'] ) ) {
		arise_paris_redirect_notice( 'success' );
	}
	if ( ! arise_paris_check_rate_limit( 'distributor' ) ) {
		arise_paris_redirect_notice( 'error', __( 'Please wait before submitting again.', 'arise-paris' ) );
	}

	$fields = array(
		'contact_name'   => 'sanitize_text_field',
		'contact_email'  => 'sanitize_email',
		'contact_phone'  => 'sanitize_text_field',
		'company_name'   => 'sanitize_text_field',
		'business_type'  => 'sanitize_text_field',
		'country_market' => 'sanitize_text_field',
		'target_market'  => 'sanitize_text_field',
		'products_of_interest' => 'sanitize_text_field',
		'estimated_volume'     => 'sanitize_text_field',
		'message'        => 'sanitize_textarea_field',
	);
	$clean = array();
	foreach ( $fields as $key => $fn ) {
		$clean[ $key ] = isset( $_POST[ $key ] ) ? call_user_func( $fn, wp_unslash( $_POST[ $key ] ) ) : '';
	}
	if ( isset( $_POST['products_of_interest'] ) && is_array( $_POST['products_of_interest'] ) ) {
		$clean['products_of_interest'] = implode( ', ', array_map( 'sanitize_text_field', wp_unslash( $_POST['products_of_interest'] ) ) );
	}

	if ( ! $clean['contact_name'] || ! is_email( $clean['contact_email'] ) || ! $clean['company_name'] ) {
		arise_paris_redirect_notice( 'error', __( 'Please complete all required fields with a valid email.', 'arise-paris' ) );
	}

	$body = "New distributor application\n\n";
	foreach ( $clean as $k => $v ) {
		$body .= ucwords( str_replace( '_', ' ', $k ) ) . ": $v\n";
	}
	arise_paris_send_mail( __( 'New Distributor Application - Arise Paris', 'arise-paris' ), $body );
	arise_paris_redirect_notice( 'success', __( 'Thank you, your application has been received.', 'arise-paris' ) );
}
add_action( 'admin_post_arise_distributor', 'arise_paris_handle_distributor_form' );
add_action( 'admin_post_nopriv_arise_distributor', 'arise_paris_handle_distributor_form' );

function arise_paris_handle_catalogue_form() {
	if ( ! isset( $_POST['arise_catalogue_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['arise_catalogue_nonce'] ) ), 'arise_catalogue' ) ) {
		arise_paris_redirect_notice( 'error', __( 'Security check failed.', 'arise-paris' ) );
	}
	if ( ! empty( $_POST['website'] ) ) {
		arise_paris_redirect_notice( 'success' );
	}
	if ( ! arise_paris_check_rate_limit( 'catalogue' ) ) {
		arise_paris_redirect_notice( 'error', __( 'Please wait before submitting again.', 'arise-paris' ) );
	}
	$name    = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
	$email   = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$company = isset( $_POST['company'] ) ? sanitize_text_field( wp_unslash( $_POST['company'] ) ) : '';
	$country = isset( $_POST['country'] ) ? sanitize_text_field( wp_unslash( $_POST['country'] ) ) : '';

	if ( ! $name || ! is_email( $email ) ) {
		arise_paris_redirect_notice( 'error', __( 'Please provide a valid name and email.', 'arise-paris' ) );
	}
	$body = "Catalogue request\n\nName: $name\nEmail: $email\nCompany: $company\nCountry: $country";
	arise_paris_send_mail( __( 'Catalogue Request - Arise Paris', 'arise-paris' ), $body );
	arise_paris_redirect_notice( 'success', __( 'Thank you, the catalogue will be sent to your email shortly.', 'arise-paris' ) );
}
add_action( 'admin_post_arise_catalogue', 'arise_paris_handle_catalogue_form' );
add_action( 'admin_post_nopriv_arise_catalogue', 'arise_paris_handle_catalogue_form' );

function arise_paris_handle_product_enquiry_form() {
	if ( ! isset( $_POST['arise_product_enquiry_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['arise_product_enquiry_nonce'] ) ), 'arise_product_enquiry' ) ) {
		arise_paris_redirect_notice( 'error', __( 'Security check failed.', 'arise-paris' ) );
	}
	if ( ! empty( $_POST['website'] ) ) {
		arise_paris_redirect_notice( 'success' );
	}
	if ( ! arise_paris_check_rate_limit( 'product_enquiry' ) ) {
		arise_paris_redirect_notice( 'error', __( 'Please wait before submitting again.', 'arise-paris' ) );
	}
	$product = isset( $_POST['product_name'] ) ? sanitize_text_field( wp_unslash( $_POST['product_name'] ) ) : '';
	$name    = isset( $_POST['name'] ) ? sanitize_text_field( wp_unslash( $_POST['name'] ) ) : '';
	$email   = isset( $_POST['email'] ) ? sanitize_email( wp_unslash( $_POST['email'] ) ) : '';
	$message = isset( $_POST['message'] ) ? sanitize_textarea_field( wp_unslash( $_POST['message'] ) ) : '';

	if ( ! $name || ! is_email( $email ) ) {
		arise_paris_redirect_notice( 'error', __( 'Please provide a valid name and email.', 'arise-paris' ) );
	}
	$body = "Product enquiry\n\nProduct: $product\nName: $name\nEmail: $email\n\nMessage:\n$message";
	arise_paris_send_mail( __( 'Product Enquiry - Arise Paris', 'arise-paris' ), $body );
	arise_paris_redirect_notice( 'success', __( 'Thank you, your enquiry has been sent.', 'arise-paris' ) );
}
add_action( 'admin_post_arise_product_enquiry', 'arise_paris_handle_product_enquiry_form' );
add_action( 'admin_post_nopriv_arise_product_enquiry', 'arise_paris_handle_product_enquiry_form' );

function arise_paris_handle_enquiry_list_form() {
	if ( ! isset( $_POST['arise_enquiry_list_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['arise_enquiry_list_nonce'] ) ), 'arise_enquiry_list' ) ) {
		arise_paris_redirect_notice( 'error', __( 'Security check failed.', 'arise-paris' ) );
	}
	if ( ! empty( $_POST['website'] ) ) {
		arise_paris_redirect_notice( 'success' );
	}
	if ( ! arise_paris_check_rate_limit( 'enquiry_list' ) ) {
		arise_paris_redirect_notice( 'error', __( 'Please wait before submitting again.', 'arise-paris' ) );
	}

	$fields = array(
		'name'          => 'sanitize_text_field',
		'company'       => 'sanitize_text_field',
		'email'         => 'sanitize_email',
		'phone'         => 'sanitize_text_field',
		'whatsapp'      => 'sanitize_text_field',
		'country'       => 'sanitize_text_field',
		'enquiry_type'  => 'sanitize_text_field',
		'message'       => 'sanitize_textarea_field',
		'products'      => 'sanitize_textarea_field',
	);
	$clean = array();
	foreach ( $fields as $key => $fn ) {
		$clean[ $key ] = isset( $_POST[ $key ] ) ? call_user_func( $fn, wp_unslash( $_POST[ $key ] ) ) : '';
	}

	if ( ! $clean['name'] || ! is_email( $clean['email'] ) ) {
		arise_paris_redirect_notice( 'error', __( 'Please provide a valid name and email.', 'arise-paris' ) );
	}

	$body = "New enquiry list submission\n\n";
	foreach ( $clean as $k => $v ) {
		$body .= ucwords( str_replace( '_', ' ', $k ) ) . ": $v\n";
	}
	arise_paris_send_mail( __( 'Enquiry List Submission - Arise Paris', 'arise-paris' ), $body );
	arise_paris_redirect_notice( 'success', __( 'Thank you, your enquiry list has been submitted.', 'arise-paris' ) );
}
add_action( 'admin_post_arise_enquiry_list', 'arise_paris_handle_enquiry_list_form' );
add_action( 'admin_post_nopriv_arise_enquiry_list', 'arise_paris_handle_enquiry_list_form' );
