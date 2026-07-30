import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Fingerprint,
  Droplets,
  Layers,
  Handshake,
  ShieldCheck,
  MessageCircle,
  Globe2,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { HeroJourney } from "@/components/home/HeroJourney";
import { ProductExplorer } from "@/components/home/ProductExplorer";
import { products } from "@/data/products";
import { colourOf, heroOrder } from "@/data/colours";
import { posts } from "@/data/blog";
import { site, waLink } from "@/data/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arise Paris Body Sprays | B2B Distribution & Wholesale" },
      {
        name: "description",
        content:
          "Eleven distinctive 250 ml Arise Paris deodorant body sprays for modern retail, wholesale, import and international distribution partnerships.",
      },
      { property: "og:title", content: "Arise Paris Body Sprays | B2B Distribution & Wholesale" },
      {
        property: "og:description",
        content:
          "Explore eleven distinctive 250 ml deodorant body sprays created for modern retail and international B2B partnerships.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const bySlug = (slug: string) => products.find((p) => p.slug === slug)!;
const shelf = heroOrder.map(bySlug);

/* ---------------- Personality cards ---------------- */

interface Personality {
  title: string;
  description: string;
  accent: string;
  soft: string;
  slugs: string[];
}

const personalities: Personality[] = [
  {
    title: "Bold & Dynamic",
    description:
      "Confident identities created for energetic, expressive and modern positioning.",
    accent: "#1069D8",
    soft: "#0A2451",
    slugs: ["active-man", "barcelona", "signature"],
  },
  {
    title: "Deep & Rich",
    description: "Darker and more dramatic expressions with a strong premium presence.",
    accent: "#A62520",
    soft: "#3D090B",
    slugs: ["addiction", "black-musk", "goodness-oud", "temptation"],
  },
  {
    title: "Soft & Expressive",
    description:
      "Graceful and expressive product identities with warmth and everyday appeal.",
    accent: "#E85A9F",
    soft: "#54122D",
    slugs: ["crush", "romantic", "sweet-love"],
  },
  {
    title: "Fresh & Refined",
    description: "Clean and refreshing visual expressions for versatile market positioning.",
    accent: "#68A84A",
    soft: "#274D2D",
    slugs: ["forest-spice", "signature", "active-man"],
  },
];

function PersonalityCard({ p }: { p: Personality }) {
  return (
    <article
      className="group relative flex h-full flex-col rounded-2xl border p-6 overflow-hidden transition-transform duration-500 hover:-translate-y-2"
      style={{
        borderColor: `${p.accent}55`,
        background: `linear-gradient(165deg, ${p.soft}cc 0%, rgba(5,9,26,0.92) 70%)`,
        boxShadow: `0 30px 70px -45px ${p.accent}`,
      }}
    >
      <span
        aria-hidden
        className="absolute -top-16 -right-10 h-40 w-40 rounded-full blur-3xl opacity-40"
        style={{ background: p.accent }}
      />
      <div className="relative flex items-end justify-center gap-1 h-[168px]">
        {p.slugs.map(bySlug).map((prod) => (
          <img
            key={prod.slug}
            src={prod.image ?? ""}
            alt={prod.imageAlt}
            loading="lazy"
            className="h-[150px] w-auto object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-105"
          />
        ))}
      </div>
      <h3 className="relative mt-6 font-serif text-2xl text-[var(--text-white)]">{p.title}</h3>
      <p className="relative mt-2 text-[15px] leading-relaxed text-[var(--text-muted)] flex-1">
        {p.description}
      </p>
      <ul className="relative mt-4 flex flex-wrap gap-2">
        {p.slugs.map((s) => (
          <li
            key={s}
            className="text-[11px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border text-[var(--text-muted)]"
            style={{ borderColor: `${p.accent}66` }}
          >
            {bySlug(s).name}
          </li>
        ))}
      </ul>
      <Link
        to="/products"
        className="relative mt-6 inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--text-white)]"
      >
        Explore <ArrowRight className="h-4 w-4" style={{ color: p.accent }} />
      </Link>
    </article>
  );
}

/* ---------------- Benefits ---------------- */

const benefits = [
  {
    icon: Fingerprint,
    colour: "#1069D8",
    title: "Distinctive Product Identities",
    text: "Every variant features a recognizable presentation and its own visual character.",
  },
  {
    icon: Droplets,
    colour: "#A62520",
    title: "Consistent 250 ml Format",
    text: "All products are presented in a practical 250 ml / 8.45 fl. oz. format.",
  },
  {
    icon: Layers,
    colour: "#D8AD52",
    title: "Broad Collection",
    text: "Eleven variants provide distributors and retailers with a diverse body spray portfolio.",
  },
  {
    icon: Handshake,
    colour: "#6A3C82",
    title: "B2B Focused",
    text: "Created for distributors, wholesalers, importers, retailers and commercial clients.",
  },
  {
    icon: ShieldCheck,
    colour: "#68A84A",
    title: "Backed by Ronak Group",
    text: "Supported by the professional business network and brand development experience of Ronak Group.",
  },
];

const featuredPosts = [
  "fragrance-merchandising-tips",
  "body-fragrance-category-for-retailers",
  "how-importers-evaluate-personal-care-brands",
]
  .map((s) => posts.find((p) => p.slug === s))
  .filter(Boolean) as typeof posts;

const blogAccents = ["#C02E7B", "#1069D8", "#D8AD52"];

/* ---------------- Page ---------------- */

function HomePage() {
  return (
    <PageShell transparentHeader>
      <HeroJourney />
      <ProductExplorer />

      {/* Find Your Expression */}
      <section
        className="section-dark"
        style={{ background: "linear-gradient(180deg, #05091A 0%, #07142F 55%, #05091A 100%)" }}
      >
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold-muted)]">
              Collection Personalities
            </span>
            <h2 className="mt-3 font-serif text-[30px] md:text-[42px] text-[var(--text-white)]">
              Find Your Expression
            </h2>
            <p className="mt-3 text-[15px] md:text-[17px] text-[var(--text-muted)] leading-relaxed">
              Distinctive product personalities created for different retail environments and
              customer preferences.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {personalities.map((p) => (
              <PersonalityCard key={p.title} p={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Retail shelf */}
      <section
        className="section-dark"
        style={{
          background:
            "radial-gradient(900px 500px at 25% 30%, rgba(216,173,82,0.16), transparent 70%), linear-gradient(180deg, #05091A 0%, #0B0B14 100%)",
        }}
      >
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div
            className="relative rounded-2xl border border-white/10 p-6 md:p-8 overflow-hidden"
            style={{
              background:
                "radial-gradient(600px 300px at 50% 0%, rgba(216,173,82,0.22), transparent 70%), linear-gradient(180deg, #12131C 0%, #06070D 100%)",
            }}
          >
            <div className="flex items-end justify-center gap-0.5 md:gap-1">
              {shelf.map((p) => (
                <img
                  key={p.slug}
                  src={p.image ?? ""}
                  alt={p.imageAlt}
                  loading="lazy"
                  className="h-[110px] sm:h-[150px] md:h-[200px] w-auto object-contain drop-shadow-[0_16px_26px_rgba(0,0,0,0.7)]"
                />
              ))}
            </div>
            <div
              aria-hidden
              className="mt-3 h-[10px] rounded-full"
              style={{ background: "linear-gradient(90deg, transparent, #D8AD5288, transparent)" }}
            />
          </div>

          <div>
            <span className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold-muted)]">
              Built for Retail Success
            </span>
            <h2 className="mt-3 font-serif text-[30px] md:text-[44px] leading-tight text-[var(--text-white)]">
              Stand Out on Every Shelf.
            </h2>
            <p className="mt-2 font-serif text-xl md:text-2xl text-[var(--gold-muted)]">
              Distinctive Presentation for Modern Retail.
            </p>
            <ul className="mt-6 space-y-3 text-[15px] md:text-[17px] text-[var(--text-muted)]">
              {[
                "Eleven visually distinctive variants",
                "Consistent 250 ml format",
                "Strong product recognition",
                "Broad visual variety",
                "Suitable for wholesale and retail presentation",
                "Designed for diverse product portfolios",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--gold-muted)]" />
                  {t}
                </li>
              ))}
            </ul>
            <Link
              to="/request-catalogue"
              className="mt-8 inline-flex items-center gap-2 px-6 py-3 text-[14px] tracking-[0.16em] uppercase text-[#05091A] bg-[var(--gold-muted)] hover:brightness-110 transition"
            >
              Request Product Catalogue <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why partners choose */}
      <section className="section-dark" style={{ background: "#07142F" }}>
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold-muted)]">
              B2B Advantages
            </span>
            <h2 className="mt-3 font-serif text-[30px] md:text-[42px] text-[var(--text-white)]">
              Why Partners Choose Arise Paris
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:-translate-y-1.5 transition-transform duration-500"
                style={{ boxShadow: `0 30px 60px -50px ${b.colour}` }}
              >
                <span
                  className="grid h-12 w-12 place-items-center rounded-xl border"
                  style={{ borderColor: `${b.colour}88`, color: b.colour, background: `${b.colour}14` }}
                >
                  <b.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl text-[var(--text-white)]">{b.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-muted)]">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Distributor banner */}
      <section className="py-10 md:py-14" style={{ background: "#05091A" }}>
        <div className="container-wide">
          <div
            className="rounded-3xl p-8 md:p-12 grid grid-cols-1 lg:grid-cols-[auto_minmax(0,1fr)_auto] gap-8 items-center"
            style={{
              background:
                "linear-gradient(115deg, #4A1B6B 0%, #7A1240 42%, #A62520 72%, #C68A2A 100%)",
            }}
          >
            <span className="grid h-20 w-20 place-items-center rounded-2xl bg-black/25 border border-white/25 text-white">
              <Handshake className="h-9 w-9" />
            </span>
            <div className="min-w-0">
              <h2 className="font-serif text-[30px] md:text-[42px] text-white">
                Partner with Arise Paris
              </h2>
              <p className="mt-3 text-[15px] md:text-[17px] text-white/85 leading-relaxed max-w-2xl">
                Connect with our team to discuss wholesale, import and distribution opportunities
                for your market.
              </p>
            </div>
            <div className="flex flex-col gap-3 w-full lg:w-auto">
              <Link
                to="/become-a-distributor"
                className="inline-flex justify-center items-center px-6 py-3 text-[13px] tracking-[0.16em] uppercase bg-[var(--gold-muted)] text-[#05091A] hover:brightness-110 transition"
              >
                Become a Distributor
              </Link>
              <Link
                to="/request-catalogue"
                className="inline-flex justify-center items-center px-6 py-3 text-[13px] tracking-[0.16em] uppercase border border-white/60 text-white hover:bg-white/10 transition"
              >
                Request Catalogue
              </Link>
              <a
                href={waLink()}
                target="_blank"
                rel="noreferrer"
                className="inline-flex justify-center items-center gap-2 px-6 py-3 text-[13px] tracking-[0.16em] uppercase bg-[#128C4B] text-white hover:brightness-110 transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Global partnerships */}
      <section
        className="section-dark"
        style={{
          background:
            "radial-gradient(900px 500px at 50% 40%, rgba(16,105,216,0.20), transparent 70%), linear-gradient(180deg, #05091A 0%, #10102D 100%)",
        }}
      >
        <div className="container-wide grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold-muted)]">
              International B2B
            </span>
            <h2 className="mt-3 font-serif text-[30px] md:text-[42px] leading-tight text-[var(--text-white)]">
              Built for International B2B Partnerships
            </h2>
            <p className="mt-4 text-[15px] md:text-[17px] text-[var(--text-muted)] leading-relaxed">
              Arise Paris welcomes enquiries from distributors, importers, wholesalers, retailers,
              supermarkets, fragrance stores, personal-care businesses and regional trading
              companies.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/b2b-partnership"
                className="inline-flex items-center gap-2 px-6 py-3 text-[13px] tracking-[0.16em] uppercase bg-[var(--gold-muted)] text-[#05091A] hover:brightness-110 transition"
              >
                Discuss Distribution
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-[13px] tracking-[0.16em] uppercase border border-white/30 text-[var(--text-white)] hover:bg-white/10 transition"
              >
                Contact Our Team
              </Link>
            </div>
          </div>

          <div className="relative aspect-[4/3] rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden grid place-items-center">
            <Globe2 className="h-40 w-40 text-white/10" strokeWidth={0.6} />
            <span
              className="absolute h-5 w-5 rounded-full"
              style={{ background: "#D8AD52", boxShadow: "0 0 28px #D8AD52" }}
            />
            {heroOrder.map((slug, i) => {
              const c = colourOf(slug);
              const angle = (i / heroOrder.length) * Math.PI * 2;
              return (
                <span
                  key={slug}
                  aria-hidden
                  className="absolute h-2.5 w-2.5 rounded-full"
                  style={{
                    background: c.glow,
                    boxShadow: `0 0 16px ${c.glow}`,
                    left: `${50 + Math.cos(angle) * 34}%`,
                    top: `${50 + Math.sin(angle) * 30}%`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Ronak Group */}
      <section className="py-14 md:py-20" style={{ background: "var(--ivory)" }}>
        <div className="container-wide grid grid-cols-1 md:grid-cols-[auto_minmax(0,1fr)_auto] gap-8 items-center">
          <span className="inline-grid place-items-center rounded-xl bg-[#0B0B0F] px-6 py-5">
            <img
              src={site.ronakLogo}
              alt="Ronak Group"
              className="h-14 w-auto"
              loading="lazy"
              style={{ filter: "invert(1) brightness(2)" }}
            />
          </span>
          <div className="min-w-0">
            <h2 className="font-serif text-[26px] md:text-[34px] text-[var(--ink)]">
              Arise Paris — A Brand of Ronak Group
            </h2>
            <p className="mt-3 text-[15px] md:text-[17px] text-[var(--body)] leading-relaxed max-w-3xl">
              Arise Paris is a brand of Ronak Group. This association provides a professional
              foundation for brand development, business communication and long-term B2B
              partnerships.
            </p>
          </div>
          <a
            href={site.ronakUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-[13px] tracking-[0.16em] uppercase border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition"
          >
            Visit Ronak Group <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* Blog */}
      <section className="section-dark" style={{ background: "#05091A" }}>
        <div className="container-wide">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold-muted)]">
              Journal
            </span>
            <h2 className="mt-3 font-serif text-[30px] md:text-[42px] text-[var(--text-white)]">
              Latest from Our Blog
            </h2>
            <p className="mt-3 text-[15px] md:text-[17px] text-[var(--text-muted)] leading-relaxed">
              Insights, trends and strategies for fragrance retail and international B2B growth.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredPosts.map((post, i) => {
              const accent = blogAccents[i % blogAccents.length];
              const cover = shelf[i * 3 + 1] ?? shelf[i];
              return (
                <article
                  key={post.slug}
                  className="flex h-full flex-col rounded-2xl border overflow-hidden bg-white/[0.03] hover:-translate-y-1.5 transition-transform duration-500"
                  style={{ borderColor: `${accent}55` }}
                >
                  <div
                    className="relative h-48 grid place-items-center"
                    style={{
                      background: `radial-gradient(400px 200px at 50% 60%, ${accent}55, transparent 70%), linear-gradient(180deg, #0B1226, #05091A)`,
                    }}
                  >
                    <img
                      src={cover.image ?? ""}
                      alt={cover.imageAlt}
                      loading="lazy"
                      className="h-36 w-auto object-contain drop-shadow-[0_14px_24px_rgba(0,0,0,0.6)]"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span
                      className="self-start text-[10px] tracking-[0.22em] uppercase px-2.5 py-1 rounded-full border"
                      style={{ borderColor: `${accent}88`, color: accent }}
                    >
                      {post.category}
                    </span>
                    <h3 className="mt-4 font-serif text-xl leading-snug text-[var(--text-white)]">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-[var(--text-muted)] flex-1">
                      {post.excerpt}
                    </p>
                    <Link
                      to="/blog/$slug"
                      params={{ slug: post.slug }}
                      className="mt-5 inline-flex items-center gap-2 text-[12px] tracking-[0.2em] uppercase text-[var(--text-white)]"
                    >
                      Read More <ArrowRight className="h-4 w-4" style={{ color: accent }} />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="section-dark text-center"
        style={{
          background:
            "radial-gradient(700px 400px at 50% 100%, rgba(178,25,98,0.35), transparent 70%), linear-gradient(180deg, #05091A 0%, #0A0308 100%)",
        }}
      >
        <div className="container-lux">
          <h2 className="font-serif text-[30px] md:text-[46px] leading-tight text-[var(--text-white)] max-w-3xl mx-auto">
            Ready to Bring Arise Paris to Your Market?
          </h2>
          <p className="mt-4 text-[15px] md:text-[17px] text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed">
            Connect with our team to request product information, discuss wholesale opportunities or
            apply for distribution.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/become-a-distributor"
              className="inline-flex items-center px-6 py-3 text-[13px] tracking-[0.16em] uppercase bg-[var(--gold-muted)] text-[#05091A] hover:brightness-110 transition"
            >
              Become a Distributor
            </Link>
            <Link
              to="/request-catalogue"
              className="inline-flex items-center px-6 py-3 text-[13px] tracking-[0.16em] uppercase border border-white/30 text-[var(--text-white)] hover:bg-white/10 transition"
            >
              Request Catalogue
            </Link>
            <a
              href={waLink()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-[13px] tracking-[0.16em] uppercase bg-[#128C4B] text-white hover:brightness-110 transition"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </PageShell>
  );
}