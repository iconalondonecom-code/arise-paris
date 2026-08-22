<?php
/**
 * Products archive template.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<?php
get_template_part(
	'template-parts/hero/page-hero',
	null,
	array(
		'eyebrow' => __( 'The Collection', 'arise-paris' ),
		'heading' => __( 'Eleven Distinctive Deodorant Body Sprays', 'arise-paris' ),
		'text'    => __( 'A consistent 250 ml / 8.45 fl. oz. format across every variant, built for international B2B distribution.', 'arise-paris' ),
	)
);
?>
<div class="container content-area">
	<?php
	global $wp_query;
	get_template_part( 'template-parts/products/filters', null, array( 'total' => $wp_query->found_posts ) );
	get_template_part( 'template-parts/products/grid', null, array( 'query' => $wp_query ) );
	?>
</div>
<?php get_template_part( 'template-parts/global/cta' ); ?>
<?php
get_footer();
