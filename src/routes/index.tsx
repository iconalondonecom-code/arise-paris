import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { HeroJourney } from "@/components/home/HeroJourney";
import { ProductExplorer } from "@/components/home/ProductExplorer";
import { products } from "@/data/products";
import { colourOf, heroOrder } from "@/data/colours";
import { posts } from "@/data/blog";
import { site } from "@/data/site";

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
          "Eleven distinctive 250 ml Arise Paris deodorant body sprays for modern retail, wholesale, import and international distribution partnerships.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const bySlug = (slug: string) => products.find((p) => p.slug === slug)!;
const storyTrio = ["temptation", "barcelona", "forest-spice"].map(bySlug);
const latestPosts = posts.slice(0, 3);

const pillars = [
  {
    n: "01",
    title: "Eleven Identities",
    text: "A complete body spray portfolio with eleven visually distinct variants under one brand.",
  },
  {
    n: "02",
    title: "One Format",
    text: "Every variant is presented in the same 250 ml / 8.45 fl. oz. format for simple shelf planning.",
  },
  {
    n: "03",
    title: "Built for Retail",
    text: "Colour-led packaging designed to be recognisable on modern shelves and in wholesale catalogues.",
  },
];

const b2bPoints = [
  {
    title: "Distributors & Importers",
    text: "Market-level partnerships for regional distribution of the complete Arise Paris range.",
  },
  {
    title: "Wholesale & Retail",
    text: "Supply for supermarkets, fragrance stores, personal-care retailers and trading companies.",
  },
  {
    title: "Backed by Ronak Group",
    text: "A professional business foundation for long-term international B2B relationships.",
  },
];

