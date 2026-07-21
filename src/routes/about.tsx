import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { EnquiryCTA } from "@/components/EnquiryCTA";
import { SectionHeading } from "@/components/SectionHeading";
import { site } from "@/data/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Arise Paris | Deodorant Body Spray Collection" },
      { name: "description", content: "Arise Paris is a contemporary body fragrance brand offering a diverse collection of 250 ml deodorant body sprays. A brand of Ronak Group." },
      { property: "og:title", content: "About Arise Paris" },
      { property: "og:description", content: "Discover the Arise Paris story, our collection and our B2B vision — a brand of Ronak Group." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <section className="bg-[var(--ink)] text-white py-32 md:py-40">
        <div className="container-lux max-w-4xl">
          <span className="eyebrow">About</span>
          <h1 className="mt-4 text-5xl md:text-7xl leading-[1.02]">A modern body fragrance brand for confident everyday expression.</h1>
          <p className="mt-8 text-lg text-white/70 leading-relaxed max-w-2xl">
            Arise Paris brings together bold, fresh, rich, soft and expressive identities through a range of 250 ml deodorant body sprays designed for international retail and B2B partnerships.
          </p>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[var(--warm-white)]">
        <div className="container-lux grid lg:grid-cols-2 gap-16">
          {[
            { t: "Our Brand", b: "Arise Paris is designed as a contemporary body fragrance brand for modern personal-care markets. It brings together distinctive packaging, considered identities and a versatile range for retailers and distributors." },
            { t: "Our Collection", b: "Eleven deodorant body sprays — each in a generous 250 ml / 8.45 fl. oz. format — form the current Arise Paris collection, spanning bold, deep and soft personalities." },
            { t: "Our B2B Vision", b: "We build long-term relationships with distributors, importers, wholesalers and retailers, supported by responsive commercial teams and a clear brand proposition." },
            { t: "Arise Paris & Ronak Group", b: "Arise Paris is a brand of Ronak Group, a diversified business group with commercial experience across international markets." },
          ].map((s) => (
            <div key={s.t}>
              <span className="eyebrow">Chapter</span>
              <h2 className="mt-3 text-3xl md:text-4xl text-[var(--ink)]">{s.t}</h2>
              <p className="mt-4 text-[var(--body)] leading-relaxed">{s.b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[var(--ivory)]">
        <div className="container-lux">
          <SectionHeading eyebrow="Brand Values" title="What Arise Paris stands for" />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {["Distinctive Identity", "Modern Presentation", "Everyday Appeal", "Business Partnership", "Consistent Experience"].map((v, i) => (
              <div key={v} className="border border-[var(--border)] p-8 bg-[var(--warm-white)]">
                <div className="text-[var(--gold)] text-2xl font-serif">0{i + 1}</div>
                <h3 className="mt-4 text-lg text-[var(--ink)] font-serif">{v}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--warm-white)]">
        <div className="container-lux max-w-4xl text-center">
          <img src={site.ronakLogo} alt="Ronak Group" className="h-20 mx-auto" />
          <p className="mt-6 text-[var(--body)] leading-relaxed text-lg">
            "Arise Paris is a brand of Ronak Group." The parent group provides a strong foundation for professional B2B communication and long-term distribution partnerships.
          </p>
          <a href={site.ronakUrl} target="_blank" rel="noreferrer" className="mt-6 inline-block text-[11px] tracking-[0.28em] uppercase text-[var(--ink)] border-b border-[var(--gold)] pb-1 hover:text-[var(--gold)]">
            Visit ronak.global
          </a>
        </div>
      </section>

      <EnquiryCTA />
    </PageShell>
  );
}

export { Link };