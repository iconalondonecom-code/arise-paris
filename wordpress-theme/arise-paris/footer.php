<?php
/**
 * Footer template.
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;
?>
</main>
<footer class="site-footer">
	<div class="container">
		<?php get_template_part( 'template-parts/footer/columns' ); ?>
	</div>
	<?php get_template_part( 'template-parts/footer/legal-bar' ); ?>
</footer>
<?php get_template_part( 'template-parts/global/whatsapp-float' ); ?>
<?php wp_footer(); ?>
</body>
</html>
