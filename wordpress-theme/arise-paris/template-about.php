<?php
/**
 * Template Name: About
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

get_header();

$values = array(
	__( 'Distinctive Identity', 'arise-paris' ),
	__( 'Modern Presentation', 'arise-paris' ),
	__( 'Everyday Appeal', 'arise-paris' ),
	__( 'Business Partnership', 'arise-paris' ),
	__( 'Consistent Experience', 'arise-paris' ),
);

$chapters = array(
	array( __( 'The Brand', 'arise-paris' ), __( 'Arise Paris is built for modern personal-care shelves — distinctive packaging, considered identities, and a range made for retailers and distributors who want more than a single note.', 'arise-paris' ) ),
	array( __( 'The Collection', 'arise-paris' ), __( 'Eleven deodorant body sprays, each 250 ml / 8.45 fl. oz., spanning bold, deep and soft personalities within one cohesive family.', 'arise-paris' ) ),
	array( __( 'The Partnership', 'arise-paris' ), __( 'We work with distributors, importers, wholesalers and retailers for the long term, backed by responsive commercial teams and a clear brand story.', 'arise-paris' ) ),
);
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
<section class="about-intro-section">
	<div class="container">
		<div class="about-intro">
			<?php
			while ( have_posts() ) :
				the_post();
				$about_content = trim( get_the_content() );
				if ( $about_content ) :
					?>
					<div class="entry-content"><?php the_content(); ?></div>
					<?php
				else :
					?>
					<p><?php esc_html_e( 'Arise Paris is a contemporary body-fragrance brand offering a distinctive collection of 250 ml deodorant body sprays for international B2B customers. The brand was created to give retailers a complete, recognisable fragrance shelf — one format, one visual language, and a spread of personalities wide enough to suit very different shoppers.', 'arise-paris' ); ?></p>
					<p><?php esc_html_e( 'Every variant is developed around a clear identity: some bold and warm, others fresh and clean, others soft and understated. Held together by consistent packaging and a single 250 ml / 8.45 fl. oz. format, the range is easy to merchandise, easy to reorder, and easy for shoppers to navigate.', 'arise-paris' ); ?></p>
					<p><?php esc_html_e( 'Arise Paris is a brand of Ronak Group, a diversified manufacturer and exporter. That backing means partners work with an established supply chain and a commercial team that supports distribution relationships over the long term.', 'arise-paris' ); ?></p>
					<?php
				endif;
			endwhile;
			?>
		</div>
	</div>
</section>

<section class="about-chapters">
	<div class="container">
		<?php
		get_template_part(
			'template-parts/global/section-heading',
			null,
			array(
				'eyebrow' => __( 'The Story', 'arise-paris' ),
				'heading' => __( 'In Three Chapters', 'arise-paris' ),
				'align'   => 'left',
			)
		);
		?>
		<ol class="about-chapters__list">
			<?php foreach ( $chapters as $i => $chapter ) : ?>
				<li>
					<span class="about-chapters__num"><?php echo esc_html( sprintf( '%02d', $i + 1 ) ); ?></span>
					<div>
						<h3><?php echo esc_html( $chapter[0] ); ?></h3>
						<p><?php echo esc_html( $chapter[1] ); ?></p>
					</div>
				</li>
			<?php endforeach; ?>
		</ol>
	</div>
</section>

<section class="about-values">
	<div class="container">
		<?php
		get_template_part(
			'template-parts/global/section-heading',
			null,
			array(
				'eyebrow' => __( 'What We Stand For', 'arise-paris' ),
				'heading' => __( 'The Ideas Behind the Range', 'arise-paris' ),
				'align'   => 'left',
			)
		);
		?>
		<div class="about-values__list">
			<?php foreach ( $values as $index => $value ) : ?>
				<span><i><?php echo esc_html( sprintf( '%02d', $index + 1 ) ); ?></i><?php echo esc_html( $value ); ?></span>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<?php get_template_part( 'template-parts/global/ronak-association' ); ?>
<?php get_template_part( 'template-parts/global/cta' ); ?>
<?php
get_footer();
