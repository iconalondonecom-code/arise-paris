<?php
/**
 * Front page template: Colour Journey hero, explorer, collections, blog preview, CTA.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

get_header();
?>
<?php get_template_part( 'template-parts/hero/colour-journey' ); ?>

<section class="home-intro">
	<div class="container">
		<?php
		get_template_part(
			'template-parts/global/section-heading',
			null,
			array(
				'eyebrow' => __( 'Eleven Distinct Identities', 'arise-paris' ),
				'heading' => __( 'One Consistent Format, Eleven Personalities', 'arise-paris' ),
				'text'    => __( 'Every Arise Paris deodorant body spray shares a 250 ml / 8.45 fl. oz. format, so distributors can build a diverse shelf presence around a single trusted brand.', 'arise-paris' ),
			)
		);
		?>
	</div>
</section>

<section class="home-about">
	<div class="container home-about__inner">
		<div class="home-about__lead">
			<?php
			get_template_part(
				'template-parts/global/section-heading',
				null,
				array(
					'eyebrow' => __( 'The House of Arise Paris', 'arise-paris' ),
					'heading' => __( 'A Contemporary Body-Fragrance Brand, Arranged for Retail', 'arise-paris' ),
					'align'   => 'left',
				)
			);
			?>
		</div>
		<div class="home-about__body">
			<p><?php esc_html_e( 'Arise Paris brings bold, fresh, rich and soft fragrance identities together in a single deodorant body spray collection. Every variant shares one 250 ml / 8.45 fl. oz. format and a consistent visual language, so a distributor can build a full, recognisable shelf around one trusted name.', 'arise-paris' ); ?></p>
			<p><?php esc_html_e( 'The range is designed for modern personal-care aisles across international markets — distinctive enough to stand out on the shelf, cohesive enough to merchandise as a family. Behind it stands Ronak Group, the parent company, with the manufacturing and export experience to support partners at scale.', 'arise-paris' ); ?></p>
			<a class="btn btn-outline" href="<?php echo esc_url( home_url( '/about/' ) ); ?>"><?php esc_html_e( 'More About the Brand', 'arise-paris' ); ?></a>
		</div>
	</div>
</section>

<?php get_template_part( 'template-parts/products/explorer' ); ?>

<section class="home-collections">
	<div class="container">
		<?php
		get_template_part(
			'template-parts/global/section-heading',
			null,
			array(
				'eyebrow' => __( 'Curated Collections', 'arise-paris' ),
				'heading' => __( 'Explore by Personality', 'arise-paris' ),
			)
		);
		?>
		<div class="collections-grid">
			<?php foreach ( arise_paris_collections() as $slug => $collection ) :
				$term = get_term_by( 'name', $collection['title'], 'arise_collection' );
				$url  = $term ? get_term_link( $term ) : get_post_type_archive_link( 'arise_product' );
				?>
				<a class="collection-card" href="<?php echo esc_url( is_wp_error( $url ) ? get_post_type_archive_link( 'arise_product' ) : $url ); ?>">
					<h3><?php echo esc_html( $collection['title'] ); ?></h3>
					<p><?php echo esc_html( $collection['description'] ); ?></p>
				</a>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php get_template_part( 'template-parts/products/retail-shelf' ); ?>
<?php get_template_part( 'template-parts/global/ronak-association' ); ?>

<?php
$recent_posts = new WP_Query(
	array(
		'post_type'           => 'post',
		'posts_per_page'      => 3,
		'ignore_sticky_posts' => true,
		'post__not_in'        => arise_paris_placeholder_post_ids(),
		'no_found_rows'       => true,
	)
);
if ( $recent_posts->have_posts() ) :
	?>
	<section class="home-blog">
		<div class="container">
			<?php
			get_template_part(
				'template-parts/global/section-heading',
				null,
				array(
					'eyebrow' => __( 'From the Journal', 'arise-paris' ),
					'heading' => __( 'Fragrance & Retail Insight', 'arise-paris' ),
				)
			);
			?>
			<div class="blog-grid">
				<?php
				while ( $recent_posts->have_posts() ) :
					$recent_posts->the_post();
					?>
					<article <?php post_class( 'blog-card' ); ?>>
						<?php if ( has_post_thumbnail() ) : ?>
							<a class="blog-card__media" href="<?php the_permalink(); ?>">
								<?php the_post_thumbnail( 'arise-blog-card' ); ?>
							</a>
						<?php endif; ?>
						<div class="blog-card__body">
							<?php $category = get_the_category_list( ', ' ); ?>
							<?php if ( $category ) : ?>
								<p class="blog-card__category"><?php echo esc_html( wp_strip_all_tags( $category ) ); ?></p>
							<?php endif; ?>
							<h3 class="blog-card__title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
							<p class="blog-card__excerpt"><?php echo esc_html( arise_paris_trim( get_the_excerpt(), 120 ) ); ?></p>
						</div>
					</article>
				<?php endwhile; ?>
			</div>
		</div>
	</section>
	<?php
	wp_reset_postdata();
endif;
?>

<?php
get_template_part(
	'template-parts/global/cta',
	null,
	array(
		'heading' => arise_paris_option( 'cta_secondary_label' ) ? __( 'Partner with Arise Paris', 'arise-paris' ) : __( 'Partner with Arise Paris', 'arise-paris' ),
		'text'    => __( 'Join our growing network of international distributors, wholesalers and retailers.', 'arise-paris' ),
	)
);
?>
<?php
get_footer();
