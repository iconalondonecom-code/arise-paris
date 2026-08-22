<?php
/**
 * Default page template.
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
	array( 'heading' => get_the_title() )
);
?>
<div class="container content-area">
	<?php
	while ( have_posts() ) :
		the_post();
		?>
		<article <?php post_class( 'entry' ); ?>>
			<div class="entry-content"><?php the_content(); ?></div>
		</article>
		<?php
		if ( comments_open() || get_comments_number() ) {
			comments_template();
		}
	endwhile;
	?>
</div>
<?php
get_footer();
