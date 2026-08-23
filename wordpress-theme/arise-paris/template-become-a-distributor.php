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
<?php get_footer();
