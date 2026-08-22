<?php
/**
 * Generic archive fallback.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div class="container content-area">
	<h1><?php the_archive_title(); ?></h1>
	<?php the_archive_description( '<div class="archive-description">', '</div>' ); ?>
	<?php if ( have_posts() ) : ?>
		<div class="blog-grid">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article <?php post_class( 'blog-card' ); ?>>
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<p><?php echo esc_html( arise_paris_trim( get_the_excerpt(), 140 ) ); ?></p>
				</article>
			<?php endwhile; ?>
		</div>
		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<p><?php esc_html_e( 'Nothing found.', 'arise-paris' ); ?></p>
	<?php endif; ?>
</div>
<?php
get_footer();
