import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { products } from "@/data/products";
import { posts } from "@/data/blog";

export const Route = createFileRoute("/sitemap")({
  head: () => ({
    meta: [
      { title: "Sitemap | Arise Paris" },
      { name: "description", content: "Browse a full list of Arise Paris pages, products and articles." },
    ],
    links: [{ rel: "canonical", href: "/sitemap" }],
  }),
  component: SitemapPage,
});

const mainLinks = [
  { to: "/", l: "Home" },
  { to: "/about", l: "About" },
  { to: "/products", l: "Products" },
  { to: "/b2b-partnership", l: "B2B Partnership" },
  { to: "/become-a-distributor", l: "Become a Distributor" },
  { to: "/request-catalogue", l: "Request Catalogue" },
  { to: "/enquiry-list", l: "Enquiry List" },
  { to: "/blog", l: "Blog" },
  { to: "/contact", l: "Contact" },
  { to: "/privacy-policy", l: "Privacy Policy" },
  { to: "/terms", l: "Terms" },
] as const;

function SitemapPage() {
  return (
    <PageShell>
      <section className="bg-[#05091A] text-white py-20 md:py-28">
        <div className="container-wide max-w-3xl">
          <span className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold-muted)]">Sitemap</span>
          <h1 className="mt-4 font-serif text-[34px] md:text-[48px] text-white">Site Map</h1>
        </div>
      </section>
      <section className="py-16 md:py-20" style={{ background: "#07142F" }}>
        <div className="container-wide grid md:grid-cols-3 gap-12">
          <div>
            <h2 className="text-white text-sm tracking-[0.24em] uppercase mb-5">Main Pages</h2>
            <ul className="space-y-3">
              {mainLinks.map((i) => (
                <li key={i.to}><Link to={i.to} className="text-white/75 hover:text-[var(--gold-muted)]">{i.l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-white text-sm tracking-[0.24em] uppercase mb-5">Products</h2>
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p.slug}><Link to="/products/$slug" params={{ slug: p.slug }} className="text-white/75 hover:text-[var(--gold-muted)]">{p.name}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-white text-sm tracking-[0.24em] uppercase mb-5">Blog Articles</h2>
            <ul className="space-y-3">
              {posts.map((p) => (
                <li key={p.slug}><Link to="/blog/$slug" params={{ slug: p.slug }} className="text-white/75 hover:text-[var(--gold-muted)]">{p.title}</Link></li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
