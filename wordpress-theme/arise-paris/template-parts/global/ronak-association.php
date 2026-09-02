<?php
/**
 * Brand + Ronak Group band: who Arise Paris is and how it sits within Ronak Group.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

$pillars = array(
	__( 'Eleven deodorant body sprays in one consistent 250 ml / 8.45 fl. oz. format', 'arise-paris' ),
	__( 'Distinctive fragrance identities spanning bold, fresh, rich and soft', 'arise-paris' ),
	__( 'Export-ready packaging and documentation for international B2B trade', 'arise-paris' ),
	__( 'Responsive commercial teams across the UAE and India', 'arise-paris' ),
);
?>
<section class="brand-group">
	<div class="container brand-group__inner">
		<div class="brand-group__main">
			<p class="brand-group__eyebrow"><?php esc_html_e( 'Brand &amp; Group', 'arise-paris' ); ?></p>
			<h2 class="brand-group__title"><?php esc_html_e( 'Arise Paris, a Brand of Ronak Group', 'arise-paris' ); ?></h2>
			<p class="brand-group__text"><?php esc_html_e( 'Arise Paris is the contemporary body-fragrance line of Ronak Group — a diversified manufacturer and exporter with decades of experience supplying personal-care and consumer products to markets around the world. That heritage gives distributors a dependable supply chain, consistent product quality, and a commercial partner that thinks in terms of long-term relationships rather than one-off orders.', 'arise-paris' ); ?></p>
			<ul class="brand-group__pillars">
				<?php foreach ( $pillars as $pillar ) : ?>
					<li><?php echo esc_html( $pillar ); ?></li>
				<?php endforeach; ?>
			</ul>
		</div>
		<aside class="brand-group__aside">
			<span class="brand-group__logo">
				<img src="<?php echo esc_url( arise_paris_option( 'logo_ronak' ) ); ?>" alt="<?php esc_attr_e( 'Ronak Group', 'arise-paris' ); ?>" width="160" height="44" loading="lazy" />
			</span>
			<p><?php esc_html_e( 'Ronak Group is the parent company of Arise Paris, operating across manufacturing, exports and international distribution.', 'arise-paris' ); ?></p>
			<a class="brand-group__link" href="<?php echo esc_url( arise_paris_option( 'ronak_url' ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Visit ronak.global', 'arise-paris' ); ?></a>
		</aside>
	</div>
</section>
