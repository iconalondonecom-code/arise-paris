import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { SectionHeading } from "@/components/SectionHeading";
import { EnquiryCTA } from "@/components/EnquiryCTA";
import { AriseCrest } from "@/components/AriseCrest";
import { products, collections, productsByCollection } from "@/data/products";
import { posts } from "@/data/blog";
import { site, waLink } from "@/data/site";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles, Layers, Droplets, Handshake, Globe2 } from "lucide-react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

const slides = [
  {
    eyebrow: "The Arise Paris Collection",
    title: "Arise with Confidence.",
    subtitle:
      "Discover the Arise Paris collection of 250 ml deodorant body sprays created for expressive everyday fragrance.",
    cta: { label: "Explore the Collection", to: "/products" },
    ctaAlt: { label: "Become a Distributor", to: "/become-a-distributor" },
    products: ["active-man", "goodness-oud", "black-musk", "romantic"],
    gradient: "linear-gradient(135deg, #0A0A0A 0%, #171717 55%, #2A1608 100%)",
  },
  {
    eyebrow: "For Distributors & Retailers",
    title: "Distinctive fragrance. Strong retail presence.",
    subtitle:
      "A diverse body spray collection developed for distributors, wholesalers and modern retail markets.",
    cta: { label: "View All Products", to: "/products" },
    ctaAlt: { label: "Request Catalogue", to: "/request-catalogue" },
    products: ["active-man", "goodness-oud", "addiction", "barcelona"],
    gradient: "linear-gradient(135deg, #0F2542 0%, #0A0A0A 50%, #7A1E1E 100%)",
  },
  {
    eyebrow: "Global B2B Partnerships",
    title: "Partner with Arise Paris.",
    subtitle:
      "Build your fragrance portfolio with a distinctive body spray brand backed by Ronak Group.",
    cta: { label: "Distributor Enquiry", to: "/become-a-distributor" },
    ctaAlt: { label: "Contact Our Team", to: "/contact" },
    products: ["crush", "forest-spice", "romantic", "black-musk"],
    gradient: "linear-gradient(135deg, #171717 0%, #4a3520 100%)",
  },
];

