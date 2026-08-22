<?php
/**
 * Generic singular fallback.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div class="container content-area">
	<?php
	while ( have_posts() ) :
		the_post();
		?>
		<article <?php post_class( 'entry' ); ?>>
			<h1><?php the_title(); ?></h1>
			<div class="entry-content"><?php the_content(); ?></div>
		</article>
	<?php endwhile; ?>
</div>
<?php
get_footer();