function HomePage() {
  return (
    <PageShell transparentHeader>
      {/* 1 — Hero */}
      <HeroJourney />

      {/* 2 — Collection */}
      <ProductExplorer />

      {/* 3 — Brand & product story (ivory editorial) */}
      <section className="bg-[var(--warm-white)] py-20 md:py-28 lg:py-32">
        <div className="container-wide grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-14 lg:gap-20 items-center">
          <div>
            <span className="eyebrow">The Brand</span>
            <h2 className="display-lg mt-5 text-[var(--ink)]">
              Colour is the
              <br className="hidden sm:block" /> first fragrance.
            </h2>
            <p className="body-lg mt-7 text-[var(--body)] max-w-lg">
              Arise Paris builds each variant around a single colour identity. The result is a
              collection that reads instantly on shelf, in a catalogue and in a customer's hand —
              eleven personalities, one consistent 250 ml format.
            </p>
            <Link
              to="/products"
              className="mt-9 inline-flex items-center gap-3 btn-label text-[var(--ink)] border-b border-[var(--ink)] pb-2 hover:gap-4 transition-all"
            >
              Explore the Collection <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-3 gap-4 md:gap-6">
            {storyTrio.map((p) => {
              const c = colourOf(p.slug);
              return (
                <Link
                  key={p.slug}
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  className="group relative flex items-end justify-center overflow-hidden aspect-[3/5]"
                  style={{ background: `linear-gradient(180deg, ${c.mid} 0%, ${c.deep} 100%)` }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-1/4 h-1/2 blur-3xl opacity-50"
                    style={{ background: c.glow }}
                  />
                  <img
                    src={p.image ?? ""}
                    alt={p.imageAlt}
                    loading="lazy"
                    className="relative z-10 h-[88%] w-auto object-contain object-bottom drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                  <span className="absolute z-20 bottom-4 left-0 right-0 text-center text-[11px] tracking-[0.22em] uppercase text-white/85">
                    {p.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4 — Why Arise Paris */}
      <section className="bg-[var(--ivory)] py-20 md:py-28">
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="eyebrow">Why Arise Paris</span>
            <h2 className="display-md mt-4 text-[var(--ink)]">A portfolio, not a product.</h2>
          </div>
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--border)]">
            {pillars.map((p) => (
              <div key={p.n} className="bg-[var(--ivory)] p-8 md:p-10">
                <span className="font-serif text-4xl text-[var(--gold)]">{p.n}</span>
                <h3 className="product-name mt-6 text-[var(--ink)]">{p.title}</h3>
                <p className="mt-3 text-[16px] leading-[1.75] text-[var(--body)]">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 — B2B advantages (dark accent moment) */}
      <section
        className="py-20 md:py-28"
        style={{
          background:
            "radial-gradient(900px 520px at 15% 20%, rgba(216,173,82,0.14), transparent 70%), linear-gradient(180deg, #0A0A0A 0%, #171717 100%)",
        }}
      >
        <div className="container-wide grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-12 lg:gap-20">
          <div>
            <span className="eyebrow">International B2B</span>
            <h2 className="display-md mt-4 text-[var(--warm-white)]">
              Who we work with.
            </h2>
            <p className="mt-6 text-[16px] md:text-[17px] leading-[1.8] text-white/60 max-w-md">
              Arise Paris works with commercial partners who present the range under one
              recognisable brand across their market.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {b2bPoints.map((b) => (
              <div key={b.title} className="border-t border-white/20 pt-6">
                <h3 className="font-serif text-[22px] text-[var(--warm-white)]">{b.title}</h3>
                <p className="mt-3 text-[15px] leading-[1.75] text-white/55">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — Partnership CTA */}
      <section className="bg-[var(--warm-white)] py-20 md:py-28">
        <div className="container-wide">
          <div className="relative overflow-hidden bg-[var(--ink)] px-8 py-14 md:px-16 md:py-20 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-10 items-center">
            <span
              aria-hidden
              className="absolute -left-24 -top-24 h-72 w-72 rounded-full blur-3xl opacity-25"
              style={{ background: colourOf("temptation").glow }}
            />
            <span
              aria-hidden
              className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full blur-3xl opacity-25"
              style={{ background: colourOf("active-man").glow }}
            />
            <div className="relative min-w-0">
              <span className="eyebrow">Partnership</span>
              <h2 className="display-md mt-4 text-[var(--warm-white)]">
                Bring Arise Paris to your market.
              </h2>
              <p className="mt-5 text-[16px] md:text-[17px] leading-[1.8] text-white/60 max-w-xl">
                Request the product catalogue or apply to distribute the collection in your
                territory.
              </p>
            </div>
            <div className="relative flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link
                to="/request-catalogue"
                className="inline-flex justify-center items-center bg-[var(--gold)] text-[var(--ink)] btn-label px-8 py-4 hover:brightness-110 transition"
              >
                Request Catalogue
              </Link>
              <Link
                to="/become-a-distributor"
                className="inline-flex justify-center items-center border border-white/35 text-[var(--warm-white)] btn-label px-8 py-4 hover:border-[var(--gold)] hover:text-[var(--gold)] transition"
              >
                Become a Distributor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7 — Ronak Group */}
      <section className="bg-[var(--ivory)] py-16 md:py-24">
        <div className="container-wide grid grid-cols-1 md:grid-cols-[auto_minmax(0,1fr)_auto] gap-10 items-center">
          <span className="inline-grid place-items-center bg-[var(--ink)] px-8 py-6">
            <img src={site.ronakLogo} alt="Ronak Group" className="h-20 w-auto" loading="lazy" />
          </span>
          <div className="min-w-0">
            <span className="eyebrow">Parent Group: Ronak Group</span>
            <h2 className="display-md mt-3 text-[var(--ink)]">A Brand of Ronak Group</h2>
            <p className="mt-4 text-[16px] md:text-[17px] leading-[1.8] text-[var(--body)] max-w-2xl">
              Arise Paris is developed under Ronak Group, providing a professional foundation for
              brand development, business communication and long-term B2B partnerships.
            </p>
          </div>
          <a
            href={site.ronakUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 btn-label border border-[var(--ink)] text-[var(--ink)] px-7 py-4 hover:bg-[var(--ink)] hover:text-[var(--warm-white)] transition"
          >
            Visit Ronak Group <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* 8 — Latest insights */}
      <section className="bg-[var(--warm-white)] py-20 md:py-28">
        <div className="container-wide">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Journal</span>
              <h2 className="display-md mt-4 text-[var(--ink)]">Latest Insights</h2>
            </div>
            <Link
              to="/blog"
              className="btn-label text-[var(--ink)] border-b border-[var(--ink)] pb-1.5 hover:text-[var(--gold)] hover:border-[var(--gold)] transition"
            >
              All Articles
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {latestPosts.map((post, i) => {
              const c = colourOf(heroOrder[i * 3] ?? "signature");
              return (
                <article key={post.slug} className="group flex flex-col">
                  <span className="h-px w-full bg-[var(--border)]" />
                  <span
                    className="mt-6 inline-block h-1.5 w-8"
                    style={{ background: c.glow }}
                    aria-hidden
                  />
                  <p className="mt-5 text-[11px] tracking-[0.22em] uppercase text-[var(--body)]">
                    {post.category} · {post.date}
                  </p>
                  <h3 className="mt-3 font-serif text-[24px] md:text-[26px] leading-snug text-[var(--ink)]">
                    <Link to="/blog/$slug" params={{ slug: post.slug }}>
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-[16px] leading-[1.75] text-[var(--body)] flex-1">
                    {post.excerpt}
                  </p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="mt-6 inline-flex items-center gap-2 btn-label text-[var(--ink)] group-hover:gap-3 transition-all"
                  >
                    Read Article <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 9 — Final CTA */}
      <section className="bg-[var(--ink)] py-20 md:py-28 text-center">
        <div className="container-lux">
          <h2 className="display-lg text-[var(--warm-white)] max-w-3xl mx-auto">
            Let's talk distribution.
          </h2>
          <p className="mt-6 text-[16px] md:text-[18px] leading-[1.8] text-white/55 max-w-xl mx-auto">
            Share your market and requirements — our B2B team will respond with the right product
            information.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/request-catalogue"
              className="inline-flex items-center bg-[var(--gold)] text-[var(--ink)] btn-label px-8 py-4 hover:brightness-110 transition"
            >
              Request Catalogue
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center border border-white/35 text-[var(--warm-white)] btn-label px-8 py-4 hover:border-[var(--gold)] hover:text-[var(--gold)] transition"
            >
              B2B Enquiry
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
