<?php
/** Template Name: Contact
 * @package Arise_Paris */
defined( 'ABSPATH' ) || exit;
get_header();
get_template_part( 'template-parts/hero/page-hero', null, array(
	'eyebrow' => __( 'Contact', 'arise-paris' ),
	'heading' => __( 'Speak With Our Team', 'arise-paris' ),
	'text'    => __( 'Get in touch for distributor, wholesale, import and general enquiries.', 'arise-paris' ),
) );
?>
<div class="container content-area content-area--split">
	<div class="contact-details">
		<?php while ( have_posts() ) : the_post(); ?><div class="entry-content"><?php the_content(); ?></div><?php endwhile; ?>
		<ul class="contact-details__list">
			<li><span><?php esc_html_e( 'Email', 'arise-paris' ); ?></span><a href="mailto:<?php echo esc_attr( arise_paris_option( 'email' ) ); ?>"><?php echo esc_html( arise_paris_option( 'email' ) ); ?></a></li>
			<li><span><?php esc_html_e( 'UAE', 'arise-paris' ); ?></span><a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', arise_paris_option( 'phone_uae' ) ) ); ?>"><?php echo esc_html( arise_paris_option( 'phone_uae' ) ); ?></a></li>
			<li><span><?php esc_html_e( 'India', 'arise-paris' ); ?></span><a href="<?php echo esc_url( arise_paris_option( 'whatsapp_india' ) ); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html( arise_paris_option( 'phone_india' ) ); ?></a></li>
			<li><span><?php esc_html_e( 'Address', 'arise-paris' ); ?></span><address><?php echo esc_html( arise_paris_full_address() ); ?></address></li>
		</ul>
		<a class="btn btn-whatsapp" href="<?php echo esc_url( arise_paris_whatsapp_link() ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'WhatsApp Now', 'arise-paris' ); ?></a>
	</div>
	<div class="contact-form-wrap"><?php get_template_part( 'template-parts/forms/contact' ); ?></div>
</div>
<?php get_footer();
