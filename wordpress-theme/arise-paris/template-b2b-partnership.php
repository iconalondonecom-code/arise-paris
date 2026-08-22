<?php
/**
 * Template Name: B2B Partnership
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

get_header();
$partners = array( __( 'Distributors', 'arise-paris' ), __( 'Importers', 'arise-paris' ), __( 'Wholesalers', 'arise-paris' ), __( 'Retail Chains', 'arise-paris' ), __( 'Supermarkets', 'arise-paris' ), __( 'Fragrance & Cosmetic Stores', 'arise-paris' ), __( 'Online Retail', 'arise-paris' ), __( 'Regional Trading Companies', 'arise-paris' ) );
$steps    = array(
	array( __( 'Submit an enquiry', 'arise-paris' ), __( 'Share your interest through our distributor or contact form.', 'arise-paris' ) ),
	array( __( 'Tell us about your business', 'arise-paris' ), __( 'Company, market reach and current product categories.', 'arise-paris' ) ),
	array( __( 'Select products of interest', 'arise-paris' ), __( 'Choose the Arise Paris variants that fit your market.', 'arise-paris' ) ),
	array( __( 'Discuss commercial requirements', 'arise-paris' ), __( 'Our team follows up with the appropriate commercial information.', 'arise-paris' ) ),
	array( __( 'Continue with Ronak Group', 'arise-paris' ), __( 'Discussions move forward with the Ronak Group commercial team.', 'arise-paris' ) ),
);
?>
<?php
get_template_part(
	'template-parts/hero/page-hero',
	null,
	array(
		'eyebrow' => __( 'B2B Partnerships', 'arise-paris' ),
		'heading' => __( 'Distribution, Built on a Distinctive Range', 'arise-paris' ),
	)
);
?>
<div class="container content-area">
	<?php while ( have_posts() ) : the_post(); ?>
		<div class="entry-content"><?php the_content(); ?></div>
	<?php endwhile; ?>

	<section class="b2b-partners">
		<h2><?php esc_html_e( 'Who We Partner With', 'arise-paris' ); ?></h2>
		<div class="b2b-partners__tags">
			<?php foreach ( $partners as $partner ) : ?>
				<span class="b2b-partners__tag"><?php echo esc_html( $partner ); ?></span>
			<?php endforeach; ?>
		</div>
	</section>

	<section class="b2b-process">
		<h2><?php esc_html_e( 'How an Enquiry Moves Forward', 'arise-paris' ); ?></h2>
		<ol class="b2b-process__list">
			<?php foreach ( $steps as $i => $step ) : ?>
				<li><span class="b2b-process__num"><?php echo esc_html( sprintf( '%02d', $i + 1 ) ); ?></span><div><h3><?php echo esc_html( $step[0] ); ?></h3><p><?php echo esc_html( $step[1] ); ?></p></div></li>
			<?php endforeach; ?>
		</ol>
	</section>
</div>
<?php get_template_part( 'template-parts/global/cta' ); ?>
<?php
get_footer();
