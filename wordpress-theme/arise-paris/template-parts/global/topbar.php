<?php
/**
 * Top utility bar: contact details.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="topbar">
	<div class="container topbar__inner">
		<div class="topbar__contact">
			<a href="mailto:<?php echo esc_attr( arise_paris_option( 'email' ) ); ?>"><?php echo esc_html( arise_paris_option( 'email' ) ); ?></a>
			<span class="topbar__divider" aria-hidden="true">|</span>
			<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', arise_paris_option( 'phone_uae' ) ) ); ?>"><?php echo esc_html( arise_paris_option( 'phone_uae' ) ); ?></a>
			<span class="topbar__divider" aria-hidden="true">|</span>
			<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', arise_paris_option( 'phone_india' ) ) ); ?>"><?php echo esc_html( arise_paris_option( 'phone_india' ) ); ?></a>
		</div>
		<div class="topbar__cta">
			<a class="btn btn-ghost btn-small" href="<?php echo esc_url( home_url( '/become-a-distributor/' ) ); ?>"><?php esc_html_e( 'Become a Distributor', 'arise-paris' ); ?></a>
		</div>
	</div>
</div>
