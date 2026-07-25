import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/data/products";
import { posts } from "@/data/blog";
import { site, waLink } from "@/data/site";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, ArrowLeft, Sparkles, Layers, Droplets, Handshake, ShieldCheck, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arise Paris Body Sprays | B2B Distribution & Wholesale" },
      { name: "description", content: "Explore Arise Paris 250 ml deodorant body sprays and connect with our team for wholesale, import and distributor opportunities." },
      { property: "og:title", content: "Arise Paris Body Sprays | B2B Distribution & Wholesale" },
      { property: "og:description", content: "Eleven distinctive 250 ml deodorant body sprays created for modern retail, international distribution and B2B partnerships." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

// Hero product order — the Colour Journey sequence
const heroOrder = [
  "active-man",
  "addiction",
  "barcelona",
  "black-musk",
  "forest-spice",
  "sweet-love",
  "temptation",
  "crush",
  "goodness-oud",
  "romantic",
  "signature",
];

// Background gradient per product (Colour Journey palette)
const heroBg: Record<string, string> = {
  "active-man":   "radial-gradient(1200px 700px at 70% 40%, #1E4C8A 0%, #0C1632 55%, #060B1C 100%)",
  "addiction":    "radial-gradient(1200px 700px at 70% 40%, #7A1E1E 0%, #1A0808 55%, #060B1C 100%)",
  "barcelona":    "radial-gradient(1200px 700px at 70% 40%, #E39A28 0%, #7A2E10 55%, #1A0A04 100%)",
  "black-musk":   "radial-gradient(1200px 700px at 70% 40%, #5C3E7A 0%, #17102A 55%, #060B1C 100%)",
  "forest-spice": "radial-gradient(1200px 700px at 70% 40%, #4F7A3B 0%, #163220 55%, #060B1C 100%)",
  "sweet-love":   "radial-gradient(1200px 700px at 70% 40%, #D48AA8 0%, #5A2A44 55%, #1A0A18 100%)",
  "temptation":   "radial-gradient(1200px 700px at 70% 40%, #B0246E 0%, #40102A 55%, #0A0410 100%)",
  "crush":        "radial-gradient(1200px 700px at 70% 40%, #A0367A 0%, #3A1A44 55%, #0A0410 100%)",
  "goodness-oud": "radial-gradient(1200px 700px at 70% 40%, #B99A5B 0%, #4A2C10 55%, #14090A 100%)",
  "romantic":     "radial-gradient(1200px 700px at 70% 40%, #B93A3A 0%, #5A2020 55%, #14090A 100%)",
  "signature":    "radial-gradient(1200px 700px at 70% 40%, #6D8FB0 0%, #1A2A44 55%, #060B1C 100%)",
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);
  return reduced;
}

