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
<?php get_footer();
