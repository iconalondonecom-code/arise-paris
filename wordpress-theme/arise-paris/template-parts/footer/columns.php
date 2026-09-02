<?php
/**
 * Footer columns: brand + social, navigation, products, contact + parent group.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

$footer_socials = array_filter(
	array(
		'Instagram' => arise_paris_option( 'social_instagram' ),
		'Facebook'  => arise_paris_option( 'social_facebook' ),
		'LinkedIn'  => arise_paris_option( 'social_linkedin' ),
	)
);

$footer_products = get_posts(
	array(
		'post_type'      => 'arise_product',
		'posts_per_page' => 12,
		'orderby'        => 'menu_order',
		'order'          => 'ASC',
	)
);
?>
<div class="footer-columns">
	<div class="footer-column footer-column--about">
		<img src="<?php echo esc_url( arise_paris_option( 'logo_arise' ) ); ?>" alt="<?php esc_attr_e( 'Arise Paris', 'arise-paris' ); ?>" width="150" height="44" loading="lazy" />
		<p><?php echo esc_html( arise_paris_option( 'footer_description' ) ); ?></p>
		<?php if ( $footer_socials ) : ?>
			<div class="footer-social">
				<?php foreach ( $footer_socials as $label => $url ) : ?>
					<a href="<?php echo esc_url( $url ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php echo esc_attr( $label ); ?>"><?php echo esc_html( substr( $label, 0, 2 ) ); ?></a>
				<?php endforeach; ?>
			</div>
		<?php endif; ?>
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
		<h3><?php esc_html_e( 'Products', 'arise-paris' ); ?></h3>
		<?php if ( $footer_products ) : ?>
			<ul class="footer-products">
				<?php foreach ( $footer_products as $footer_product ) : ?>
					<li><a href="<?php echo esc_url( get_permalink( $footer_product ) ); ?>"><?php echo esc_html( get_the_title( $footer_product ) ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		<?php else : ?>
			<ul class="footer-collections">
				<?php foreach ( arise_paris_collections() as $slug => $collection ) : ?>
					<li><a href="<?php echo esc_url( home_url( '/products/#' . $slug ) ); ?>"><?php echo esc_html( $collection['title'] ); ?></a></li>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>
	</div>

	<div class="footer-column footer-column--contact footer-contact">
		<h3><?php esc_html_e( 'Contact', 'arise-paris' ); ?></h3>
		<address>
			<a href="mailto:<?php echo esc_attr( arise_paris_option( 'email' ) ); ?>"><?php echo esc_html( arise_paris_option( 'email' ) ); ?></a><br />
			<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', arise_paris_option( 'phone_uae' ) ) ); ?>"><?php echo esc_html( arise_paris_option( 'phone_uae' ) ); ?> <?php esc_html_e( '(UAE)', 'arise-paris' ); ?></a><br />
			<a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', arise_paris_option( 'phone_india' ) ) ); ?>"><?php echo esc_html( arise_paris_option( 'phone_india' ) ); ?> <?php esc_html_e( '(India)', 'arise-paris' ); ?></a><br />
			<?php echo esc_html( arise_paris_full_address() ); ?>
		</address>
		<div class="footer-column__ronak">
			<a href="<?php echo esc_url( arise_paris_option( 'ronak_url' ) ); ?>" target="_blank" rel="noopener noreferrer">
				<img src="<?php echo esc_url( arise_paris_option( 'logo_ronak' ) ); ?>" alt="<?php esc_attr_e( 'Ronak Group', 'arise-paris' ); ?>" width="140" height="38" loading="lazy" />
			</a>
			<p><?php esc_html_e( 'Arise Paris is a brand of Ronak Group.', 'arise-paris' ); ?></p>
		</div>
	</div>
</div>
