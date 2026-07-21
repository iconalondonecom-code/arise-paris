import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { EnquiryCTA } from "@/components/EnquiryCTA";
import { SectionHeading } from "@/components/SectionHeading";

export const Route = createFileRoute("/b2b-partnership")({
  head: () => ({
    meta: [
      { title: "B2B Partnerships | Arise Paris Body Spray Wholesale" },
      { name: "description", content: "Explore B2B partnership opportunities with Arise Paris — for distributors, importers, wholesalers, supermarkets and retail chains." },
      { property: "og:title", content: "Arise Paris B2B Partnerships" },
      { property: "og:description", content: "B2B partnership opportunities with Arise Paris deodorant body sprays." },
    ],
  }),
  component: B2BPage,
});

function B2BPage() {
  return (
    <PageShell>
      <section className="bg-[var(--ink)] text-white py-32">
        <div className="container-lux max-w-4xl">
          <span className="eyebrow">B2B</span>
          <h1 className="mt-4 text-5xl md:text-7xl leading-[1.02]">B2B Partnerships built on distinctive fragrance.</h1>
          <p className="mt-6 text-white/70 text-lg max-w-2xl">
            Arise Paris partners with distributors, importers, wholesalers and retailers to bring a distinctive body spray collection to international markets.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[var(--warm-white)]">
        <div className="container-lux">
          <SectionHeading eyebrow="Who We Partner With" title="Built for commercial partners" />
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--border)] border border-[var(--border)]">
            {["Distributors", "Importers", "Wholesalers", "Retail Chains", "Supermarkets", "Fragrance & Cosmetic Stores", "Online Retail", "Regional Trading Companies"].map((t, i) => (
              <div key={t} className="bg-[var(--warm-white)] p-8">
                <div className="text-[var(--gold)] text-2xl font-serif">0{i + 1}</div>
                <h3 className="mt-3 text-lg text-[var(--ink)] font-serif">{t}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[var(--ivory)]">
        <div className="container-lux max-w-4xl">
          <SectionHeading eyebrow="Process" title="How the enquiry process works" align="left" />
          <ol className="mt-12 space-y-8">
            {[
              ["Submit an enquiry", "Share your interest through our distributor or contact form."],
              ["Share company & market details", "Tell us about your business, market reach and current product categories."],
              ["Select products of interest", "Choose the Arise Paris variants that fit your market."],
              ["Discuss commercial requirements", "Our team follows up with the appropriate commercial information."],
              ["Continue directly with the Ronak Group team", "Discussions move forward with the Ronak Group commercial team."],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[auto_1fr] gap-6">
                <div className="text-4xl font-serif text-[var(--gold)]">0{i + 1}</div>
                <div>
                  <h3 className="text-xl text-[var(--ink)] font-serif">{t}</h3>
                  <p className="mt-1 text-[var(--body)]">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <EnquiryCTA />
    </PageShell>
  );
}

export { Link };