<?php
defined( 'ABSPATH' ) || exit;

function arise_paris_customize_register( $wp_customize ) {
	$defaults = arise_paris_defaults();

	$wp_customize->add_panel( 'arise_paris_settings', array(
		'title'    => __( 'Arise Paris Settings', 'arise-paris' ),
		'priority' => 30,
	) );

	$sections = array(
		'branding' => __( 'Branding', 'arise-paris' ),
		'contact'  => __( 'Contact & Locations', 'arise-paris' ),
		'social'   => __( 'Social & Footer', 'arise-paris' ),
		'hero'     => __( 'Homepage Hero', 'arise-paris' ),
		'behavior' => __( 'Behaviour', 'arise-paris' ),
	);
	foreach ( $sections as $id => $title ) {
		$wp_customize->add_section( 'arise_paris_' . $id, array(
			'title' => $title,
			'panel' => 'arise_paris_settings',
		) );
	}

	$fields = array(
		'logo_arise'            => array( 'branding', 'text', __( 'Arise Paris Logo URL', 'arise-paris' ) ),
		'logo_ronak'            => array( 'branding', 'text', __( 'Ronak Group Logo URL', 'arise-paris' ) ),
		'og_image'              => array( 'branding', 'text', __( 'Social Share Image URL', 'arise-paris' ) ),
		'email'                 => array( 'contact', 'text', __( 'Contact Email', 'arise-paris' ) ),
		'phone_uae'             => array( 'contact', 'text', __( 'UAE Phone', 'arise-paris' ) ),
		'phone_india'           => array( 'contact', 'text', __( 'India Phone', 'arise-paris' ) ),
		'whatsapp_uae'          => array( 'contact', 'text', __( 'WhatsApp UAE Link', 'arise-paris' ) ),
		'whatsapp_india'        => array( 'contact', 'text', __( 'WhatsApp India Link', 'arise-paris' ) ),
		'whatsapp_message'      => array( 'contact', 'textarea', __( 'Default WhatsApp Message', 'arise-paris' ) ),
		'address_line1'         => array( 'contact', 'text', __( 'Address Line 1', 'arise-paris' ) ),
		'address_line2'         => array( 'contact', 'text', __( 'Address Line 2', 'arise-paris' ) ),
		'address_line3'         => array( 'contact', 'text', __( 'Address Line 3', 'arise-paris' ) ),
		'address_city'          => array( 'contact', 'text', __( 'City/State/Postcode', 'arise-paris' ) ),
		'address_country'       => array( 'contact', 'text', __( 'Country', 'arise-paris' ) ),
		'ronak_url'             => array( 'social', 'text', __( 'Ronak Group URL', 'arise-paris' ) ),
		'social_instagram'      => array( 'social', 'text', __( 'Instagram URL', 'arise-paris' ) ),
		'social_facebook'       => array( 'social', 'text', __( 'Facebook URL', 'arise-paris' ) ),
		'social_linkedin'       => array( 'social', 'text', __( 'LinkedIn URL', 'arise-paris' ) ),
		'footer_description'    => array( 'social', 'textarea', __( 'Footer Description', 'arise-paris' ) ),
		'copyright'             => array( 'social', 'text', __( 'Copyright Text', 'arise-paris' ) ),
		'catalogue_destination' => array( 'contact', 'text', __( 'Catalogue Request Destination Email (optional)', 'arise-paris' ) ),
		'hero_heading'          => array( 'hero', 'text', __( 'Hero Heading', 'arise-paris' ) ),
		'hero_supporting'       => array( 'hero', 'textarea', __( 'Hero Supporting Text', 'arise-paris' ) ),
		'cta_primary_label'     => array( 'hero', 'text', __( 'Primary CTA Label', 'arise-paris' ) ),
		'cta_secondary_label'   => array( 'hero', 'text', __( 'Secondary CTA Label', 'arise-paris' ) ),
	);

	foreach ( $fields as $key => $meta ) {
		list( $section, $type, $label ) = $meta;
		$wp_customize->add_setting( 'arise_paris_' . $key, array(
			'default'           => $defaults[ $key ] ?? '',
			'sanitize_callback' => 'textarea' === $type ? 'sanitize_textarea_field' : 'sanitize_text_field',
		) );
		$wp_customize->add_control( 'arise_paris_' . $key, array(
			'label'   => $label,
			'section' => 'arise_paris_' . $section,
			'type'    => $type,
		) );
	}

	foreach ( array( 'blog_show_date', 'floating_whatsapp' ) as $key ) {
		$wp_customize->add_setting( 'arise_paris_' . $key, array(
			'default'           => $defaults[ $key ],
			'sanitize_callback' => 'rest_sanitize_boolean',
		) );
		$wp_customize->add_control( 'arise_paris_' . $key, array(
			'label'   => 'blog_show_date' === $key ? __( 'Show blog post dates', 'arise-paris' ) : __( 'Show floating WhatsApp button', 'arise-paris' ),
			'section' => 'blog_show_date' === $key ? 'arise_paris_behavior' : 'arise_paris_behavior',
			'type'    => 'checkbox',
		) );
	}
}
add_action( 'customize_register', 'arise_paris_customize_register' );
