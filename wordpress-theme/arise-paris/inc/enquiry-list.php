<?php
defined( 'ABSPATH' ) || exit;

function arise_paris_enquiry_list_badge() {
	echo '<button type="button" class="enquiry-list-toggle" aria-haspopup="dialog" aria-controls="enquiry-list-drawer" aria-label="' . esc_attr__( 'Open enquiry list', 'arise-paris' ) . '">' .
		'<span class="enquiry-list-icon" aria-hidden="true">&#9776;</span>' .
		'<span class="enquiry-list-count" data-enquiry-count>0</span></button>';
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