function HomePage() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 6500);
    return () => clearInterval(t);
  }, []);
  const slide = slides[idx];
  const slideProducts = slide.products
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean) as typeof products;

  return (
    <PageShell transparentHeader>
      {/* HERO */}
      <section
        className="relative min-h-[100vh] flex items-center overflow-hidden text-white"
        style={{ background: slide.gradient, transition: "background 1.2s ease" }}
      >
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
          <AriseCrest className="absolute -left-24 top-1/4 h-[500px] w-[500px]" color="white" />
        </div>
        <div className="container-lux relative grid lg:grid-cols-2 gap-12 items-center pt-32 pb-20">
          <div key={idx} className="fade-up">
            <span className="eyebrow text-[var(--gold)]">{slide.eyebrow}</span>
            <h1 className="mt-5 text-5xl md:text-6xl lg:text-7xl leading-[1.02] font-serif">
              {slide.title}
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl">{slide.subtitle}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to={slide.cta.to}
                className="group inline-flex items-center gap-3 bg-[var(--gold)] text-[var(--ink)] px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-white transition"
              >
                {slide.cta.label}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
              </Link>
              <Link
                to={slide.ctaAlt.to}
                className="inline-flex items-center border border-white/25 px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition"
              >
                {slide.ctaAlt.label}
              </Link>
            </div>
            <div className="mt-16 flex items-center gap-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Slide ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`h-[2px] transition-all ${i === idx ? "w-12 bg-[var(--gold)]" : "w-6 bg-white/30"}`}
                />
              ))}
            </div>
          </div>

          <div className="relative h-[500px] hidden lg:block" key={"prod-" + idx}>
            <div className="fade-up absolute inset-0 flex items-end justify-center gap-4">
              {slideProducts.map((p, i) => (
                <div
                  key={p.slug}
                  className="relative"
                  style={{
                    transform: `translateY(${i % 2 === 0 ? "-20px" : "20px"})`,
                    zIndex: 10 - i,
                  }}
                >
                  {p.image ? (
                    <img src={p.image} alt={p.imageAlt} className="h-[420px] w-auto object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.5)]" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BRAND INTRO */}
      <section className="relative py-24 md:py-32 bg-[var(--warm-white)] overflow-hidden">
        <AriseCrest className="absolute -right-32 top-1/2 -translate-y-1/2 h-[600px] w-[600px] opacity-[0.04]" color="#0A0A0A" />
        <div className="container-lux relative grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="eyebrow">About Arise Paris</span>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-[var(--ink)]">
              Everyday fragrance with a distinctive identity.
            </h2>
          </div>
          <div>
            <p className="text-lg text-[var(--body)] leading-relaxed">
              Arise Paris is a contemporary body fragrance brand offering a diverse collection of deodorant body sprays designed around confidence, individuality and visual appeal. Each 250 ml variant carries its own distinctive identity, giving distributors and retailers a versatile fragrance range for modern personal-care markets.
            </p>
            <p className="mt-4 text-sm text-[var(--gold)] tracking-[0.2em] uppercase">
              Arise Paris is a brand of Ronak Group.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/about" className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[var(--ink)] border-b border-[var(--gold)] pb-1 hover:text-[var(--gold)]">
                Discover Our Story <ArrowRight className="h-3 w-3" />
              </Link>
              <Link to="/products" className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[var(--body)] hover:text-[var(--ink)]">
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 md:py-32 bg-[var(--ivory)]">
        <div className="container-lux">
          <SectionHeading
            eyebrow="The Collection"
            title="Discover the Collection"
            subtitle="Eleven distinctive deodorant body sprays, each with its own identity — presented in a generous 250 ml / 8.45 fl. oz. format."
          />
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.slice(0, 8).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/products" className="inline-flex items-center gap-3 bg-[var(--ink)] text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[var(--gold)] hover:text-[var(--ink)] transition">
              View All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* COLLECTION PERSONALITIES */}
      <section className="py-24 md:py-32 bg-[var(--warm-white)]">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Collection Personalities"
            title="Curated by character"
            subtitle="Three editorial groups help distributors and retailers navigate the Arise Paris range."
          />
          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {(Object.entries(collections) as [keyof typeof collections, (typeof collections)[keyof typeof collections]][]).map(([key, group]) => {
              const items = productsByCollection(key);
              return (
                <div key={key} className="group bg-[var(--ivory)] border border-[var(--border)] p-8 hover:border-[var(--gold)] transition">
                  <div className="flex gap-1 items-end h-40 mb-6">
                    {items.slice(0, 4).map((p) => (
                      <div key={p.slug} className="flex-1 h-full rounded-sm relative overflow-hidden" style={{ background: p.gradient }}>
                        {p.image && (
                          <img src={p.image} alt="" className="absolute inset-0 h-full w-full object-contain object-bottom" />
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="eyebrow">{items.length} Variants</span>
                  <h3 className="mt-2 text-3xl text-[var(--ink)]">{group.title}</h3>
                  <p className="mt-3 text-sm text-[var(--body)] leading-relaxed">{group.description}</p>
                  <ul className="mt-4 space-y-1 text-sm text-[var(--body)]">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-[var(--gold)]">
                          — {p.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHY ARISE */}
      <section className="py-24 md:py-32 bg-[var(--ivory)]">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Why Arise Paris"
            title="Made to stand out on every shelf"
          />
          <div className="mt-16 grid gap-px bg-[var(--border)] md:grid-cols-2 lg:grid-cols-5 border border-[var(--border)]">
            {[
              { Icon: Sparkles, title: "Distinctive Product Identities", body: "Every variant features a unique visual personality and recognizable retail presentation." },
              { Icon: Layers, title: "Versatile Collection", body: "A broad range of product styles suitable for different customer preferences and retail environments." },
              { Icon: Droplets, title: "Generous 250 ml Format", body: "Each body spray is presented in a practical 250 ml / 8.45 fl. oz. format." },
              { Icon: Handshake, title: "B2B Focused", body: "Developed for distributors, wholesalers, retailers and international commercial partnerships." },
              { Icon: Globe2, title: "Backed by Ronak Group", body: "Supported by the experience and business network of Ronak Group." },
            ].map((c) => (
              <div key={c.title} className="bg-[var(--warm-white)] p-8">
                <c.Icon className="h-6 w-6 text-[var(--gold)]" />
                <h4 className="mt-5 text-lg text-[var(--ink)] font-serif">{c.title}</h4>
                <p className="mt-2 text-sm text-[var(--body)] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* B2B DARK SECTION */}
      <section className="relative py-24 md:py-32 bg-[var(--ink)] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{
          backgroundImage: "radial-gradient(circle at 30% 40%, var(--gold), transparent 50%)",
        }} />
        <div className="container-lux relative grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="eyebrow">B2B Distribution</span>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl leading-[1.05]">Grow with Arise Paris.</h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              We welcome enquiries from distributors, importers, wholesalers, supermarkets, fragrance stores, beauty retailers and personal-care businesses looking to expand their product portfolio with a distinctive body spray collection.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/become-a-distributor" className="bg-[var(--gold)] text-[var(--ink)] px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-white transition">Become a Distributor</Link>
              <Link to="/request-catalogue" className="border border-white/25 px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition">Request Catalogue</Link>
              <a href={waLink()} target="_blank" rel="noreferrer" className="border border-white/25 px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition">WhatsApp Our Team</a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
            {["Importers", "Distributors", "Wholesalers", "Supermarkets", "Personal-Care Retailers", "Fragrance Stores", "E-commerce Retailers", "Regional Trading Companies"].map((t) => (
              <div key={t} className="bg-[var(--ink)] p-6">
                <div className="h-8 w-8 border border-[var(--gold)] text-[var(--gold)] grid place-items-center text-xs mb-3">✦</div>
                <p className="text-sm">{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GLOBAL */}
      <section className="py-24 md:py-32 bg-[var(--warm-white)]">
        <div className="container-lux">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="eyebrow">Global Partnerships</span>
              <h2 className="mt-4 text-4xl md:text-5xl leading-[1.05] text-[var(--ink)]">Built for international B2B partnerships.</h2>
              <p className="mt-6 text-[var(--body)] leading-relaxed text-lg">
                Arise Paris is positioned for business partners seeking visually distinctive personal-care products and dependable commercial communication across international markets.
              </p>
              <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-[var(--body)]">
                {["Global enquiries welcome", "International distribution", "Regional partnerships", "Export & wholesale enquiries"].map((s) => (
                  <li key={s} className="flex gap-2"><span className="text-[var(--gold)]">◆</span>{s}</li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square max-w-md mx-auto lg:ml-auto lg:mr-0">
              <svg viewBox="0 0 400 400" className="w-full h-full">
                <circle cx="200" cy="200" r="180" fill="none" stroke="var(--border)" strokeWidth="1" />
                <circle cx="200" cy="200" r="130" fill="none" stroke="var(--border)" strokeWidth="1" />
                <circle cx="200" cy="200" r="80" fill="none" stroke="var(--border)" strokeWidth="1" />
                {[[100, 140], [280, 100], [320, 220], [130, 280], [220, 320], [200, 60], [70, 200], [330, 150]].map(([x, y], i) => (
                  <g key={i}>
                    <circle cx={x} cy={y} r="5" fill="var(--gold)" />
                    <line x1="200" y1="200" x2={x} y2={y} stroke="var(--gold)" strokeWidth="0.5" strokeDasharray="2 3" />
                  </g>
                ))}
                <circle cx="200" cy="200" r="10" fill="var(--ink)" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* SHOWCASE BANNER */}
      <section className="relative py-32 md:py-40 bg-[var(--ink)] overflow-hidden text-white text-center">
        <div className="absolute inset-0 flex items-end justify-center gap-2 opacity-30">
          {products.filter(p => p.image).slice(0, 8).map((p, i) => (
            <img
              key={p.slug}
              src={p.image!}
              alt=""
              className="h-[70%] w-auto object-contain"
              style={{ transform: `translateY(${(i % 2) * 30}px)` }}
            />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--ink)] via-[var(--ink)]/70 to-[var(--ink)]/40" />
        <div className="container-lux relative">
          <span className="eyebrow">The Complete Range</span>
          <h2 className="mt-4 text-4xl md:text-6xl lg:text-7xl leading-[1.05] max-w-4xl mx-auto">
            Eleven distinctive expressions. One Arise Paris collection.
          </h2>
          <p className="mt-6 text-white/70 text-lg max-w-2xl mx-auto">
            Explore a diverse 250 ml deodorant body spray range created for strong visual impact and everyday fragrance appeal.
          </p>
          <Link to="/products" className="mt-10 inline-flex items-center gap-3 bg-[var(--gold)] text-[var(--ink)] px-10 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-white transition">
            View Complete Collection <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* RONAK GROUP */}
      <section className="py-24 md:py-32 bg-[var(--warm-white)]">
        <div className="container-lux max-w-5xl">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center bg-[var(--ivory)] border border-[var(--border)] p-10 md:p-14">
            <a href={site.ronakUrl} target="_blank" rel="noreferrer" className="shrink-0">
              <img src={site.ronakLogo} alt="Ronak Group" className="h-32 w-auto" />
            </a>
            <div>
              <span className="eyebrow">Backed By</span>
              <h3 className="mt-3 text-3xl md:text-4xl text-[var(--ink)]">A brand of Ronak Group</h3>
              <p className="mt-4 text-[var(--body)] leading-relaxed">
                Arise Paris is a brand of Ronak Group, a diversified business group developing and supporting brands for international markets. The association provides Arise Paris with a strong foundation for professional B2B communication and long-term distribution partnerships.
              </p>
              <a href={site.ronakUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[var(--ink)] border-b border-[var(--gold)] pb-1 hover:text-[var(--gold)]">
                Visit Ronak Group <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="py-24 md:py-32 bg-[var(--ivory)]">
        <div className="container-lux">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <span className="eyebrow">Insights</span>
              <h2 className="mt-3 text-4xl md:text-5xl text-[var(--ink)] leading-[1.05]">Fragrance & Retail Insights</h2>
            </div>
            <Link to="/blog" className="text-[11px] tracking-[0.28em] uppercase text-[var(--ink)] border-b border-[var(--gold)] pb-1 hover:text-[var(--gold)] self-start md:self-auto">
              View All Articles
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="group bg-[var(--warm-white)] border border-[var(--border)] hover:border-[var(--gold)] transition p-8 flex flex-col">
                <span className="eyebrow">{post.category}</span>
                <h3 className="mt-3 text-2xl text-[var(--ink)] font-serif group-hover:text-[var(--gold)] transition">{post.title}</h3>
                <p className="mt-4 text-sm text-[var(--body)] leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-[var(--body)]">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </PageShell>
  );
}
