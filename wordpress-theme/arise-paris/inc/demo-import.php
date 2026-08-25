<?php
/**
 * One-click demo/content importer.
 *
 * Creates the 11 Arise Paris products, collection terms, all site pages with the
 * correct page templates and slugs, the blog articles, and the primary/footer
 * menus. Everything it creates is normal WordPress content, so the client can
 * edit all of it from the admin afterwards.
 *
 * Tools → Arise Paris Setup
 *
 * @package Arise_Paris
 */

defined( 'ABSPATH' ) || exit;

/**
 * Register the setup screen.
 */
function arise_paris_register_import_page() {
	add_management_page(
		__( 'Arise Paris Setup', 'arise-paris' ),
		__( 'Arise Paris Setup', 'arise-paris' ),
		'manage_options',
		'arise-paris-setup',
		'arise_paris_render_import_page'
	);
}
add_action( 'admin_menu', 'arise_paris_register_import_page' );

/**
 * Pages created by the importer: slug => [title, template, description].
 *
 * @return array<string,array<string,string>>
 */
function arise_paris_import_pages() {
	return array(
		'home'                 => array(
			'title'    => __( 'Home', 'arise-paris' ),
			'template' => '',
			'content'  => '',
		),
		'blog'                 => array(
			'title'    => __( 'Blog', 'arise-paris' ),
			'template' => '',
			'content'  => '',
		),
		'about'                => array(
			'title'    => __( 'About', 'arise-paris' ),
			'template' => 'template-about.php',
			'content'  => '',
		),
		'b2b-partnership'      => array(
			'title'    => __( 'B2B Partnership', 'arise-paris' ),
			'template' => 'template-b2b-partnership.php',
			'content'  => '',
		),
		'become-a-distributor' => array(
			'title'    => __( 'Become a Distributor', 'arise-paris' ),
			'template' => 'template-become-a-distributor.php',
			'content'  => '',
		),
		'request-catalogue'    => array(
			'title'    => __( 'Request Catalogue', 'arise-paris' ),
			'template' => 'template-request-catalogue.php',
			'content'  => '',
		),
		'contact'              => array(
			'title'    => __( 'Contact', 'arise-paris' ),
			'template' => 'template-contact.php',
			'content'  => '',
		),
		'enquiry-list'         => array(
			'title'    => __( 'Enquiry List', 'arise-paris' ),
			'template' => 'template-enquiry-list.php',
			'content'  => '',
		),
		'privacy-policy'       => array(
			'title'    => __( 'Privacy Policy', 'arise-paris' ),
			'template' => 'template-privacy-policy.php',
			'content'  => '',
		),
		'terms'                => array(
			'title'    => __( 'Terms', 'arise-paris' ),
			'template' => 'template-terms.php',
			'content'  => '',
		),
		'sitemap'              => array(
			'title'    => __( 'Sitemap', 'arise-paris' ),
			'template' => 'template-sitemap.php',
			'content'  => '',
		),
	);
}

/**
 * Render the setup screen.
 */
function arise_paris_render_import_page() {
	if ( ! current_user_can( 'manage_options' ) ) {
		return;
	}

	$done = false;
	if ( isset( $_POST['arise_paris_import'] ) && check_admin_referer( 'arise_paris_import_action', 'arise_paris_import_nonce' ) ) {
		$report = arise_paris_run_import();
		$done   = true;
	}
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Arise Paris Setup', 'arise-paris' ); ?></h1>
		<?php if ( $done ) : ?>
			<div class="notice notice-success"><p><?php echo esc_html( $report ); ?></p></div>
		<?php endif; ?>
		<p>
			<?php esc_html_e( 'This creates (or repairs) all Arise Paris content: 11 products with their colour and specification data, the four collection terms, every site page with its correct template and URL, the blog articles, and the primary and footer menus. Running it more than once is safe — existing content is updated, never duplicated, and your own edits to page bodies are preserved.', 'arise-paris' ); ?>
		</p>
		<form method="post">
			<?php wp_nonce_field( 'arise_paris_import_action', 'arise_paris_import_nonce' ); ?>
			<p>
				<button type="submit" name="arise_paris_import" value="1" class="button button-primary button-hero">
					<?php esc_html_e( 'Import / repair Arise Paris content', 'arise-paris' ); ?>
				</button>
			</p>
		</form>
		<h2><?php esc_html_e( 'After importing', 'arise-paris' ); ?></h2>
		<ol>
			<li><?php esc_html_e( 'Settings → Reading is set automatically: Home as the front page and Blog as the posts page.', 'arise-paris' ); ?></li>
			<li><?php esc_html_e( 'Settings → Permalinks: click Save once so product and article URLs resolve.', 'arise-paris' ); ?></li>
			<li><?php esc_html_e( 'Appearance → Customize → Arise Paris Brand: check contact details, WhatsApp numbers and the form destination email.', 'arise-paris' ); ?></li>
		</ol>
	</div>
	<?php
}

