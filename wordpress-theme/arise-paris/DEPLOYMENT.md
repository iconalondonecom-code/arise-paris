# Arise Paris — WordPress Deployment Guide

Follow these steps in order. Allow roughly 45–60 minutes including QA.

> **Verification note:** this theme was built and reviewed on a machine with no PHP
> or WordPress runtime available, so every file has been checked by careful manual
> read-through (structure, brace/paren balance, WordPress API usage) but **not**
> executed — no `php -l` lint and no real theme activation has been run against it.
> Treat **Step 4 (Activate)** on a staging site, not production, as the first real
> test of this theme, and complete Step 14 (console/PHP-log check) before pointing
> a live domain at it.

---

## 1. Back up the current WordPress site

Do this before anything else.

1. **Files + database via plugin:** install *UpdraftPlus* (or *All-in-One WP
   Migration*) → Backup Now → tick database, plugins, themes, uploads → run it →
   download the archive to your own computer.
2. **Or via hosting panel:** cPanel/Plesk → Backup → download a full account
   backup; or in phpMyAdmin select the database → Export → Quick → SQL.
3. Note which theme is currently active (Appearance → Themes) — you need this
   name for rollback.
4. Confirm the backup file actually downloaded and is non-zero in size.

---

## 2. Get the theme ZIP

1. The installable file is `wordpress-theme/arise-paris-wordpress-theme.zip` in the
   project repository (built from the `wordpress-theme/arise-paris/` theme folder).
2. Copy it to the machine you'll use to access WordPress Admin.
3. Do **not** unzip it — WordPress needs the ZIP as-is.

---

## 3. Upload the theme

1. WordPress Admin → **Appearance → Themes → Add New → Upload Theme**.
2. Choose `arise-paris-wordpress-theme.zip` → **Install Now**.
3. If you get "the link you followed has expired", the upload limit is too low.
   Ask your host to raise `upload_max_filesize` and `post_max_size` to 64M, or
   upload the extracted `arise-paris` folder to `/wp-content/themes/` over SFTP.

---

## 4. Activate

1. Themes → **Arise Paris** → **Activate**.
2. The site front end will look unstyled/empty until step 6 — that is expected.

---

## 5. Plugins

The theme needs **no** mandatory plugins. Recommended:

| Plugin | Why | Configuration |
|---|---|---|
| WP Mail SMTP | Reliable delivery of contact/catalogue/distributor e-mails | Connect your SMTP or provider (SendGrid/Brevo), send a test e-mail |
| A caching plugin (WP Rocket / LiteSpeed Cache / W3 Total Cache) | Performance | Enable page cache + CSS/JS minification; purge after deploys |
| Rank Math or Yoast (optional) | Editorial SEO control | The theme already outputs titles, meta descriptions, canonical, Open Graph and JSON-LD. If you activate an SEO plugin, disable its social/schema output or the theme's in `inc/seo.php` to avoid duplicates |

---

## 6. Import products, collections, pages, articles and menus

1. **Tools → Arise Paris Setup**.
2. Click **Import / repair Arise Paris content**.

This creates/repairs:

- 11 `arise_product` posts with packshot featured images, colour journey values
  and specification meta;
- the four `arise_collection` terms;
- Home, Blog, About, B2B Partnership, Become a Distributor, Request Catalogue,
  Contact, Enquiry List, Privacy Policy, Terms, Sitemap — each with the correct
  page template and slug;
- the blog articles with categories and SEO meta;
- the **Arise Paris Primary** and **Arise Paris Footer** menus, assigned to their
  theme locations;
- Settings → Reading: Home as the static front page, Blog as the posts page.

Re-running it is safe: existing items are updated, not duplicated, and page
bodies and already-populated menus you have edited are left alone.

**If you already have products or posts in another plugin/CPT:** keep them and
skip the product part of the import — instead create `arise_product` entries and
paste the data into the *Arise Paris Product Details* box, or export/import via
WordPress Tools → Import (WordPress importer) and then re-run this setup to fill
menus and pages only.

---

## 7. Menus

1. **Appearance → Menus**.
2. Confirm *Arise Paris Primary* is assigned to **Primary** and *Arise Paris
   Footer* to **Footer**.
3. Reorder or add items as needed (e.g. add Products sub-items per collection).
4. Save.

---

## 8. Homepage and blog page

1. **Settings → Reading** → "Your homepage displays: A static page".
2. Homepage = **Home**, Posts page = **Blog**. Save.
3. Posts per page: 9 works well with the blog grid.

---

## 9. Permalinks and URLs

1. **Settings → Permalinks** → choose **Post name** → **Save Changes** (save even
   if it is already selected — this flushes rewrite rules).
