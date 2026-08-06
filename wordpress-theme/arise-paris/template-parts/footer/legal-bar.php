<?php
/**
 * Footer legal bar: copyright and legal menu.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="footer-legal">
	<div class="container footer-legal__inner">
		<p><?php echo esc_html( arise_paris_option( 'copyright' ) ); ?></p>
		<nav aria-label="<?php esc_attr_e( 'Legal', 'arise-paris' ); ?>">
			<?php
			if ( has_nav_menu( 'legal' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'legal',
						'container'      => false,
						'menu_class'     => 'footer-legal-nav',
						'depth'          => 1,
					)
				);
			} else {
				?>
				<ul class="footer-legal-nav">
					<li><a href="<?php echo esc_url( home_url( '/privacy-policy/' ) ); ?>"><?php esc_html_e( 'Privacy Policy', 'arise-paris' ); ?></a></li>
					<li><a href="<?php echo esc_url( home_url( '/terms/' ) ); ?>"><?php esc_html_e( 'Terms', 'arise-paris' ); ?></a></li>
				</ul>
				<?php
			}
			?>
		</nav>
	</div>
</div>
