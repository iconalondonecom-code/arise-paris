<?php
/**
 * Collection taxonomy archive template.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

get_header();
$term = get_queried_object();
?>
<?php
get_template_part(
	'template-parts/hero/page-hero',
	null,
	array(
		'eyebrow' => __( 'Collection', 'arise-paris' ),
		'heading' => $term ? $term->name : __( 'Collection', 'arise-paris' ),
		'text'    => $term ? $term->description : '',
	)
);
?>
<div class="container content-area">
	<?php
	global $wp_query;
	get_template_part( 'template-parts/products/grid', null, array( 'query' => $wp_query ) );
	?>
</div>
<?php get_template_part( 'template-parts/global/cta' ); ?>
<?php
get_footer();