2. Verify these all load:
   - `/` `/about/` `/products/` `/b2b-partnership/` `/become-a-distributor/`
     `/request-catalogue/` `/contact/` `/enquiry-list/` `/blog/`
     `/privacy-policy/` `/terms/` `/sitemap/`
   - a product: `/products/signature/`
   - a collection: `/collection/bold-dynamic/`
   - an article: `/how-to-choose-deodorant-body-spray/`

---

## 10. Test the forms and Enquiry List

1. Appearance → Customize → Arise Paris Brand → set the destination e-mail.
2. Submit the **Contact**, **Request Catalogue** and **Distributor** forms with
   real data; confirm the success message and that the e-mail arrives (check
   spam). If nothing arrives, configure SMTP (step 5).
3. Submit a form with empty required fields — inline validation must block it.
4. Enquiry List:
   - Add 2–3 products via **Add to Enquiry** on cards and product pages;
   - the header counter increments;
   - `/enquiry-list/` lists them with images and lets you remove items;
   - the list survives a page reload (localStorage);
   - **Send via WhatsApp** opens WhatsApp pre-filled with the product names;
   - **Send by e-mail** submits and delivers the list.

---

## 11. Responsiveness QA

Check desktop (1440/1280), tablet (1024/768) and mobile (390/360):

- hero headline and the colour journey carousel — the selected bottle is fully
  visible cap-to-base and not overlapped by arrows, dots or the WhatsApp tab;
- mobile menu opens, traps focus, closes;
- product grid reflows to 2 columns (tablet) / 1 column (mobile);
- forms are single column with full-width fields on mobile;
- footer columns stack;
- no horizontal scrollbar at any width.

---

## 12. Clear cache

1. Purge the caching plugin's cache.
2. Purge your host/CDN cache (Cloudflare → Caching → Purge Everything).
3. Hard-reload the site (Ctrl/Cmd + Shift + R) and re-check in a private window.

---

## 12b. Branding assets (Customizer)

Appearance → Customize → **Arise Paris Settings → Branding**:

| Field | Default |
| --- | --- |
| Arise Paris Logo URL | `assets/images/logos/arise-paris.png` |
| Ronak Group Logo URL | `assets/images/logos/ronak-group.png` |
| Social Share Image URL | `assets/images/logos/og-image.png` |

> **Both logo files are white artwork on a transparent background.** They are
> designed for the dark navy header, footer and bands, and are invisible on any
> light background. If you place either logo somewhere light, put a dark plate
> behind it — this is why `.ronak-association__inner img` carries a navy
> background in `assets/css/main.css`.
>
> For the same reason `og:image` must **not** point at the bare logo: social
> platforms flatten transparency onto white and the card renders blank. The
> Social Share Image field defaults to `og-image.png`, a 1200x630 card with the
> logo pre-composited on navy. Replace it with your own 1200x630 image if you
> prefer, but keep it opaque.

---

## 13. SEO, sitemap, indexing

1. View source on the homepage and one product page: unique `<title>`, meta
   description, `rel=canonical`, `og:*`, `twitter:card`, and JSON-LD
   (Organization / Product / BreadcrumbList).
2. Sitemap: `/wp-sitemap.xml` (WordPress core) or your SEO plugin's sitemap.
3. Settings → Reading → **uncheck** "Discourage search engines from indexing".
4. Submit the sitemap in Google Search Console and request indexing for the
   homepage and `/products/`.
5. Run the URLs through Google's Rich Results Test and PageSpeed Insights.

---

## 14. Final checks

- Browser console: no JS errors on home, a product page, and a form page.
- PHP: enable `WP_DEBUG_LOG` temporarily and confirm `wp-content/debug.log`
  records no notices from the theme, then disable it.
- Broken links: run *Broken Link Checker* or a crawl (Screaming Frog).
- All images load, including logos, packshots and blog thumbnails.
- Fonts (Cormorant Garamond + Manrope) load from Google Fonts.
- Tools → Site Health shows no critical issues.

---

## 15. Rollback

If anything is wrong:

1. **Appearance → Themes → activate the previous theme.** Content is untouched,
   so the old site returns immediately.
2. If the admin is unreachable, rename `/wp-content/themes/arise-paris` over
   SFTP — WordPress falls back to a default theme.
3. To undo imported content: Products → bulk delete the `arise_product` entries,
   Pages → trash the imported pages, Posts → trash the imported articles,
   Appearance → Menus → delete the two Arise Paris menus, Settings → Reading →
   restore the previous homepage setting.
4. Full revert: restore the backup from step 1 (UpdraftPlus → Restore, or import
   the SQL dump and restore `wp-content`).
5. Purge all caches afterwards.
