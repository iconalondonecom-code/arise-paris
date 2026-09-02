<?php
/** Template Name: Contact
 * @package Arise_Paris */
defined( 'ABSPATH' ) || exit;
get_header();

$departments = array(
	array( __( 'Distributor & Import Enquiries', 'arise-paris' ), __( 'New distribution partnerships, territory discussions and range selection.', 'arise-paris' ) ),
	array( __( 'Wholesale & Retail', 'arise-paris' ), __( 'Wholesale supply, retail listings and reorder support for existing partners.', 'arise-paris' ) ),
	array( __( 'Product Information', 'arise-paris' ), __( 'Specifications, fragrance descriptions and packaging details for the collection.', 'arise-paris' ) ),
	array( __( 'General Enquiries', 'arise-paris' ), __( 'Anything else — media, samples or brand questions.', 'arise-paris' ) ),
);

$address_query = rawurlencode( arise_paris_full_address() );

get_template_part( 'template-parts/hero/page-hero', null, array(
	'eyebrow' => __( 'Contact', 'arise-paris' ),
	'heading' => __( 'Speak With Our Team', 'arise-paris' ),
	'text'    => __( 'Get in touch for distributor, wholesale, import and general enquiries. Our commercial teams in the UAE and India typically respond within two business days.', 'arise-paris' ),
) );
?>
<div class="container content-area content-area--split">
	<div class="contact-details">
		<?php
		while ( have_posts() ) :
			the_post();
			if ( trim( get_the_content() ) ) :
				?>
				<div class="entry-content"><?php the_content(); ?></div>
				<?php
			endif;
		endwhile;
		?>
		<p><?php esc_html_e( 'Arise Paris is a brand of Ronak Group. Whether you are planning a first order or expanding an existing listing, share a few details about your business and market and the right person will follow up.', 'arise-paris' ); ?></p>

		<ul class="contact-details__list">
			<li><span><?php esc_html_e( 'Email', 'arise-paris' ); ?></span><a href="mailto:<?php echo esc_attr( arise_paris_option( 'email' ) ); ?>"><?php echo esc_html( arise_paris_option( 'email' ) ); ?></a></li>
			<li><span><?php esc_html_e( 'UAE', 'arise-paris' ); ?></span><a href="tel:<?php echo esc_attr( preg_replace( '/\s+/', '', arise_paris_option( 'phone_uae' ) ) ); ?>"><?php echo esc_html( arise_paris_option( 'phone_uae' ) ); ?></a></li>
			<li><span><?php esc_html_e( 'India', 'arise-paris' ); ?></span><a href="<?php echo esc_url( arise_paris_option( 'whatsapp_india' ) ); ?>" target="_blank" rel="noopener noreferrer"><?php echo esc_html( arise_paris_option( 'phone_india' ) ); ?></a></li>
			<li><span><?php esc_html_e( 'Address', 'arise-paris' ); ?></span><address><?php echo esc_html( arise_paris_full_address() ); ?></address></li>
		</ul>

		<a class="btn btn-whatsapp" href="<?php echo esc_url( arise_paris_whatsapp_link() ); ?>" target="_blank" rel="noopener noreferrer"><?php esc_html_e( 'WhatsApp Now', 'arise-paris' ); ?></a>

		<p class="contact-note"><?php esc_html_e( 'Please include your company name, country and the product categories you currently sell — it helps us route your enquiry and reply with the right information first time.', 'arise-paris' ); ?></p>

		<h2><?php esc_html_e( 'Where to Direct Your Enquiry', 'arise-paris' ); ?></h2>
		<ul class="contact-departments">
			<?php foreach ( $departments as $department ) : ?>
				<li><strong><?php echo esc_html( $department[0] ); ?></strong><span><?php echo esc_html( $department[1] ); ?></span></li>
			<?php endforeach; ?>
		</ul>

		<div class="contact-map">
			<iframe
				title="<?php esc_attr_e( 'Ronak Group location map', 'arise-paris' ); ?>"
				src="https://maps.google.com/maps?q=<?php echo esc_attr( $address_query ); ?>&z=14&output=embed"
				loading="lazy"
				referrerpolicy="no-referrer-when-downgrade"
			></iframe>
		</div>
	</div>
	<div class="contact-form-wrap"><?php get_template_part( 'template-parts/forms/contact' ); ?></div>
</div>
<?php get_footer();