function HomePage() {
  const heroProducts = useMemo(
    () => heroOrder.map((s) => products.find((p) => p.slug === s)!).filter(Boolean),
    [],
  );
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (paused || reducedMotion) return;
    const t = setInterval(() => setActive((i) => (i + 1) % heroProducts.length), 5500);
    return () => clearInterval(t);
  }, [paused, reducedMotion, heroProducts.length]);

  const current = heroProducts[active];

  const next = useCallback(() => setActive((i) => (i + 1) % heroProducts.length), [heroProducts.length]);
  const prev = useCallback(() => setActive((i) => (i - 1 + heroProducts.length) % heroProducts.length), [heroProducts.length]);

  return (
    <PageShell transparentHeader>
      {/* ============= HERO — PRODUCT COLOUR JOURNEY ============= */}
      <section
        aria-label="Arise Paris Product Colour Journey"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={() => setPaused(false)}
        className="relative min-h-[100dvh] flex items-center overflow-hidden text-white"
        style={{ background: heroBg[current.slug], transition: "background 700ms ease" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(180deg, rgba(6,11,28,0.5) 0%, transparent 40%, rgba(6,11,28,0.75) 100%)",
        }} />

        <div className="container-lux relative pt-36 pb-24 md:pt-40 md:pb-28 w-full">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-center">
            {/* Copy */}
            <div>
              <span className="eyebrow text-[var(--gold)]">The Arise Paris Collection</span>
              <h1 className="mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] font-serif">
                Eleven Expressions.<br />
                <span className="text-[var(--gold)]">One Distinctive Collection.</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-white/75 leading-relaxed max-w-xl">
                Discover the Arise Paris collection of 250&nbsp;ml deodorant body sprays created for modern retail, international distribution and distinctive everyday fragrance.
              </p>

              {/* Selected product info */}
              <div key={current.slug} className="mt-8 fade-up">
                <div className="flex items-center gap-3">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: current.accent }} />
                  <span className="text-xs tracking-[0.28em] uppercase text-white/70">
                    {current.name} — Deodorant Body Spray · 250 ml
                  </span>
                </div>
                <p className="mt-3 text-white/80 text-sm md:text-base leading-relaxed max-w-lg">
                  {current.shortDescription}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/products" className="group inline-flex items-center gap-3 bg-[var(--gold)] text-[var(--ink)] px-7 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-white transition">
                  Discover All Variants <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
                </Link>
                <Link to="/products/$slug" params={{ slug: current.slug }} className="inline-flex items-center border border-white/25 px-7 py-4 text-[11px] tracking-[0.28em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition">
                  View Product
                </Link>
                <Link to="/request-catalogue" className="inline-flex items-center border border-white/15 px-7 py-4 text-[11px] tracking-[0.28em] uppercase text-white/80 hover:border-[var(--gold)] hover:text-[var(--gold)] transition">
                  Request Catalogue
                </Link>
              </div>
            </div>

            {/* Product stage */}
            <div className="relative h-[380px] sm:h-[460px] md:h-[540px]">
              <div className="absolute inset-0 flex items-end justify-center">
                {heroProducts.map((p, i) => {
                  const offset = i - active;
                  const isActive = offset === 0;
                  const abs = Math.abs(offset);
                  if (abs > 3) return null;
                  const x = offset * 90;
                  const scale = isActive ? 1.15 : 1 - abs * 0.12;
                  const opacity = isActive ? 1 : 0.55 - abs * 0.12;
                  const z = 20 - abs;
                  const y = isActive ? -20 : abs * 10;
                  return (
                    <button
                      key={p.slug}
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show ${p.name}`}
                      aria-pressed={isActive}
                      className="absolute bottom-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] rounded-sm"
                      style={{
                        transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                        opacity,
                        zIndex: z,
                        transition: reducedMotion ? "none" : "transform 600ms cubic-bezier(.2,.7,.2,1), opacity 600ms ease",
                      }}
                    >
                      {p.image && (
                        <img
                          src={p.image}
                          alt={p.imageAlt}
                          className="h-[320px] sm:h-[400px] md:h-[500px] w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)] pointer-events-none"
                          loading={isActive ? "eager" : "lazy"}
                          decoding="async"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Colour indicators + controls */}
          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="flex items-center gap-3 flex-wrap">
              {heroProducts.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => setActive(i)}
                  aria-label={`Select ${p.name}`}
                  aria-current={i === active}
                  className="group flex items-center gap-2 focus:outline-none"
                >
                  <span
                    className="block rounded-full transition-all"
                    style={{
                      background: p.accent,
                      width: i === active ? 28 : 14,
                      height: 6,
                      boxShadow: i === active ? `0 0 12px ${p.accent}` : "none",
                    }}
                  />
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button onClick={prev} aria-label="Previous" className="h-11 w-11 grid place-items-center border border-white/20 hover:border-[var(--gold)] hover:text-[var(--gold)] transition">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <span className="text-xs tracking-[0.28em] uppercase text-white/60 min-w-16 text-center">
                {String(active + 1).padStart(2, "0")} / {String(heroProducts.length).padStart(2, "0")}
              </span>
              <button onClick={next} aria-label="Next" className="h-11 w-11 grid place-items-center border border-white/20 hover:border-[var(--gold)] hover:text-[var(--gold)] transition">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============= EXPLORE THE COLLECTION — HORIZONTAL EXPLORER ============= */}
      <ProductExplorer />

      {/* ============= FIND YOUR EXPRESSION — 4 PERSONALITY CARDS ============= */}
      <section className="py-24 md:py-32 bg-[var(--warm-white)]">
        <div className="container-lux">
          <SectionHeading
            eyebrow="Find Your Expression"
            title="Product personalities for every market"
            subtitle="Explore distinctive product personalities created for different visual preferences, retail environments and customer profiles."
          />
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {personalities.map((group) => {
              const items = group.slugs
                .map((s) => products.find((p) => p.slug === s))
                .filter(Boolean) as typeof products;
              return (
                <div
                  key={group.title}
                  className="group relative overflow-hidden border border-[var(--border)] bg-[var(--ivory)] p-6 md:p-7 flex flex-col hover:-translate-y-1 transition duration-500"
                  style={{ boxShadow: `0 20px 60px -30px ${group.accent}55` }}
                >
                  <div
                    className="absolute inset-x-0 top-0 h-1"
                    style={{ background: group.accent }}
                    aria-hidden
                  />
                  <div className="flex items-end gap-1 h-40 mb-6">
                    {items.map((p) => (
                      <div
                        key={p.slug}
                        className="flex-1 h-full relative overflow-hidden rounded-sm"
                        style={{ background: `linear-gradient(180deg, ${p.accentSoft} 0%, ${p.accent}22 100%)` }}
                      >
                        {p.image && (
                          <img
                            src={p.image}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-contain object-bottom"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] tracking-[0.28em] uppercase" style={{ color: group.accent }}>
                    {items.length} Variants
                  </span>
                  <h3 className="mt-2 text-2xl text-[var(--ink)] font-serif">{group.title}</h3>
                  <p className="mt-2 text-sm text-[var(--body)] leading-relaxed flex-1">{group.copy}</p>
                  <ul className="mt-4 space-y-1 text-sm text-[var(--body)]">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-[var(--ink)] transition">— {p.name}</Link>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/products"
                    className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase border-b w-fit pb-1"
                    style={{ borderColor: group.accent, color: group.accent }}
                  >
                    Explore <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============= RETAIL SHELF PRESENTATION ============= */}
      <section className="py-24 md:py-32 bg-[var(--ivory)] overflow-hidden">
        <div className="container-lux grid lg:grid-cols-2 gap-14 items-center">
          <div className="relative">
            <div className="relative bg-gradient-to-b from-[#1a1410] via-[#241a12] to-[#0e0a08] p-6 md:p-10 border border-[var(--border)]">
              <div className="flex items-end justify-center gap-1 md:gap-2 h-[340px] md:h-[420px]">
                {products.filter((p) => p.image).map((p) => (
                  <img
                    key={p.slug}
                    src={p.image!}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="h-full w-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
                    style={{ maxWidth: "9%" }}
                  />
                ))}
              </div>
              <div className="absolute inset-x-6 md:inset-x-10 bottom-4 h-[3px] bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
              <div className="mt-4 text-center text-[10px] tracking-[0.28em] uppercase text-[var(--gold)]">
                The Complete Arise Paris Collection
              </div>
            </div>
          </div>
          <div>
            <span className="eyebrow">Retail Presentation</span>
            <h2 className="mt-3 text-4xl md:text-5xl leading-[1.05] text-[var(--ink)] font-serif">Stand out on every shelf.</h2>
            <p className="mt-3 text-xl text-[var(--body)]">Distinctive presentation for modern retail.</p>
            <ul className="mt-8 space-y-3 text-[var(--body)]">
              {[
                "Eleven visually distinctive variants",
                "Strong product recognition on shelf",
                "Consistent 250 ml / 8.45 fl. oz. format",
                "Broad visual variety across the range",
                "Suitable for distributor and retail presentations",
                "Designed for diverse product portfolios",
              ].map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--gold)] shrink-0" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link to="/request-catalogue" className="inline-flex items-center gap-3 bg-[var(--ink)] text-white px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[var(--gold)] hover:text-[var(--ink)] transition">
                Request Product Catalogue <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============= WHY PARTNERS CHOOSE ============= */}
      <section className="py-24 md:py-32 bg-[var(--warm-white)]">
        <div className="container-lux">
          <SectionHeading
            eyebrow="B2B Advantages"
            title="Why Partners Choose Arise Paris"
          />
          <div className="mt-16 grid gap-px bg-[var(--border)] md:grid-cols-2 lg:grid-cols-5 border border-[var(--border)]">
            {whyPartners.map((c) => (
              <div key={c.title} className="bg-[var(--warm-white)] p-8">
                <c.Icon className="h-6 w-6 text-[var(--gold)]" />
                <h4 className="mt-5 text-lg text-[var(--ink)] font-serif">{c.title}</h4>
                <p className="mt-2 text-sm text-[var(--body)] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============= B2B DISTRIBUTION BANNER — GRADIENT ============= */}
      <section className="relative py-24 md:py-32 overflow-hidden text-white" style={{
        background: "linear-gradient(120deg, #3a0a1e 0%, #7a1e4a 40%, #a86a2c 80%, #d8ad52 100%)",
      }}>
        <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
          background: "radial-gradient(600px 400px at 10% 20%, rgba(255,255,255,0.2), transparent 60%)",
        }} />
        <div className="container-lux relative text-center">
          <span className="eyebrow text-white/80">Partnership</span>
          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-serif max-w-4xl mx-auto">
            Partner with Arise Paris
          </h2>
          <p className="mt-6 text-white/85 text-lg max-w-3xl mx-auto leading-relaxed">
            We welcome enquiries from distributors, importers, wholesalers, supermarkets, fragrance stores, personal-care retailers, e-commerce businesses and regional trading companies.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link to="/become-a-distributor" className="inline-flex items-center gap-3 bg-white text-[var(--ink)] px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[var(--ink)] hover:text-white transition">
              Become a Distributor
            </Link>
            <Link to="/request-catalogue" className="inline-flex items-center border border-white/40 px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-white hover:text-[var(--ink)] transition">
              Request Catalogue
            </Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/40 px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[#25D366] hover:border-[#25D366] transition">
              <MessageCircle className="h-4 w-4" /> WhatsApp Our Team
            </a>
          </div>
        </div>
      </section>

      {/* ============= GLOBAL PARTNERSHIPS ============= */}
      <section className="py-24 md:py-32 bg-[var(--ink)] text-white overflow-hidden">
        <div className="container-lux grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="eyebrow">Global Reach</span>
            <h2 className="mt-3 text-4xl md:text-5xl leading-[1.05] font-serif">Built for international B2B partnerships.</h2>
            <p className="mt-6 text-white/70 text-lg leading-relaxed">
              Arise Paris welcomes commercial enquiries from businesses seeking a distinctive deodorant body spray collection for wholesale, retail, import and distribution opportunities.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-white/75">
              {["Global enquiries welcome","Distribution opportunities","Wholesale discussions","Import enquiries","Regional partnership opportunities","Retail chain enquiries"].map((s) => (
                <li key={s} className="flex gap-2"><span className="text-[var(--gold)]">◆</span>{s}</li>
              ))}
            </ul>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/become-a-distributor" className="bg-[var(--gold)] text-[var(--ink)] px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-white transition">Discuss Distribution</Link>
              <Link to="/contact" className="border border-white/25 px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition">Contact Our Team</Link>
            </div>
          </div>
          <div className="relative aspect-square max-w-md mx-auto lg:ml-auto lg:mr-0">
            <svg viewBox="0 0 400 400" className="w-full h-full">
              <defs>
                <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#D8AD52" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#D8AD52" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="200" r="180" fill="url(#glow)" />
              <circle cx="200" cy="200" r="180" fill="none" stroke="rgba(255,255,255,0.14)" />
              <circle cx="200" cy="200" r="130" fill="none" stroke="rgba(255,255,255,0.1)" />
              <circle cx="200" cy="200" r="80" fill="none" stroke="rgba(255,255,255,0.08)" />
              {heroProducts.map((p, idx) => {
                const angle = (idx / heroProducts.length) * Math.PI * 2;
                const r = 140;
                const x = 200 + Math.cos(angle) * r;
                const y = 200 + Math.sin(angle) * r;
                return (
                  <g key={p.slug}>
                    <line x1="200" y1="200" x2={x} y2={y} stroke={p.accent} strokeOpacity="0.45" strokeWidth="0.6" strokeDasharray="2 3" />
                    <circle cx={x} cy={y} r="5" fill={p.accent} />
                  </g>
                );
              })}
              <circle cx="200" cy="200" r="10" fill="#D8AD52" />
            </svg>
          </div>
        </div>
      </section>

      {/* ============= RONAK GROUP ============= */}
      <section className="py-24 md:py-32 bg-[var(--warm-white)]">
        <div className="container-lux max-w-5xl">
          <div className="grid md:grid-cols-[auto_1fr] gap-10 items-center bg-[var(--ivory)] border border-[var(--border)] p-10 md:p-14">
            <img src={site.ronakLogo} alt="Ronak Group" className="h-24 w-auto" />
            <div>
              <span className="eyebrow">Parent Group</span>
              <h2 className="mt-3 text-3xl md:text-4xl leading-[1.1] text-[var(--ink)] font-serif">Arise Paris — A Brand of Ronak Group</h2>
              <p className="mt-4 text-[var(--body)] leading-relaxed">
                Arise Paris is a brand of Ronak Group. This association provides a professional foundation for brand development, business communication and long-term B2B partnerships.
              </p>
              <a href={site.ronakUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[var(--ink)] border-b border-[var(--gold)] pb-1 hover:text-[var(--gold)]">
                Visit Ronak Group <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============= BLOG PREVIEW ============= */}
      <section className="py-24 md:py-32 bg-[var(--ivory)]">
        <div className="container-lux">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <div>
              <span className="eyebrow">Insights</span>
              <h2 className="mt-3 text-4xl md:text-5xl leading-[1.05] text-[var(--ink)] font-serif">Fragrance &amp; Retail Insights</h2>
            </div>
            <Link to="/blog" className="text-[11px] tracking-[0.28em] uppercase text-[var(--ink)] border-b border-[var(--gold)] pb-1 hover:text-[var(--gold)]">All Articles</Link>
          </div>
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="group bg-[var(--warm-white)] border border-[var(--border)] p-8 hover:border-[var(--gold)] transition"
              >
                <span className="text-[10px] tracking-[0.28em] uppercase text-[var(--gold)]">{post.category}</span>
                <h3 className="mt-3 text-xl md:text-2xl leading-tight text-[var(--ink)] font-serif group-hover:text-[var(--gold)] transition">{post.title}</h3>
                <p className="mt-3 text-sm text-[var(--body)] leading-relaxed line-clamp-3">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-[10px] tracking-[0.28em] uppercase text-[var(--body)]">
                  <span>{post.readTime}</span>
                  <span className="inline-flex items-center gap-1 text-[var(--ink)]">Read Article <ArrowRight className="h-3 w-3" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============= FINAL CTA ============= */}
      <section className="py-24 md:py-32 bg-[var(--ink)] text-white text-center">
        <div className="container-lux max-w-3xl">
          <span className="eyebrow">Get in Touch</span>
          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-serif">
            Ready to bring Arise Paris to your market?
          </h2>
          <p className="mt-6 text-white/75 text-lg leading-relaxed">
            Connect with our team to request product information, discuss wholesale opportunities or apply for distribution.
          </p>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            <Link to="/become-a-distributor" className="bg-[var(--gold)] text-[var(--ink)] px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-white transition">Become a Distributor</Link>
            <Link to="/request-catalogue" className="border border-white/25 px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition">Request Catalogue</Link>
            <a href={waLink()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-white/25 px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[#25D366] hover:border-[#25D366] transition">
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

// ============= PRODUCT EXPLORER =============
function ProductExplorer() {
  const [selected, setSelected] = useState(0);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const current = products[selected];

  const scrollToIndex = (i: number) => {
    setSelected(i);
    const el = scrollerRef.current?.querySelectorAll<HTMLElement>("[data-thumb]")[i];
    el?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement?.closest("[data-explorer]") == null) return;
      if (e.key === "ArrowRight") { e.preventDefault(); scrollToIndex((selected + 1) % products.length); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); scrollToIndex((selected - 1 + products.length) % products.length); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section
      data-explorer
      className="py-24 md:py-32 transition-colors duration-700"
      style={{ background: `linear-gradient(180deg, ${current.accentSoft} 0%, var(--warm-white) 70%)` }}
    >
      <div className="container-lux">
        <SectionHeading
          eyebrow="Explore the Collection"
          title="Every expression at a glance"
          subtitle="Discover every expression and select the body spray that best matches your market and customer preferences."
        />

        <div className="mt-14 grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-center">
          {/* Selected product card */}
          <div key={current.slug} className="fade-up relative overflow-hidden border border-[var(--border)]"
            style={{ background: `linear-gradient(160deg, ${current.accent}15 0%, #ffffff 100%)` }}>
            <div className="grid grid-cols-[auto_1fr] gap-6 md:gap-10 p-6 md:p-10 items-center">
              <div className="h-[280px] md:h-[380px] w-[110px] md:w-[160px] grid place-items-center">
                {current.image && (
                  <img src={current.image} alt={current.imageAlt} className="h-full w-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.2)]" />
                )}
              </div>
              <div>
                <span className="text-[10px] tracking-[0.28em] uppercase" style={{ color: current.accent }}>
                  Deodorant Body Spray · 250 ml / 8.45 fl. oz.
                </span>
                <h3 className="mt-2 text-3xl md:text-4xl text-[var(--ink)] font-serif">{current.name}</h3>
                <p className="mt-3 text-[var(--body)] leading-relaxed text-sm md:text-base">{current.shortDescription}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  <Link to="/products/$slug" params={{ slug: current.slug }} className="inline-flex items-center gap-2 bg-[var(--ink)] text-white px-6 py-3 text-[10px] tracking-[0.28em] uppercase hover:bg-[var(--gold)] hover:text-[var(--ink)] transition">
                    View Product <ArrowRight className="h-3 w-3" />
                  </Link>
                  <Link to="/contact" search={{ product: current.slug } as never} className="inline-flex items-center border border-[var(--ink)]/20 text-[var(--ink)] px-6 py-3 text-[10px] tracking-[0.28em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition">
                    Add to Enquiry
                  </Link>
                  <a href={waLink(`Hello, I would like more information about Arise Paris ${current.name} (250 ml deodorant body spray).`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[var(--ink)]/20 text-[var(--ink)] px-6 py-3 text-[10px] tracking-[0.28em] uppercase hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition">
                    <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs tracking-[0.28em] uppercase text-[var(--body)]">
                {String(selected + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => scrollToIndex((selected - 1 + products.length) % products.length)}
                  aria-label="Previous product"
                  className="h-10 w-10 grid place-items-center border border-[var(--border)] hover:border-[var(--ink)] transition"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => scrollToIndex((selected + 1) % products.length)}
                  aria-label="Next product"
                  className="h-10 w-10 grid place-items-center border border-[var(--border)] hover:border-[var(--ink)] transition"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div
              ref={scrollerRef}
              className="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin"
              style={{ scrollbarWidth: "thin" }}
            >
              {products.map((p, i) => (
                <button
                  key={p.slug}
                  data-thumb
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Show ${p.name}`}
                  aria-current={i === selected}
                  className={`shrink-0 snap-center w-[130px] md:w-[150px] p-3 border transition ${
                    i === selected ? "border-[var(--ink)]" : "border-[var(--border)] hover:border-[var(--ink)]/40"
                  }`}
                  style={{
                    background: i === selected ? `linear-gradient(180deg, ${p.accentSoft} 0%, #ffffff 100%)` : "#ffffff",
                  }}
                >
                  <div className="h-[140px] md:h-[160px] grid place-items-center">
                    {p.image && (
                      <img src={p.image} alt={p.imageAlt} loading="lazy" className="max-h-full w-auto object-contain" />
                    )}
                  </div>
                  <div className="mt-2 text-[10px] tracking-[0.2em] uppercase text-[var(--ink)] truncate">{p.name}</div>
                  <span className="mt-1 block h-[3px] rounded-full" style={{ background: p.accent, width: i === selected ? "100%" : "24px" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============= DATA =============
const personalities = [
  {
    title: "Bold & Dynamic",
    accent: "#1E4C8A",
    slugs: ["active-man", "barcelona", "signature"],
    copy: "Confident identities created for energetic, modern and expressive positioning.",
  },
  {
    title: "Deep & Rich",
    accent: "#7A1E1E",
    slugs: ["addiction", "black-musk", "goodness-oud", "temptation"],
    copy: "Darker and more dramatic expressions with a strong premium presence.",
  },
  {
    title: "Soft & Expressive",
    accent: "#A0367A",
    slugs: ["crush", "romantic", "sweet-love"],
    copy: "Graceful and expressive product identities designed for warmth and everyday appeal.",
  },
  {
    title: "Fresh & Refined",
    accent: "#4F7A3B",
    slugs: ["forest-spice", "signature", "active-man"],
    copy: "Clean and refreshing visual expressions for modern and versatile positioning.",
  },
];

const whyPartners = [
  { Icon: Sparkles, title: "Distinctive Product Identities", body: "Every variant features a recognizable presentation and its own visual personality." },
  { Icon: Droplets, title: "Consistent 250 ml Format", body: "All variants are presented in a practical 250 ml / 8.45 fl. oz. format." },
  { Icon: Layers, title: "Broad Collection", body: "Eleven variants give distributors and retailers a diverse body spray portfolio." },
  { Icon: Handshake, title: "B2B Focused", body: "The website and enquiry process are created for distributors, wholesalers, importers and retailers." },
  { Icon: ShieldCheck, title: "Backed by Ronak Group", body: "Arise Paris is supported by the professional business network and brand development experience of Ronak Group." },
];