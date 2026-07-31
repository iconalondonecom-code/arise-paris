import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { products } from "@/data/products";
import { successToast } from "@/lib/toast";
import { useEnquiry } from "@/lib/enquiry";

export const Route = createFileRoute("/become-a-distributor")({
  head: () => ({
    meta: [
      { title: "Become an Arise Paris Distributor" },
      { name: "description", content: "Apply to become an Arise Paris distributor and discuss body spray wholesale, import and retail partnership opportunities." },
      { property: "og:title", content: "Become an Arise Paris Distributor" },
      { property: "og:description", content: "Apply for Arise Paris distribution and wholesale partnerships." },
    ],
  }),
  component: DistributorPage,
});

const businessTypes = ["Importer", "Distributor", "Wholesaler", "Retail Chain", "Supermarket", "Fragrance Store", "E-commerce Retailer", "Trading Company", "Other"];

function DistributorPage() {
  return (
    <PageShell>
      <DistributorContent />
    </PageShell>
  );
}

function DistributorContent() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const { items, clear } = useEnquiry();

  useEffect(() => {
    if (items.length) setSelectedProducts((prev) => Array.from(new Set([...prev, ...items])));
  }, [items]);

  const toggle = (slug: string) =>
    setSelectedProducts((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    successToast("Thank you. Our team will be in touch shortly.");
    (e.target as HTMLFormElement).reset();
    setSelectedProducts([]);
    clear();
  };

  const field = "w-full h-12 px-4 bg-[var(--warm-white)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--gold)] transition";
  const label = "text-[10px] tracking-[0.24em] uppercase text-[var(--body)] mb-2 block";

  return (
    <>
      <section className="bg-[var(--ink)] text-white py-24 md:py-32">
        <div className="container-lux max-w-4xl">
          <span className="eyebrow">Distributor Application</span>
          <h1 className="mt-4 text-5xl md:text-6xl leading-[1.05]">Become an Arise Paris Distributor.</h1>
          <p className="mt-6 text-white/70 text-lg max-w-2xl">
            Share your details and our team will reach out to discuss regional distribution, wholesale and retail partnership opportunities.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24 bg-[var(--warm-white)]">
        <div className="container-lux max-w-4xl">
          <form onSubmit={submit} className="grid gap-6" noValidate>
            <div className="grid md:grid-cols-2 gap-6">
              <div><label className={label}>Full Name *</label><input required name="name" className={field} /></div>
              <div><label className={label}>Job Title</label><input name="title" className={field} /></div>
              <div><label className={label}>Company Name *</label><input required name="company" className={field} /></div>
              <div><label className={label}>Business Email *</label><input required type="email" name="email" className={field} /></div>
              <div><label className={label}>Phone Number *</label><input required name="phone" className={field} /></div>
              <div><label className={label}>WhatsApp Number</label><input name="whatsapp" className={field} /></div>
              <div><label className={label}>Country *</label><input required name="country" className={field} /></div>
              <div><label className={label}>City</label><input name="city" className={field} /></div>
              <div><label className={label}>Company Website</label><input name="website" className={field} /></div>
              <div>
                <label className={label}>Business Type *</label>
                <select required name="businessType" className={field}>
                  <option value="">Select…</option>
                  {businessTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div><label className={label}>Years in Business</label><input name="years" className={field} /></div>
              <div><label className={label}>Current Product Categories</label><input name="categories" className={field} /></div>
              <div><label className={label}>Markets Covered</label><input name="markets" className={field} /></div>
              <div><label className={label}>Distribution Channels</label><input name="channels" className={field} /></div>
              <div><label className={label}>Estimated Requirement</label><input name="requirement" className={field} /></div>
            </div>

            <div>
              <label className={label}>Products of Interest</label>
              {items.length > 0 && (
                <p className="mb-3 text-xs text-[var(--body)]">
                  Products from your enquiry list are pre-selected below.
                </p>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {products.map((p) => (
                  <label key={p.slug} className={`flex items-center gap-2 border p-3 text-sm cursor-pointer transition ${selectedProducts.includes(p.slug) ? "border-[var(--gold)] bg-[var(--ivory)]" : "border-[var(--border)]"}`}>
                    <input type="checkbox" checked={selectedProducts.includes(p.slug)} onChange={() => toggle(p.slug)} className="accent-[var(--gold)]" />
                    {p.name}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className={label}>Message</label>
              <textarea rows={5} name="message" className="w-full p-4 bg-[var(--warm-white)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--gold)]" />
            </div>

            <label className="flex gap-3 items-start text-sm text-[var(--body)]">
              <input required type="checkbox" className="mt-1 accent-[var(--gold)]" />
              <span>I consent to Arise Paris and Ronak Group contacting me about my enquiry.</span>
            </label>

            <button disabled={status === "loading"} className="justify-self-start bg-[var(--ink)] text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[var(--gold)] hover:text-[var(--ink)] transition disabled:opacity-60">
              {status === "loading" ? "Sending…" : "Submit Application"}
            </button>
            {status === "success" && <p className="text-sm text-[var(--gold)]">Thank you — our team will be in touch shortly.</p>}
          </form>
        </div>
      </section>
    </>
  );
}