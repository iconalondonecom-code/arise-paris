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
<?php get_footer();
