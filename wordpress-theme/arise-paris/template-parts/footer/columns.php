<?php
/**
 * Footer columns: about, navigation, products, contact.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="footer-columns">
	<div class="footer-column footer-column--about">
		<img src="<?php echo esc_url( arise_paris_option( 'logo_arise' ) ); ?>" alt="<?php esc_attr_e( 'Arise Paris', 'arise-paris' ); ?>" width="150" height="44" loading="lazy" />
		<p><?php echo esc_html( arise_paris_option( 'footer_description' ) ); ?></p>
		<p class="footer-column__ronak"><?php esc_html_e( 'Arise Paris is a brand of Ronak Group.', 'arise-paris' ); ?></p>
	</div>

	<div class="footer-column">
		<h3><?php esc_html_e( 'Navigate', 'arise-paris' ); ?></h3>
		<?php
		if ( has_nav_menu( 'footer' ) ) {
			wp_nav_menu(
				array(
					'theme_location' => 'footer',
					'container'      => false,
					'menu_class'     => 'footer-nav',
					'depth'          => 1,
				)
			);
		} else {
			arise_paris_nav_fallback( 'footer' );
		}
		?>
	</div>

	<div class="footer-column">
		<h3><?php esc_html_e( 'Collections', 'arise-paris' ); ?></h3>
		<ul class="footer-collections">
			<?php foreach ( arise_paris_collections() as $slug => $collection ) : ?>
				<li><a href="<?php echo esc_url( home_url( '/products/#' . $slug ) ); ?>"><?php echo esc_html( $collection['title'] ); ?></a></li>
			<?php endforeach; ?>
		</ul>
	</div>

	<div class="footer-column">
		<h3><?php esc_html_e( 'Contact', 'arise-paris' ); ?></h3>
		<address>
			<a href="mailto:<?php echo esc_attr( arise_paris_option( 'email' ) ); ?>"><?php echo esc_html( arise_paris_option( 'email' ) ); ?></a><br />
			<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', arise_paris_option( 'phone_uae' ) ) ); ?>"><?php echo esc_html( arise_paris_option( 'phone_uae' ) ); ?> (UAE)</a><br />
			<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', arise_paris_option( 'phone_india' ) ) ); ?>"><?php echo esc_html( arise_paris_option( 'phone_india' ) ); ?> (India)</a><br />
			<?php echo esc_html( arise_paris_full_address() ); ?>
		</address>
	</div>
</div>
