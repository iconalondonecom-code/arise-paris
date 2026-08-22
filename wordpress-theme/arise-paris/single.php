<?php
/**
 * Single blog post template.
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
		'eyebrow' => get_the_category_list( ', ' ),
		'heading' => get_the_title(),
	)
);
?>
<div class="container content-area content-area--single">
	<?php
	while ( have_posts() ) :
		the_post();
		?>
		<article <?php post_class( 'entry' ); ?>>
			<div class="entry-meta">
				<?php if ( arise_paris_option( 'blog_show_date' ) ) : ?>
					<time datetime="<?php echo esc_attr( get_the_date( 'c' ) ); ?>"><?php echo esc_html( get_the_date() ); ?></time>
				<?php endif; ?>
				<span class="entry-meta__author"><?php the_author(); ?></span>
			</div>
			<?php if ( has_post_thumbnail() ) : ?>
				<div class="entry-thumbnail"><?php the_post_thumbnail( 'arise-blog-card' ); ?></div>
			<?php endif; ?>
			<div class="entry-content"><?php the_content(); ?></div>
			<footer class="entry-footer">
				<?php the_tags( '<span class="entry-tags">', ', ', '</span>' ); ?>
			</footer>
		</article>
		<?php
		get_template_part(
			'template-parts/global/cta',
			null,
			array(
				'heading' => __( 'Interested in Distributing Arise Paris?', 'arise-paris' ),
				'text'    => __( 'Connect with our team to explore wholesale and distribution opportunities.', 'arise-paris' ),
			)
		);
		if ( comments_open() || get_comments_number() ) {
			comments_template();
		}
	endwhile;
	?>
</div>
<?php
get_footer();
