import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { PageShell } from "@/components/layout/PageShell";
import { products } from "@/data/products";
import { site } from "@/data/site";

export const Route = createFileRoute("/request-catalogue")({
  head: () => ({
    meta: [
      { title: "Request the Arise Paris Catalogue | Arise Paris" },
      {
        name: "description",
        content:
          "Request the Arise Paris deodorant body spray catalogue and product information for wholesale, import and distribution enquiries.",
      },
      { property: "og:title", content: "Request the Arise Paris Catalogue" },
      {
        property: "og:description",
        content:
          "Request the Arise Paris deodorant body spray catalogue and product information for wholesale, import and distribution enquiries.",
      },
    ],
    links: [{ rel: "canonical", href: "/request-catalogue" }],
  }),
  component: RequestCataloguePage,
});

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("A valid business email is required"),
  phone: z.string().min(5, "Phone is required"),
  whatsapp: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  businessType: z.string().min(1, "Business type is required"),
  productsOfInterest: z.array(z.string()).optional(),
  message: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the privacy policy" }) }),
});

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  country: string;
  businessType: string;
  productsOfInterest: string[];
  message: string;
  consent: boolean;
  website: string; // honeypot
};

const initial: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  whatsapp: "",
  country: "",
  businessType: "",
  productsOfInterest: [],
  message: "",
  consent: false,
  website: "",
};

const businessTypes = [
  "Distributor",
  "Importer",
  "Wholesaler",
  "Retail Chain",
  "Supermarket",
  "Fragrance & Personal-Care Retailer",
  "E-commerce Retailer",
  "Regional Trading Company",
  "Other",
];

function RequestCataloguePage() {
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const field = "w-full h-12 px-4 bg-white/5 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold-muted)]";
  const label = "text-[11px] tracking-[0.2em] uppercase text-white/70 mb-2 block";

  const toggleProduct = (slug: string) => {
    setForm((f) => ({
      ...f,
      productsOfInterest: f.productsOfInterest.includes(slug)
        ? f.productsOfInterest.filter((s) => s !== slug)
        : [...f.productsOfInterest, slug],
    }));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.website) return; // honeypot triggered, silently ignore
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      setStatus("error");
      return;
    }
    setErrors({});
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 900));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <PageShell>
      <section className="bg-[#05091A] text-white py-24 md:py-32">
        <div className="container-wide max-w-3xl">
          <span className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold-muted)]">Catalogue Request</span>
          <h1 className="mt-4 font-serif text-[38px] md:text-[54px] leading-[1.05] text-white">
            Request the Arise Paris Catalogue
          </h1>
          <p className="mt-5 text-white/70 text-base md:text-lg leading-relaxed">
            Share a few details about your business and our team will send you the appropriate Arise Paris
            product information for wholesale, import or distribution purposes.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24" style={{ background: "#07142F" }}>
        <div className="container-wide max-w-3xl">
          {status === "success" ? (
            <div className="border border-[var(--gold-muted)]/40 bg-white/5 p-10 text-center">
              <h2 className="font-serif text-2xl text-white">Thank you.</h2>
              <p className="mt-3 text-white/80">
                Thank you. Our team will contact you with the appropriate Arise Paris product information.
              </p>
              <Link to="/products" className="mt-6 inline-flex items-center px-6 py-3 text-[13px] tracking-[0.16em] uppercase bg-[var(--gold-muted)] text-[#05091A] hover:brightness-110 transition">
                Continue Browsing
              </Link>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-6">
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className={label}>Full Name *</label>
                  <input className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label className={label}>Company *</label>
                  <input className={field} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                  {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company}</p>}
                </div>
                <div>
                  <label className={label}>Business Email *</label>
                  <input type="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>
                <div>
                  <label className={label}>Phone *</label>
                  <input className={field} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  {errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}
                </div>
                <div>
                  <label className={label}>WhatsApp</label>
                  <input className={field} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} />
                </div>
                <div>
                  <label className={label}>Country *</label>
                  <input className={field} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                  {errors.country && <p className="mt-1 text-xs text-red-400">{errors.country}</p>}
                </div>
                <div className="md:col-span-2">
                  <label className={label}>Business Type *</label>
                  <select className={field} value={form.businessType} onChange={(e) => setForm({ ...form, businessType: e.target.value })}>
                    <option value="">Select business type</option>
                    {businessTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                  {errors.businessType && <p className="mt-1 text-xs text-red-400">{errors.businessType}</p>}
                </div>
              </div>

              <div>
                <label className={label}>Products of Interest</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 border border-white/15 p-4 bg-white/5">
                  {products.map((p) => (
                    <label key={p.slug} className="flex items-center gap-2 text-sm text-white/80">
                      <input
                        type="checkbox"
                        checked={form.productsOfInterest.includes(p.slug)}
                        onChange={() => toggleProduct(p.slug)}
                        className="accent-[var(--gold-muted)]"
                      />
                      {p.name}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className={label}>Message</label>
                <textarea rows={4} className="w-full p-4 bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[var(--gold-muted)]" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              </div>

              <label className="flex items-start gap-3 text-sm text-white/70">
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                  className="mt-1 accent-[var(--gold-muted)]"
                />
                I agree to the{" "}
                <Link to="/privacy-policy" className="underline hover:text-[var(--gold-muted)]">Privacy Policy</Link> and consent to being contacted.
              </label>
              {errors.consent && <p className="text-xs text-red-400">{errors.consent}</p>}

              {status === "error" && Object.keys(errors).length === 0 && (
                <p className="text-sm text-red-400">Something went wrong. Please try again or contact us directly at {site.email}.</p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="justify-self-start inline-flex items-center px-8 py-4 text-[13px] tracking-[0.2em] uppercase bg-[var(--gold-muted)] text-[#05091A] hover:brightness-110 transition disabled:opacity-60"
              >
                {status === "loading" ? "Submitting…" : "Request Catalogue"}
              </button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}
