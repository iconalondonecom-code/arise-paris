<?php
/**
 * Template Name: B2B Partnership
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

get_header();

$partners = array(
	__( 'Distributors', 'arise-paris' ),
	__( 'Importers', 'arise-paris' ),
	__( 'Wholesalers', 'arise-paris' ),
	__( 'Retail Chains', 'arise-paris' ),
	__( 'Supermarkets', 'arise-paris' ),
	__( 'Fragrance & Cosmetic Stores', 'arise-paris' ),
	__( 'Online Retail', 'arise-paris' ),
	__( 'Regional Trading Companies', 'arise-paris' ),
);

$benefits = array(
	array( 'A', __( 'A Complete Shelf, One Brand', 'arise-paris' ), __( 'Eleven fragrance identities in a single 250 ml format let you fill a full planogram without juggling multiple suppliers or price lists.', 'arise-paris' ) ),
	array( 'B', __( 'Consistent, Reorderable Range', 'arise-paris' ), __( 'One format, one visual system and stable specifications make forecasting, reordering and merchandising straightforward.', 'arise-paris' ) ),
	array( 'C', __( 'Export-Ready Documentation', 'arise-paris' ), __( 'Packaging, labelling and supporting paperwork are prepared with international shipping and customs requirements in mind.', 'arise-paris' ) ),
	array( 'D', __( 'Backed by Ronak Group', 'arise-paris' ), __( 'An established manufacturer and exporter stands behind supply, quality control and long-term commercial continuity.', 'arise-paris' ) ),
	array( 'E', __( 'Responsive Commercial Teams', 'arise-paris' ), __( 'Points of contact in the UAE and India keep enquiries, samples and follow-up moving without long delays.', 'arise-paris' ) ),
	array( 'F', __( 'Built for Modern Retail', 'arise-paris' ), __( 'Distinctive enough to earn shelf space, cohesive enough to display as a family across personal-care aisles.', 'arise-paris' ) ),
);

$commercials = array(
	array( __( 'Market Focus', 'arise-paris' ), __( 'We work with partners across the Middle East, Africa, South Asia and other international markets, matching the range to local shopper preferences.', 'arise-paris' ) ),
	array( __( 'Order & Logistics', 'arise-paris' ), __( 'Order quantities, lead times and shipping terms are confirmed during commercial discussion based on destination and volume.', 'arise-paris' ) ),
	array( __( 'Brand Support', 'arise-paris' ), __( 'Product imagery, descriptions and range information are provided to support listings, catalogues and in-store presentation.', 'arise-paris' ) ),
	array( __( 'Long-Term Partnership', 'arise-paris' ), __( 'Discussions are handled by the Ronak Group commercial team with a view to an ongoing distribution relationship.', 'arise-paris' ) ),
);

$steps = array(
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
		'text'    => __( 'Arise Paris partners with distributors, importers, wholesalers and retailers who want a complete fragrance shelf from a single, dependable source.', 'arise-paris' ),
	)
);
?>
<section class="b2b-intro">
	<div class="container">
		<div class="b2b-intro__inner">
			<?php
			while ( have_posts() ) :
				the_post();
				$b2b_content = trim( get_the_content() );
				if ( $b2b_content ) :
					?>
					<div class="entry-content"><?php the_content(); ?></div>
					<?php
				else :
					?>
					<p><?php esc_html_e( 'Arise Paris is a B2B deodorant body spray brand: a focused, eleven-variant range in a consistent 250 ml / 8.45 fl. oz. format, created so that retail and wholesale partners can offer a full spread of fragrance personalities under one recognisable name.', 'arise-paris' ); ?></p>
					<p><?php esc_html_e( 'Rather than selling a single hero product, Arise Paris is designed to occupy a section of shelf — bold and warm options alongside fresh, clean and soft ones — with packaging and specifications that stay consistent across the collection. That makes listings simpler to set up, planograms easier to plan, and reorders more predictable.', 'arise-paris' ); ?></p>
					<p><?php esc_html_e( 'The brand is part of Ronak Group, an established manufacturer and exporter. Partners deal with a commercial team that is used to international trade and treats distribution as a long-term relationship.', 'arise-paris' ); ?></p>
					<?php
				endif;
			endwhile;
			?>
		</div>
	</div>
</section>

<section class="b2b-partners">
	<div class="container">
		<?php
		get_template_part(
			'template-parts/global/section-heading',
			null,
			array(
				'eyebrow' => __( 'Who We Partner With', 'arise-paris' ),
				'heading' => __( 'Channels We Supply', 'arise-paris' ),
				'align'   => 'left',
			)
		);
		?>
		<div class="b2b-partners__tags">
			<?php foreach ( $partners as $partner ) : ?>
				<span class="b2b-partners__tag"><?php echo esc_html( $partner ); ?></span>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="b2b-benefits">
	<div class="container">
		<?php
		get_template_part(
			'template-parts/global/section-heading',
			null,
			array(
				'eyebrow' => __( 'Why Partner With Arise Paris', 'arise-paris' ),
				'heading' => __( 'What the Range Offers a Buyer', 'arise-paris' ),
				'align'   => 'left',
			)
		);
		?>
		<div class="b2b-benefits__grid">
			<?php foreach ( $benefits as $benefit ) : ?>
				<article class="b2b-benefit">
					<span class="b2b-benefit__icon"><?php echo esc_html( $benefit[0] ); ?></span>
					<h3><?php echo esc_html( $benefit[1] ); ?></h3>
					<p><?php echo esc_html( $benefit[2] ); ?></p>
				</article>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="b2b-intro">
	<div class="container">
		<?php
		get_template_part(
			'template-parts/global/section-heading',
			null,
			array(
				'eyebrow' => __( 'Working Together', 'arise-paris' ),
				'heading' => __( 'How a Partnership Works in Practice', 'arise-paris' ),
				'align'   => 'left',
			)
		);
		?>
		<div class="b2b-cols">
			<?php foreach ( $commercials as $commercial ) : ?>
				<div class="b2b-cols__item">
					<h3><?php echo esc_html( $commercial[0] ); ?></h3>
					<p><?php echo esc_html( $commercial[1] ); ?></p>
				</div>
			<?php endforeach; ?>
		</div>
	</div>
</section>

<section class="b2b-process">
	<div class="container">
		<?php
		get_template_part(
			'template-parts/global/section-heading',
			null,
			array(
				'eyebrow' => __( 'Process', 'arise-paris' ),
				'heading' => __( 'How an Enquiry Moves Forward', 'arise-paris' ),
				'align'   => 'left',
			)
		);
		?>
		<ol class="b2b-process__list">
			<?php foreach ( $steps as $i => $step ) : ?>
				<li>
					<span class="b2b-process__num"><?php echo esc_html( sprintf( '%02d', $i + 1 ) ); ?></span>
					<div>
						<h3><?php echo esc_html( $step[0] ); ?></h3>
						<p><?php echo esc_html( $step[1] ); ?></p>
					</div>
				</li>
			<?php endforeach; ?>
		</ol>
	</div>
</section>
<?php get_template_part( 'template-parts/global/cta' ); ?>
<?php
get_footer();