/**
 * Import/repair all content.
 *
 * @return string Human readable report.
 */
function arise_paris_run_import() {
	$counts = array(
		'products' => 0,
		'pages'    => 0,
		'posts'    => 0,
	);

	arise_paris_register_post_types();
	arise_paris_register_taxonomies();

	// --- Collection terms ---------------------------------------------------
	$term_ids = array();
	foreach ( arise_paris_collections() as $slug => $collection ) {
		$existing = get_term_by( 'slug', $slug, 'arise_collection' );
		if ( $existing ) {
			$term_ids[ $slug ] = (int) $existing->term_id;
			continue;
		}
		$new = wp_insert_term(
			$collection['title'],
			'arise_collection',
			array(
				'slug'        => $slug,
				'description' => $collection['description'],
			)
		);
		if ( ! is_wp_error( $new ) ) {
			$term_ids[ $slug ] = (int) $new['term_id'];
		}
	}

	// --- Products -----------------------------------------------------------
	$order   = 0;
	$colours = arise_paris_journey_colours();
	foreach ( arise_paris_products_seed_data() as $product ) {
		++$order;
		$existing = get_page_by_path( $product['slug'], OBJECT, 'arise_product' );
		$postarr  = array(
			'post_type'    => 'arise_product',
			'post_title'   => $product['name'],
			'post_name'    => $product['slug'],
			'post_status'  => 'publish',
			'post_excerpt' => $product['short_description'],
			'menu_order'   => $order,
		);

		if ( $existing ) {
			$postarr['ID'] = $existing->ID;
			$post_id       = wp_update_post( $postarr );
		} else {
			$postarr['post_content'] = '';
			$post_id                 = wp_insert_post( $postarr );
		}

		if ( is_wp_error( $post_id ) || ! $post_id ) {
			continue;
		}

		$colour = $colours[ $product['slug'] ] ?? array(
			'glow' => $product['accent'],
			'mid'  => $product['accent'],
			'deep' => '#0B0D12',
		);

		$meta = array(
			'product_type'     => $product['product_type'],
			'net_volume'       => $product['net_volume'],
			'fluid_ounce'      => $product['fluid_ounce'],
			'short_description' => $product['short_description'],
			'accent'           => $product['accent'],
			'glow_colour'      => $colour['glow'],
			'mid_colour'       => $colour['mid'],
			'deep_colour'      => $colour['deep'],
			'visual_identity'  => $product['visual_identity'],
			'seo_title'        => $product['seo_title'],
			'meta_description' => $product['meta_description'],
			'image_alt'        => $product['image_alt'],
			'display_order'    => $order,
		);
		foreach ( $meta as $key => $value ) {
			update_post_meta( $post_id, '_arise_' . $key, $value );
		}

		if ( isset( $term_ids[ $product['collection'] ] ) ) {
			wp_set_object_terms( $post_id, array( $term_ids[ $product['collection'] ] ), 'arise_collection' );
		}

		arise_paris_attach_seed_image( $post_id, $product );
		++$counts['products'];
	}

	// --- Pages --------------------------------------------------------------
	$page_ids = array();
	foreach ( arise_paris_import_pages() as $slug => $page ) {
		$existing = get_page_by_path( $slug );
		if ( $existing ) {
			$page_id = (int) $existing->ID;
		} else {
			$page_id = wp_insert_post(
				array(
					'post_type'    => 'page',
					'post_title'   => $page['title'],
					'post_name'    => $slug,
					'post_status'  => 'publish',
					'post_content' => $page['content'],
				)
			);
			++$counts['pages'];
		}
		if ( is_wp_error( $page_id ) || ! $page_id ) {
			continue;
		}
		if ( $page['template'] ) {
			update_post_meta( $page_id, '_wp_page_template', $page['template'] );
		}
		$page_ids[ $slug ] = $page_id;
	}

	if ( isset( $page_ids['home'], $page_ids['blog'] ) ) {
		update_option( 'show_on_front', 'page' );
		update_option( 'page_on_front', $page_ids['home'] );
		update_option( 'page_for_posts', $page_ids['blog'] );
	}

	// --- Blog articles ------------------------------------------------------
	if ( function_exists( 'arise_paris_posts_seed_data' ) ) {
		foreach ( arise_paris_posts_seed_data() as $article ) {
			$existing = get_page_by_path( $article['slug'], OBJECT, 'post' );
			if ( $existing ) {
				continue;
			}
			$timestamp = strtotime( $article['date'] );
			$post_id   = wp_insert_post(
				array(
					'post_type'    => 'post',
					'post_title'   => $article['title'],
					'post_name'    => $article['slug'],
					'post_status'  => 'publish',
					'post_excerpt' => $article['excerpt'],
					'post_content' => wp_kses_post( $article['content'] ),
					'post_date'    => $timestamp ? gmdate( 'Y-m-d H:i:s', $timestamp ) : current_time( 'mysql' ),
				)
			);
			if ( is_wp_error( $post_id ) || ! $post_id ) {
				continue;
			}
			$category_id = wp_create_category( $article['category'] );
			if ( $category_id ) {
				wp_set_post_categories( $post_id, array( (int) $category_id ) );
			}
			update_post_meta( $post_id, '_arise_seo_title', $article['seo_title'] );
			update_post_meta( $post_id, '_arise_meta_description', $article['meta_description'] );
			++$counts['posts'];
		}
	}

	// --- Menus --------------------------------------------------------------
	arise_paris_build_menu(
		'Arise Paris Primary',
		'primary',
		array( 'home', 'about', 'b2b-partnership', 'contact' ),
		$page_ids,
		true
	);
	arise_paris_build_menu(
		'Arise Paris Footer',
		'footer',
		array( 'about', 'b2b-partnership', 'become-a-distributor', 'request-catalogue', 'blog', 'contact', 'privacy-policy', 'terms', 'sitemap' ),
		$page_ids,
		false
	);

	flush_rewrite_rules();

	return sprintf(
		/* translators: 1: products, 2: pages, 3: posts */
		__( 'Import complete — %1$d products, %2$d new pages and %3$d new articles are ready. Now open Settings → Permalinks and click Save.', 'arise-paris' ),
		$counts['products'],
		$counts['pages'],
		$counts['posts']
	);
}

