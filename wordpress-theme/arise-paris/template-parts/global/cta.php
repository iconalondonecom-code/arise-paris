<?php
/**
 * Reusable CTA band. Args: heading, text, primary_label, primary_url, secondary_label, secondary_url.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

$heading         = $args['heading'] ?? __( 'Partner with Arise Paris', 'arise-paris' );
$text            = $args['text'] ?? __( 'Join our network of international distributors, wholesalers and retailers.', 'arise-paris' );
$primary_label   = $args['primary_label'] ?? __( 'Become a Distributor', 'arise-paris' );
$primary_url     = $args['primary_url'] ?? home_url( '/become-a-distributor/' );
$secondary_label = $args['secondary_label'] ?? __( 'WhatsApp Our Team', 'arise-paris' );
$secondary_url   = $args['secondary_url'] ?? arise_paris_whatsapp_link();
?>
<section class="cta-band">
	<div class="container cta-band__inner">
		<h2><?php echo esc_html( $heading ); ?></h2>
		<p><?php echo esc_html( $text ); ?></p>
		<div class="cta-band__actions">
			<a class="btn btn-primary" href="<?php echo esc_url( $primary_url ); ?>"><?php echo esc_html( $primary_label ); ?></a>
			<a class="btn btn-outline" href="<?php echo esc_url( $secondary_url ); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html( $secondary_label ); ?></a>
		</div>
	</div>
</section>
