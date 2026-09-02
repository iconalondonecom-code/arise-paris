<?php
defined( 'ABSPATH' ) || exit;

function arise_paris_enquiry_list_badge() {
	$icon = '<svg class="enquiry-list-icon" aria-hidden="true" focusable="false" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">'
		. '<path d="M9 3h6a1 1 0 0 1 1 1v1H8V4a1 1 0 0 1 1-1Z"/>'
		. '<path d="M8 5H6a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2"/>'
		. '<path d="M9 12h6M9 16h4"/></svg>';

	echo '<button type="button" class="enquiry-list-toggle" aria-haspopup="dialog" aria-controls="enquiry-list-drawer" aria-label="' . esc_attr__( 'Open enquiry list', 'arise-paris' ) . '">'
		. $icon // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- static markup.
		. '<span class="enquiry-list-label">' . esc_html__( 'Enquiry', 'arise-paris' ) . '</span>'
		. '<span class="enquiry-list-count" data-enquiry-count>0</span></button>';
}

function arise_paris_enquiry_list_drawer() {
	?>
	<div id="enquiry-list-drawer" class="enquiry-list-drawer" role="dialog" aria-modal="true" aria-label="<?php esc_attr_e( 'Enquiry List', 'arise-paris' ); ?>" hidden>
		<div class="enquiry-list-drawer__inner">
			<div class="enquiry-list-drawer__head">
				<h2><?php esc_html_e( 'Your Enquiry List', 'arise-paris' ); ?></h2>
				<button type="button" class="enquiry-list-close" aria-label="<?php esc_attr_e( 'Close', 'arise-paris' ); ?>">&times;</button>
			</div>
			<ul class="enquiry-list-items" data-enquiry-items></ul>
			<p class="enquiry-list-empty" data-enquiry-empty><?php esc_html_e( 'Your enquiry list is empty.', 'arise-paris' ); ?></p>
			<div class="enquiry-list-actions">
				<button type="button" class="btn btn-secondary" data-enquiry-clear><?php esc_html_e( 'Clear List', 'arise-paris' ); ?></button>
				<a class="btn btn-primary" href="<?php echo esc_url( home_url( '/enquiry-list/' ) ); ?>"><?php esc_html_e( 'Go to Enquiry Form', 'arise-paris' ); ?></a>
			</div>
		</div>
	</div>
	<?php
}
add_action( 'wp_footer', 'arise_paris_enquiry_list_drawer' );
