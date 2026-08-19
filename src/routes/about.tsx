import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { EnquiryCTA } from "@/components/EnquiryCTA";
import { site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Arise Paris | Deodorant Body Spray Collection" },
      { name: "description", content: "Arise Paris is a contemporary body fragrance brand offering a diverse collection of 250 ml deodorant body sprays. A brand of Ronak Group." },
      { property: "og:title", content: "About Arise Paris" },
      { property: "og:description", content: "The Arise Paris story, collection and B2B vision — a brand of Ronak Group." },
    ],
  }),
  component: AboutPage,
});

const chapters = [
  {
    n: "01",
    t: "The Brand",
    b: "Arise Paris is built for modern personal-care shelves — distinctive packaging, considered identities, a range made for retailers and distributors who want more than a single note.",
  },
  {
    n: "02",
    t: "The Collection",
    b: "Eleven deodorant body sprays, each 250 ml / 8.45 fl. oz., spanning bold, deep and soft personalities within one cohesive family.",
  },
  {
    n: "03",
    t: "The Partnership",
    b: "We work with distributors, importers, wholesalers and retailers for the long term, backed by responsive commercial teams and a clear brand story.",
  },
];

const values = ["Distinctive Identity", "Modern Presentation", "Everyday Appeal", "Business Partnership", "Consistent Experience"];

function AboutPage() {
  return (
    <PageShell>
      {/* Asymmetric hero */}
      <section className="bg-[var(--warm-white)] pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="container-lux grid lg:grid-cols-[1.3fr_0.7fr] gap-10 lg:gap-16 items-end">
          <div>
            <span className="eyebrow">About Arise Paris</span>
            <h1 className="display-hero mt-5 text-[var(--ink)] max-w-3xl">
              A fragrance identity, arranged for the shelf.
            </h1>
          </div>
          <p className="body-lg text-[var(--body)] lg:pb-2 lg:border-l lg:border-[var(--border)] lg:pl-8">
            Arise Paris brings bold, fresh, rich and soft identities together in a single 250 ml deodorant body spray collection, built for international B2B retail.
          </p>
        </div>
      </section>

      {/* Story — sticky left label, stacked right chapters */}
      <section className="py-20 md:py-28 bg-[var(--ivory)] border-y border-[var(--border)]">
        <div className="container-lux grid lg:grid-cols-[0.8fr_2fr] gap-12 lg:gap-20">
          <div className="lg:sticky lg:top-28 self-start">
            <span className="eyebrow">The Story</span>
            <h2 className="display-md mt-3 text-[var(--ink)]">In three chapters</h2>
          </div>
          <div className="divide-y divide-[var(--border)]">
            {chapters.map((c) => (
              <div key={c.n} className="grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-10 py-10 first:pt-0">
                <div className="text-3xl font-serif text-[var(--gold)]">{c.n}</div>
                <div>
                  <h3 className="display-md text-[var(--ink)]">{c.t}</h3>
                  <p className="mt-3 body-lg text-[var(--body)] max-w-2xl">{c.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values — inline flowing list, not a repeated card grid */}
      <section className="py-20 md:py-28 bg-[var(--warm-white)]">
        <div className="container-lux">
          <span className="eyebrow">What We Stand For</span>
          <div className="mt-6 flex flex-wrap gap-x-3 gap-y-4">
            {values.map((v, i) => (
              <span key={v} className="inline-flex items-center gap-2 border border-[var(--border)] pl-4 pr-5 py-3 text-[var(--ink)] font-serif text-lg">
                <span className="text-[var(--gold)] text-sm">0{i + 1}</span> {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Parent group — dark band for contrast */}
      <section className="py-24 bg-[var(--ink)] text-white">
        <div className="container-lux grid lg:grid-cols-[auto_1fr] gap-10 items-center">
          <span className="inline-grid place-items-center rounded-xl bg-white/5 border border-white/10 px-8 py-6">
            <img src={site.ronakLogo} alt="Ronak Group" className="h-16 w-auto" />
          </span>
          <div>
            <p className="display-md max-w-2xl">A brand of Ronak Group.</p>
            <p className="mt-3 text-white/60 max-w-xl">A diversified group with commercial experience across international markets, providing the foundation for long-term distribution partnerships.</p>
            <a href={site.ronakUrl} target="_blank" rel="noreferrer" className="mt-5 inline-block btn-label text-white border-b border-[var(--gold)] pb-1 hover:text-[var(--gold)]">
              Visit ronak.global
            </a>
          </div>
        </div>
      </section>

      <EnquiryCTA />
    </PageShell>
  );
}

export { Link };
