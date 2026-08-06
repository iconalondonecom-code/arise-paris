import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { products } from "@/data/products";
import { posts } from "@/data/blog";

const BASE_URL = "https://sweet-hug-station.lovable.app";

const staticPaths = [
  "/",
  "/about",
  "/products",
  "/b2b-partnership",
  "/become-a-distributor",
  "/request-catalogue",
  "/enquiry-list",
  "/blog",
  "/contact",
  "/sitemap",
  "/privacy-policy",
  "/terms",
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const urls = [
          ...staticPaths,
          ...products.map((p) => `/products/${p.slug}`),
          ...posts.map((p) => `/blog/${p.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
          .map((u) => `  <url><loc>${BASE_URL}${u}</loc></url>`)
          .join("\n")}\n</urlset>`;
        return new Response(body, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
