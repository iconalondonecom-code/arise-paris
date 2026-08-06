<?php
/**
 * Generic interior page hero. Args: eyebrow, heading, text.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

$eyebrow = $args['eyebrow'] ?? '';
$heading = $args['heading'] ?? get_the_title();
$text    = $args['text'] ?? '';
?>
<header class="page-hero">
	<div class="container page-hero__inner">
		<?php if ( $eyebrow ) : ?>
			<p class="page-hero__eyebrow"><?php echo esc_html( $eyebrow ); ?></p>
		<?php endif; ?>
		<h1 class="page-hero__title"><?php echo esc_html( $heading ); ?></h1>
		<?php if ( $text ) : ?>
			<p class="page-hero__text"><?php echo esc_html( $text ); ?></p>
		<?php endif; ?>
	</div>
</header>
