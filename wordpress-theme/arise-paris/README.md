# Arise Paris — Native WordPress Theme

A production-ready, native WordPress theme reproducing the Arise Paris "Product
Colour Journey" B2B website: eleven deodorant body spray variants, an Enquiry
List, catalogue and distributor forms, blog, and full SEO/schema output.

No page builder and no ACF licence required — product data uses standard
WordPress custom post types, taxonomies and post meta.

## Contents

```
arise-paris/
├── style.css                 Theme header + design tokens entry
├── functions.php             Bootstrap
├── index.php header.php footer.php singular.php search.php 404.php comments.php
├── front-page.php            Colour Journey homepage
├── home.php archive.php single.php               Blog
├── archive-arise_product.php single-arise_product.php taxonomy-arise_collection.php
├── template-*.php            About, B2B, Distributor, Catalogue, Contact,
│                             Enquiry List, Privacy, Terms, Sitemap
├── template-parts/           Reusable hero / product / form / global partials
├── inc/                      Setup, CPTs, taxonomies, meta boxes, Customizer,
│                             forms, enquiry list, SEO, schema, security,
│                             product-data, blog-data, demo-import
├── assets/css|js|images      Enqueued styles, scripts, packshots, logos
├── screenshot.png
└── DEPLOYMENT.md             Full step-by-step deployment guide
```

## Requirements

- WordPress 6.0+
- PHP 8.0+
- Pretty permalinks enabled
- No mandatory plugins. Optional: an SMTP plugin (WP Mail SMTP) so form emails
  deliver reliably, and a caching plugin.

## Quick start

1. Appearance → Themes → Add New → Upload Theme → `arise-paris-wordpress-theme.zip` → Activate.
2. Tools → **Arise Paris Setup** → *Import / repair Arise Paris content*.
   This creates the 11 products with colour + spec meta, the four collections,
   every page on its correct template and URL, the blog articles, and the
   primary/footer menus, then sets Home as the front page and Blog as the posts page.
3. Settings → Permalinks → Save (flushes product/article rewrite rules).
4. Appearance → Customize → **Arise Paris Brand** — confirm logos, e-mail,
   UAE/India phone numbers, WhatsApp links, address, hero copy, CTA labels and
   the form destination e-mail.

Everything imported is ordinary WordPress content, so the client edits products,
pages, articles, menus and contact details from the admin — nothing is hard-coded.

## Editing product data

Products → each product → **Arise Paris Product Details**: product type, net
volume, fluid ounce, short/full description, accent + glow/mid/deep journey
colours, visual identity, gallery attachment IDs, brochure URL, SEO title, meta
description, image alt text, enquiry button label and display order. The
featured image is the packshot.

Collections (Bold & Dynamic, Deep & Rich, Fresh & Light, Soft & Romantic) are the
`arise_collection` taxonomy.

## Forms and the Enquiry List

`inc/forms.php` handles the contact, catalogue and distributor submissions over
`admin-post.php` with nonces, a honeypot and sanitisation, e-mailing the
Customizer destination address. The Enquiry List is client-side
(`assets/js/enquiry-list.js`, localStorage) with a header counter, an
`/enquiry-list/` review page and WhatsApp / e-mail hand-off — matching the
React site, with no prices and no cart.

See `DEPLOYMENT.md` for backup, upload, verification, QA and rollback steps.
