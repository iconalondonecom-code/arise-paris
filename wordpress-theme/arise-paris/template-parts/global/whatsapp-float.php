<?php
/**
 * Floating WhatsApp button (secondary CTA, never primary conversion path).
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

if ( ! arise_paris_option( 'floating_whatsapp' ) ) {
	return;
}
?>
<a class="whatsapp-float" href="<?php echo esc_url( arise_paris_whatsapp_link() ); ?>" target="_blank" rel="noopener noreferrer" aria-label="<?php esc_attr_e( 'WhatsApp Our Team', 'arise-paris' ); ?>">
	<svg viewBox="0 0 32 32" width="26" height="26" aria-hidden="true" focusable="false"><path fill="currentColor" d="M16 3C9 3 3.3 8.6 3.3 15.6c0 2.6.7 5 2 7.1L3 29l6.5-2.2c2 .9 4.2 1.3 6.5 1.3 7 0 12.7-5.6 12.7-12.6C28.7 8.6 23 3 16 3zm0 22.9c-2 0-4-.5-5.7-1.5l-.4-.2-3.9 1.3 1.3-3.8-.3-.4c-1.1-1.7-1.7-3.7-1.7-5.7 0-5.9 4.8-10.7 10.7-10.7S26.7 9.7 26.7 15.6 21.9 25.9 16 25.9zm5.9-8c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1.1-1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-2-1.8-2.3-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.8-1-2.4-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.2 3.3 5.3 4.7.7.3 1.3.5 1.7.7.7.2 1.4.2 1.9.1.6-.1 1.9-.8 2.1-1.5.3-.7.3-1.4.2-1.5-.1-.1-.3-.2-.6-.4z"/></svg>
</a>
