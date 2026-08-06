<?php
/**
 * Primary site navigation.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;
?>
<div class="site-nav" id="site-nav">
	<div class="container site-nav__inner">
		<a class="site-logo" href="<?php echo esc_url( home_url( '/' ) ); ?>">
			<img src="<?php echo esc_url( arise_paris_option( 'logo_arise' ) ); ?>" alt="<?php esc_attr_e( 'Arise Paris', 'arise-paris' ); ?>" width="160" height="48" />
		</a>

		<button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-menu" aria-label="<?php esc_attr_e( 'Toggle navigation menu', 'arise-paris' ); ?>">
			<span class="nav-toggle__bar"></span>
			<span class="nav-toggle__bar"></span>
			<span class="nav-toggle__bar"></span>
		</button>

		<nav class="primary-nav" id="primary-menu" aria-label="<?php esc_attr_e( 'Primary', 'arise-paris' ); ?>">
			<?php
			if ( has_nav_menu( 'primary' ) ) {
				wp_nav_menu(
					array(
						'theme_location' => 'primary',
						'container'      => false,
						'menu_class'     => 'primary-nav__list',
						'depth'          => 2,
					)
				);
			} else {
				arise_paris_nav_fallback( 'primary' );
			}
			?>
		</nav>

		<div class="site-nav__actions">
			<?php arise_paris_enquiry_list_badge(); ?>
			<a class="btn btn-primary btn-small" href="<?php echo esc_url( home_url( '/products/' ) ); ?>"><?php esc_html_e( 'Explore Collection', 'arise-paris' ); ?></a>
		</div>
	</div>
</div>
