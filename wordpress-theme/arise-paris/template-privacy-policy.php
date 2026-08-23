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
<?php get_footer();
