import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { EnquiryCTA } from "@/components/EnquiryCTA";

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

const partners = ["Distributors", "Importers", "Wholesalers", "Retail Chains", "Supermarkets", "Fragrance & Cosmetic Stores", "Online Retail", "Regional Trading Companies"];

const steps = [
  ["Submit an enquiry", "Share your interest through our distributor or contact form."],
  ["Tell us about your business", "Company, market reach and current product categories."],
  ["Select products of interest", "Choose the Arise Paris variants that fit your market."],
  ["Discuss commercial requirements", "Our team follows up with the appropriate commercial information."],
  ["Continue with Ronak Group", "Discussions move forward with the Ronak Group commercial team."],
];

function B2BPage() {
  return (
    <PageShell>
      <section className="bg-[var(--warm-white)] pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="container-lux">
          <span className="eyebrow">B2B Partnerships</span>
          <h1 className="display-hero mt-5 text-[var(--ink)] max-w-4xl">
            Distribution, built on a distinctive range.
          </h1>
        </div>
      </section>

      {/* Partner types — flowing tags, right-aligned label */}
      <section className="py-16 md:py-20 bg-[var(--ivory)] border-y border-[var(--border)]">
        <div className="container-lux grid lg:grid-cols-[0.7fr_2fr] gap-8 lg:gap-16 items-start">
          <span className="eyebrow">Who We Partner With</span>
          <div className="flex flex-wrap gap-3">
            {partners.map((t) => (
              <span key={t} className="border border-[var(--border)] bg-[var(--warm-white)] px-5 py-3 text-[var(--ink)] font-serif text-base md:text-lg">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Process — numbered, offset from left rail */}
      <section className="py-20 md:py-28 bg-[var(--warm-white)]">
        <div className="container-lux grid lg:grid-cols-[0.7fr_2fr] gap-8 lg:gap-16">
          <div className="lg:sticky lg:top-28 self-start">
            <span className="eyebrow">Process</span>
            <h2 className="display-md mt-3 text-[var(--ink)]">How an enquiry moves forward</h2>
          </div>
          <ol className="divide-y divide-[var(--border)]">
            {steps.map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[auto_1fr] gap-6 py-8 first:pt-0">
                <div className="text-4xl font-serif text-[var(--gold)]">0{i + 1}</div>
                <div>
                  <h3 className="display-md text-[var(--ink)] text-2xl">{t}</h3>
                  <p className="mt-1 body-lg text-[var(--body)]">{d}</p>
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
