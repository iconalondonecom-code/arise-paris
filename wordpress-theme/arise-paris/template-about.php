<?php
/**
 * Template Name: About
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
		'eyebrow' => __( 'About Arise Paris', 'arise-paris' ),
		'heading' => __( 'A Fragrance Identity, Arranged for the Shelf', 'arise-paris' ),
		'text'    => __( 'Arise Paris brings bold, fresh, rich and soft identities together in a single 250 ml deodorant body spray collection, built for international B2B retail.', 'arise-paris' ),
	)
);
?>
<div class="container content-area">
	<?php while ( have_posts() ) : the_post(); ?>
		<div class="entry-content"><?php the_content(); ?></div>
	<?php endwhile; ?>

	<section class="about-chapters">
		<h2><?php esc_html_e( 'The Story, in Three Chapters', 'arise-paris' ); ?></h2>
		<ol class="about-chapters__list">
			<li><span class="about-chapters__num">01</span><div><h3><?php esc_html_e( 'The Brand', 'arise-paris' ); ?></h3><p><?php esc_html_e( 'Arise Paris is built for modern personal-care shelves — distinctive packaging, considered identities, a range made for retailers and distributors who want more than a single note.', 'arise-paris' ); ?></p></div></li>
			<li><span class="about-chapters__num">02</span><div><h3><?php esc_html_e( 'The Collection', 'arise-paris' ); ?></h3><p><?php esc_html_e( 'Eleven deodorant body sprays, each 250 ml / 8.45 fl. oz., spanning bold, deep and soft personalities within one cohesive family.', 'arise-paris' ); ?></p></div></li>
			<li><span class="about-chapters__num">03</span><div><h3><?php esc_html_e( 'The Partnership', 'arise-paris' ); ?></h3><p><?php esc_html_e( 'We work with distributors, importers, wholesalers and retailers for the long term, backed by responsive commercial teams and a clear brand story.', 'arise-paris' ); ?></p></div></li>
		</ol>
	</section>

	<?php get_template_part( 'template-parts/global/ronak-association' ); ?>
</div>
<?php get_template_part( 'template-parts/global/cta' ); ?>
<?php
get_footer();
