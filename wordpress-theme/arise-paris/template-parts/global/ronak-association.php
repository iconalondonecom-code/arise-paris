<?php
/**
 * Ronak Group association strip.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;
?>
<section class="ronak-association">
	<div class="container ronak-association__inner">
		<img src="<?php echo esc_url( arise_paris_option( 'logo_ronak' ) ); ?>" alt="<?php esc_attr_e( 'Ronak Group', 'arise-paris' ); ?>" width="140" height="40" loading="lazy" />
		<p>
			<?php esc_html_e( 'Arise Paris is a brand of Ronak Group.', 'arise-paris' ); ?>
			<a href="<?php echo esc_url( arise_paris_option( 'ronak_url' ) ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'Visit ronak.global', 'arise-paris' ); ?></a>
		</p>
	</div>
</section>
