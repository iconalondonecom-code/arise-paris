import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Trash2 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { AriseCrest } from "@/components/AriseCrest";
import { useEnquiry } from "@/lib/enquiry";
import { products } from "@/data/products";
import { waLink } from "@/data/site";

export const Route = createFileRoute("/enquiry-list")({
  head: () => ({
    meta: [
      { title: "Your Enquiry List | Arise Paris" },
      { name: "description", content: "Review the Arise Paris products you are interested in and send a formal B2B enquiry to our team." },
    ],
    links: [{ rel: "canonical", href: "/enquiry-list" }],
  }),
  component: EnquiryListPage,
});

function EnquiryListPage() {
  const { items, remove, clear } = useEnquiry();
  const selected = items.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean) as typeof products;

  const waMessage = selected.length
    ? `Hello, I would like to enquire about the following Arise Paris deodorant body sprays (250 ml) for B2B distribution:\n${selected.map((p) => `• ${p.name}`).join("\n")}`
    : undefined;

  return (
    <PageShell>
      <section className="bg-[var(--ink)] text-white py-20 md:py-28">
        <div className="container-lux max-w-3xl">
          <span className="eyebrow">Enquiry List</span>
          <h1 className="display-lg mt-4 text-white">Your Enquiry List</h1>
          <p className="body-lg mt-4 text-white/70">
            Review the Arise Paris products you are interested in, then take the next step with our B2B team.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--warm-white)]">
        <div className="container-lux max-w-3xl">
          <div className="flex items-center justify-between">
            <h2 className="display-md text-[var(--ink)]">Selected Products ({selected.length})</h2>
            {selected.length > 0 && (
              <button type="button" onClick={clear} className="text-[11px] tracking-[0.2em] uppercase text-[var(--body)] hover:text-[var(--ink)]">
                Clear All
              </button>
            )}
          </div>

          {selected.length === 0 ? (
            <div className="mt-8 border border-[var(--border)] p-12 text-center">
              <AriseCrest className="h-12 w-12 mx-auto text-[var(--gold)]" color="var(--gold)" />
              <p className="mt-4 text-[var(--body)]">No products added yet.</p>
              <Link to="/products" className="mt-6 inline-flex items-center px-6 py-3.5 btn-label bg-[var(--ink)] text-white hover:bg-[var(--gold)] hover:text-[var(--ink)] transition">
                Browse Products
              </Link>
            </div>
          ) : (
            <>
              <ul className="mt-8 divide-y divide-[var(--border)] border-t border-b border-[var(--border)]">
                {selected.map((p) => (
                  <li key={p.slug} className="flex items-center gap-5 py-5">
                    <div
                      className="h-24 w-20 flex-shrink-0 flex items-center justify-center rounded-sm"
                      style={{ backgroundColor: p.accentSoft }}
                    >
                      {p.image ? (
                        <img src={p.image} alt={p.imageAlt} className="h-[85%] w-auto object-contain" />
                      ) : (
                        <AriseCrest className="h-8 w-8" color={p.accent} />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <Link to="/products/$slug" params={{ slug: p.slug }} className="product-name text-[var(--ink)] hover:text-[var(--gold)] transition truncate block">
                        {p.name}
                      </Link>
                      <p className="mt-1 text-[11px] tracking-[0.2em] uppercase text-[var(--body)]">Deodorant Body Spray · 250 ml</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => remove(p.slug)}
                      aria-label={`Remove ${p.name}`}
                      className="text-[var(--body)] hover:text-[var(--gold)] transition p-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <p className="text-sm text-[var(--body)]">
                  Ready to move forward? Submit a formal enquiry with your business details, or reach out directly on WhatsApp.
                </p>
                <div className="mt-5 flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/become-a-distributor"
                    className="inline-flex justify-center items-center px-6 py-3.5 btn-label bg-[var(--ink)] text-white hover:bg-[var(--gold)] hover:text-[var(--ink)] transition"
                  >
                    Submit Enquiry
                  </Link>
                  <a
                    href={waLink(waMessage)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex justify-center items-center gap-2 px-6 py-3.5 btn-label border border-[var(--ink)] text-[var(--ink)] hover:bg-[var(--ink)] hover:text-white transition"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
                  </a>
                  <Link
                    to="/products"
                    className="inline-flex justify-center items-center px-6 py-3.5 btn-label border border-[var(--border)] text-[var(--body)] hover:border-[var(--gold)] hover:text-[var(--gold)] transition"
                  >
                    Continue Browsing
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </PageShell>
  );
}
