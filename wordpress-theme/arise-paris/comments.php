<?php
/**
 * Comments template.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

if ( post_password_required() ) {
	return;
}
?>
<div class="comments-area">
	<?php if ( have_comments() ) : ?>
		<h2 class="comments-title">
			<?php
			printf(
				/* translators: %d: number of comments. */
				esc_html( _n( '%d Comment', '%d Comments', get_comments_number(), 'arise-paris' ) ),
				(int) get_comments_number()
			);
			?>
		</h2>
		<ol class="comment-list">
			<?php
			wp_list_comments(
				array(
					'style'      => 'ol',
					'short_ping' => true,
				)
			);
			?>
		</ol>
		<?php the_comments_navigation(); ?>
	<?php endif; ?>

	<?php if ( ! comments_open() && get_comments_number() && post_type_supports( get_post_type(), 'comments' ) ) : ?>
		<p class="no-comments"><?php esc_html_e( 'Comments are closed.', 'arise-paris' ); ?></p>
	<?php endif; ?>

	<?php
	comment_form(
		array(
			'class_submit' => 'btn btn-primary',
		)
	);
	?>
</div>
