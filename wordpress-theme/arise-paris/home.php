<?php
/**
 * Blog index template.
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
		'eyebrow' => __( 'Journal', 'arise-paris' ),
		'heading' => __( 'The Arise Paris Blog', 'arise-paris' ),
		'text'    => __( 'Fragrance guidance, retail insight and B2B perspective from the Arise Paris team.', 'arise-paris' ),
	)
);
?>
<div class="container content-area">
	<?php if ( have_posts() ) : ?>
		<div class="blog-grid">
			<?php
			while ( have_posts() ) :
				the_post();
				?>
				<article <?php post_class( 'blog-card' ); ?>>
					<a class="blog-card__media" href="<?php the_permalink(); ?>">
						<?php if ( has_post_thumbnail() ) : ?>
							<?php the_post_thumbnail( 'arise-blog-card' ); ?>
						<?php endif; ?>
					</a>
					<div class="blog-card__body">
						<p class="blog-card__category"><?php echo esc_html( get_the_category_list( ', ' ) ); ?></p>
						<h2 class="blog-card__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
						<p class="blog-card__excerpt"><?php echo esc_html( arise_paris_trim( get_the_excerpt(), 140 ) ); ?></p>
						<?php if ( arise_paris_option( 'blog_show_date' ) ) : ?>
							<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time>
						<?php endif; ?>
					</div>
				</article>
			<?php endwhile; ?>
		</div>
		<?php the_posts_pagination(); ?>
	<?php else : ?>
		<p><?php esc_html_e( 'No blog posts yet.', 'arise-paris' ); ?></p>
	<?php endif; ?>
</div>
<?php
get_footer();
