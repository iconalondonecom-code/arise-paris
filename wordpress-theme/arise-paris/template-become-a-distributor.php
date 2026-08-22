<?php
/** Template Name: Become a Distributor
 * @package Arise_Paris */
defined( 'ABSPATH' ) || exit;
get_header();
get_template_part( 'template-parts/hero/page-hero', null, array(
	'eyebrow' => __( 'Distributor Application', 'arise-paris' ),
	'heading' => __( 'Become an Arise Paris Distributor', 'arise-paris' ),
	'text'    => __( 'Share your details and our team will reach out to discuss regional distribution, wholesale and retail partnership opportunities.', 'arise-paris' ),
) );
?>
<div class="container content-area">
	<?php while ( have_posts() ) : the_post(); ?><div class="entry-content"><?php the_content(); ?></div><?php endwhile; ?>
	<?php get_template_part( 'template-parts/forms/distributor' ); ?>
</div>
<?php get_footer(); EOF

cat > "$T/template-contact.php" <<'EOF'
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
<?php get_footer(); EOF

cat > "$T/template-enquiry-list.php" <<'EOF'
<?php
/** Template Name: Enquiry List
 * @package Arise_Paris */
defined( 'ABSPATH' ) || exit;
get_header();
get_template_part( 'template-parts/hero/page-hero', null, array(
	'eyebrow' => __( 'Enquiry List', 'arise-paris' ),
	'heading' => __( 'Your Enquiry List', 'arise-paris' ),
	'text'    => __( 'Review the Arise Paris products you are interested in, then take the next step with our B2B team.', 'arise-paris' ),
) );
?>
<div class="container content-area">
	<?php while ( have_posts() ) : the_post(); ?><div class="entry-content"><?php the_content(); ?></div><?php endwhile; ?>
	<?php get_template_part( 'template-parts/forms/enquiry-list' ); ?>
</div>
<?php get_footer(); EOF

cat > "$T/template-privacy-policy.php" <<'EOF'
<?php
/** Template Name: Privacy Policy
 * @package Arise_Paris */
defined( 'ABSPATH' ) || exit;
get_header();
get_template_part( 'template-parts/hero/page-hero', null, array( 'eyebrow' => __( 'Legal', 'arise-paris' ), 'heading' => __( 'Privacy Policy', 'arise-paris' ) ) );
?>
<div class="container content-area content-area--legal">
	<?php while ( have_posts() ) : the_post(); ?><div class="entry-content"><?php the_content(); ?></div><?php endwhile; ?>
</div>
<?php get_footer(); EOF

cat > "$T/template-terms.php" <<'EOF'
<?php
/** Template Name: Terms & Conditions
 * @package Arise_Paris */
defined( 'ABSPATH' ) || exit;
get_header();
get_template_part( 'template-parts/hero/page-hero', null, array( 'eyebrow' => __( 'Legal', 'arise-paris' ), 'heading' => __( 'Terms & Conditions', 'arise-paris' ) ) );
?>
<div class="container content-area content-area--legal">
	<?php while ( have_posts() ) : the_post(); ?><div class="entry-content"><?php the_content(); ?></div><?php endwhile; ?>
</div>
<?php get_footer(); EOF

cat > "$T/template-request-catalogue.php" <<'EOF'
<?php
/** Template Name: Request Catalogue
 * @package Arise_Paris */
defined( 'ABSPATH' ) || exit;
get_header();
get_template_part( 'template-parts/hero/page-hero', null, array(
	'eyebrow' => __( 'Catalogue Request', 'arise-paris' ),
	'heading' => __( 'Request the Arise Paris Catalogue', 'arise-paris' ),
	'text'    => __( 'Share a few details about your business and our team will send you the appropriate Arise Paris product information for wholesale, import or distribution purposes.', 'arise-paris' ),
) );
?>
<div class="container content-area">
	<?php while ( have_posts() ) : the_post(); ?><div class="entry-content"><?php the_content(); ?></div><?php endwhile; ?>
	<?php get_template_part( 'template-parts/forms/catalogue' ); ?>
</div>
<?php get_footer(); EOF

cat > "$T/template-sitemap.php" <<'EOF'
<?php
/** Template Name: Sitemap
 * @package Arise_Paris */
defined( 'ABSPATH' ) || exit;
get_header();
get_template_part( 'template-parts/hero/page-hero', null, array( 'eyebrow' => __( 'Sitemap', 'arise-paris' ), 'heading' => __( 'Site Map', 'arise-paris' ) ) );
$products = get_posts( array( 'post_type' => 'arise_product', 'posts_per_page' => -1, 'orderby' => 'title', 'order' => 'ASC' ) );
$posts    = get_posts( array( 'post_type' => 'post', 'posts_per_page' => -1, 'orderby' => 'title', 'order' => 'ASC' ) );
$pages    = get_pages( array( 'sort_column' => 'post_title' ) );
?>
<div class="container content-area sitemap-grid">
	<div><h2><?php esc_html_e( 'Pages', 'arise-paris' ); ?></h2><ul><?php foreach ( $pages as $p ) : ?><li><a href="<?php echo esc_url( get_permalink( $p ) ); ?>"><?php echo esc_html( $p->post_title ); ?></a></li><?php endforeach; ?></ul></div>
	<div><h2><?php esc_html_e( 'Products', 'arise-paris' ); ?></h2><ul><?php foreach ( $products as $p ) : ?><li><a href="<?php echo esc_url( get_permalink( $p ) ); ?>"><?php echo esc_html( $p->post_title ); ?></a></li><?php endforeach; ?></ul></div>
	<div><h2><?php esc_html_e( 'Blog Posts', 'arise-paris' ); ?></h2><ul><?php foreach ( $posts as $p ) : ?><li><a href="<?php echo esc_url( get_permalink( $p ) ); ?>"><?php echo esc_html( $p->post_title ); ?></a></li><?php endforeach; ?></ul></div>
</div>
<?php get_footer(); EOF

echo ok
