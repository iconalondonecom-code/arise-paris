<?php
defined( 'ABSPATH' ) || exit;

function arise_paris_meta_fields() {
	return array(
		'product_type'        => __( 'Product Type', 'arise-paris' ),
		'net_volume'          => __( 'Net Volume', 'arise-paris' ),
		'fluid_ounce'         => __( 'Fluid Ounce', 'arise-paris' ),
		'short_description'   => __( 'Short Description', 'arise-paris' ),
		'full_description'    => __( 'Full Description', 'arise-paris' ),
		'gallery'             => __( 'Gallery (comma-separated attachment IDs)', 'arise-paris' ),
		'accent'              => __( 'Accent Colour', 'arise-paris' ),
		'glow_colour'         => __( 'Glow Colour', 'arise-paris' ),
		'mid_colour'          => __( 'Mid Colour', 'arise-paris' ),
		'deep_colour'         => __( 'Deep Colour', 'arise-paris' ),
		'visual_identity'     => __( 'Visual Identity', 'arise-paris' ),
		'brochure'            => __( 'Brochure URL', 'arise-paris' ),
		'seo_title'           => __( 'SEO Title', 'arise-paris' ),
		'meta_description'    => __( 'Meta Description', 'arise-paris' ),
		'image_alt'           => __( 'Image Alt Text', 'arise-paris' ),
		'enquiry_button_label'=> __( 'Enquiry Button Label', 'arise-paris' ),
		'display_order'       => __( 'Display Order', 'arise-paris' ),
	);
}

function arise_paris_add_meta_boxes() {
	add_meta_box( 'arise_paris_product_details', __( 'Arise Paris Product Details', 'arise-paris' ), 'arise_paris_render_meta_box', 'arise_product', 'normal', 'high' );
}
add_action( 'add_meta_boxes', 'arise_paris_add_meta_boxes' );

function arise_paris_render_meta_box( $post ) {
	wp_nonce_field( 'arise_paris_save_meta', 'arise_paris_meta_nonce' );
	echo '<table class="form-table">';
	foreach ( arise_paris_meta_fields() as $key => $label ) {
		$value = get_post_meta( $post->ID, '_arise_' . $key, true );
		echo '<tr><th><label for="arise_' . esc_attr( $key ) . '">' . esc_html( $label ) . '</label></th><td>';
		if ( in_array( $key, array( 'full_description', 'short_description' ), true ) ) {
			echo '<textarea class="widefat" rows="4" id="arise_' . esc_attr( $key ) . '" name="arise_' . esc_attr( $key ) . '">' . esc_textarea( $value ) . '</textarea>';
		} elseif ( 'accent' === $key || false !== strpos( $key, '_colour' ) ) {
			echo '<input type="text" class="regular-text" id="arise_' . esc_attr( $key ) . '" name="arise_' . esc_attr( $key ) . '" value="' . esc_attr( $value ) . '" placeholder="#000000" />';
		} else {
			echo '<input type="text" class="regular-text" id="arise_' . esc_attr( $key ) . '" name="arise_' . esc_attr( $key ) . '" value="' . esc_attr( $value ) . '" />';
		}
		echo '</td></tr>';
	}
	echo '</table>';
}

function arise_paris_save_meta_box( $post_id ) {
	if ( ! isset( $_POST['arise_paris_meta_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['arise_paris_meta_nonce'] ) ), 'arise_paris_save_meta' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	foreach ( array_keys( arise_paris_meta_fields() ) as $key ) {
		if ( ! isset( $_POST[ 'arise_' . $key ] ) ) {
			continue;
		}
		$raw = wp_unslash( $_POST[ 'arise_' . $key ] );
		if ( in_array( $key, array( 'full_description', 'short_description' ), true ) ) {
			$clean = wp_kses_post( $raw );
		} elseif ( 'brochure' === $key ) {
			$clean = esc_url_raw( $raw );
		} elseif ( 'display_order' === $key ) {
			$clean = absint( $raw );
		} else {
			$clean = sanitize_text_field( $raw );
		}
		update_post_meta( $post_id, '_arise_' . $key, $clean );
	}
}
add_action( 'save_post_arise_product', 'arise_paris_save_meta_box' );
