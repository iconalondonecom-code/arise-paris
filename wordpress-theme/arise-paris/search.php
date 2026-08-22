<?php
/**
 * Search results template.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<div class="container content-area">
	<h1>
		<?php
		/* translators: %s: search query. */
		printf( esc_html__( 'Search Results for: %s', 'arise-paris' ), '<span>' . esc_html( get_search_query() ) . '</span>' );
		?>
	</h1>
	<?php if ( have_posts() ) : ?>
		<div class="search-results-list">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article <?php post_class( 'search-result' ); ?>>
					<h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
					<p><?php echo esc_html( arise_paris_trim( get_the_excerpt(), 160 ) ); ?></p>
				</article>
			<?php endwhile; ?>
		</div>
		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<p><?php esc_html_e( 'No results found. Try a different search term.', 'arise-paris' ); ?></p>
		<?php get_search_form(); ?>
	<?php endif; ?>
</div>
<?php
get_footer();