/**
 * Attach a bundled packshot as the product's featured image (once).
 *
 * @param int   $post_id Product ID.
 * @param array $product Seed row.
 */
function arise_paris_attach_seed_image( $post_id, $product ) {
	if ( has_post_thumbnail( $post_id ) || empty( $product['image'] ) ) {
		return;
	}

	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';

	$source = ARISE_PARIS_DIR . '/assets/images/' . $product['image'];
	if ( ! file_exists( $source ) ) {
		return;
	}

	$uploads = wp_upload_dir();
	$file    = trailingslashit( $uploads['path'] ) . basename( $source );
	if ( ! copy( $source, $file ) ) {
		return;
	}

	$filetype   = wp_check_filetype( basename( $file ), null );
	$attachment = array(
		'post_mime_type' => $filetype['type'],
		'post_title'     => $product['name'] . ' — ' . $product['product_type'],
		'post_status'    => 'inherit',
	);

	$attach_id = wp_insert_attachment( $attachment, $file, $post_id );
	if ( is_wp_error( $attach_id ) || ! $attach_id ) {
		return;
	}

	wp_update_attachment_metadata( $attach_id, wp_generate_attachment_metadata( $attach_id, $file ) );
	update_post_meta( $attach_id, '_wp_attachment_image_alt', $product['image_alt'] );
	set_post_thumbnail( $post_id, $attach_id );
}

/**
 * Create/refresh a nav menu and assign it to a theme location.
 *
 * @param string        $name      Menu name.
 * @param string        $location  Theme location.
 * @param array<string> $slugs     Page slugs, in order.
 * @param array         $page_ids  Slug => page ID map.
 * @param bool          $products  Whether to insert the Products archive link.
 */
function arise_paris_build_menu( $name, $location, $slugs, $page_ids, $products ) {
	$menu = wp_get_nav_menu_object( $name );
	if ( ! $menu ) {
		$menu_id = wp_create_nav_menu( $name );
		if ( is_wp_error( $menu_id ) ) {
			return;
		}
	} else {
		$menu_id = (int) $menu->term_id;
		if ( wp_get_nav_menu_items( $menu_id ) ) {
			$locations              = get_theme_mod( 'nav_menu_locations', array() );
			$locations[ $location ] = $menu_id;
			set_theme_mod( 'nav_menu_locations', $locations );
			return; // Respect an existing, already-populated menu.
		}
	}

	foreach ( $slugs as $slug ) {
		if ( 'about' === $slug && $products ) {
			wp_update_nav_menu_item(
				$menu_id,
				0,
				array(
					'menu-item-title'  => __( 'Products', 'arise-paris' ),
					'menu-item-url'    => get_post_type_archive_link( 'arise_product' ),
					'menu-item-type'   => 'custom',
					'menu-item-status' => 'publish',
				)
			);
		}
		if ( empty( $page_ids[ $slug ] ) ) {
			continue;
		}
		wp_update_nav_menu_item(
			$menu_id,
			0,
			array(
				'menu-item-object-id' => $page_ids[ $slug ],
				'menu-item-object'    => 'page',
				'menu-item-type'      => 'post_type',
				'menu-item-status'    => 'publish',
			)
		);
	}

	$locations              = get_theme_mod( 'nav_menu_locations', array() );
	$locations[ $location ] = $menu_id;
	set_theme_mod( 'nav_menu_locations', $locations );
}
