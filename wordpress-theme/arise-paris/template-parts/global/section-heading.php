<?php
/**
 * Reusable section heading. Args: eyebrow, heading, text, align.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

$eyebrow = $args['eyebrow'] ?? '';
$heading = $args['heading'] ?? '';
$text    = $args['text'] ?? '';
$align   = $args['align'] ?? 'center';
?>
<div class="section-heading section-heading--<?php echo esc_attr( $align ); ?>">
	<?php if ( $eyebrow ) : ?>
		<p class="section-heading__eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
	<?php endif; ?>
	<?php if ( $heading ) : ?>
		<h2 class="section-heading__title"><?php echo esc_html( $heading ); ?></h2>
	<?php endif; ?>
	<?php if ( $text ) : ?>
		<p class="section-heading__text"><?php echo esc_html( $text ); ?></p>
	<?php endif; ?>
</div>
