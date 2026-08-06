import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { MessageCircle, Trash2 } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
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

const enquiryTypes = ["Distributor / Import / Wholesale", "Retail Enquiry", "Product Information", "General Enquiry"];

const schema = z.object({
  name: z.string().min(2, "Full name is required"),
  company: z.string().min(1, "Company is required"),
  email: z.string().email("A valid business email is required"),
  phone: z.string().min(5, "Phone is required"),
  whatsapp: z.string().optional(),
  country: z.string().min(2, "Country is required"),
  enquiryType: z.string().min(1, "Please select an enquiry type"),
  message: z.string().optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please accept the privacy policy" }) }),
});

function EnquiryListPage() {
  const { items, remove, clear } = useEnquiry();
  const selected = items.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean) as typeof products;

  const [form, setForm] = useState({
    name: "", company: "", email: "", phone: "", whatsapp: "", country: "", enquiryType: "", message: "", consent: false, website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  const field = "w-full h-12 px-4 bg-white/5 border border-white/15 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--gold-muted)]";
  const label = "text-[11px] tracking-[0.2em] uppercase text-white/70 mb-2 block";

  const waMessage = selected.length
    ? `Hello, I would like to enquire about the following Arise Paris deodorant body sprays (250 ml) for B2B distribution:\n${selected.map((p) => `• ${p.name}`).join("\n")}`
    : undefined;

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.website) return;
    const result = schema.safeParse(form);
    if (!result.success) {
      const errs: Record<string, string> = {};
      for (const issue of result.error.issues) errs[String(issue.path[0])] = issue.message;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  };

  return (
    <PageShell>
      <section className="bg-[#05091A] text-white py-20 md:py-28">
        <div className="container-wide max-w-3xl">
          <span className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold-muted)]">Enquiry List</span>
          <h1 className="mt-4 font-serif text-[34px] md:text-[48px] leading-[1.05] text-white">Your Enquiry List</h1>
          <p className="mt-4 text-white/70 text-base md:text-lg leading-relaxed">
            Review the Arise Paris products you are interested in and send a formal enquiry to our B2B team.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20" style={{ background: "#07142F" }}>
        <div className="container-wide grid lg:grid-cols-[1fr_1.3fr] gap-12">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl text-white">Selected Products ({selected.length})</h2>
              {selected.length > 0 && (
                <button type="button" onClick={clear} className="text-[11px] tracking-[0.18em] uppercase text-white/50 hover:text-white">
                  Clear All
                </button>
              )}
            </div>

            {selected.length === 0 ? (
              <div className="mt-6 border border-white/10 p-8 text-center text-white/60">
                <p>No products added yet.</p>
                <Link to="/products" className="mt-4 inline-flex items-center px-6 py-3 text-[12px] tracking-[0.16em] uppercase bg-[var(--gold-muted)] text-[#05091A] hover:brightness-110 transition">
                  Continue Browsing
                </Link>
              </div>
            ) : (
              <>
                <ul className="mt-6 space-y-3">
                  {selected.map((p) => (
                    <li key={p.slug} className="flex items-center gap-3 border border-white/10 p-3 bg-white/[0.03]">
                      {p.image && <img src={p.image} alt={p.imageAlt} className="h-16 w-12 object-contain" />}
                      <div className="min-w-0 flex-1">
                        <Link to="/products/$slug" params={{ slug: p.slug }} className="text-sm text-white hover:text-[var(--gold-muted)] truncate block">{p.name}</Link>
                        <p className="text-[11px] tracking-[0.2em] uppercase text-white/50">Deodorant Body Spray · 250 ml</p>
                      </div>
                      <button type="button" onClick={() => remove(p.slug)} aria-label={`Remove ${p.name}`} className="text-white/50 hover:text-[var(--gold-muted)]">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-3">
                  <Link to="/products" className="inline-flex justify-center items-center px-6 py-3 text-[12px] tracking-[0.16em] uppercase border border-white/30 text-white hover:bg-white/10 transition">
                    Continue Browsing
                  </Link>
                  <a href={waLink(waMessage)} target="_blank" rel="noreferrer" className="inline-flex justify-center items-center gap-2 px-6 py-3 text-[12px] tracking-[0.16em] uppercase bg-[#128C4B] text-white hover:brightness-110 transition">
                    <MessageCircle className="h-4 w-4" /> Direct WhatsApp Enquiry
                  </a>
                </div>
              </>
            )}
          </div>

          <div>
            <h2 className="font-serif text-xl text-white mb-6">Formal Enquiry Form</h2>
            {status === "success" ? (
              <div className="border border-[var(--gold-muted)]/40 bg-white/5 p-8 text-center">
                <p className="text-white/85">Thank you. Our team will contact you with the appropriate Arise Paris product information.</p>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-5">
                <input type="text" name="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                <div className="grid md:grid-cols-2 gap-5">
                  <div><label className={label}>Full Name *</label><input className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />{errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}</div>
                  <div><label className={label}>Company *</label><input className={field} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />{errors.company && <p className="mt-1 text-xs text-red-400">{errors.company}</p>}</div>
                  <div><label className={label}>Business Email *</label><input type="email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />{errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}</div>
                  <div><label className={label}>Phone *</label><input className={field} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />{errors.phone && <p className="mt-1 text-xs text-red-400">{errors.phone}</p>}</div>
                  <div><label className={label}>WhatsApp</label><input className={field} value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} /></div>
                  <div><label className={label}>Country *</label><input className={field} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />{errors.country && <p className="mt-1 text-xs text-red-400">{errors.country}</p>}</div>
                  <div className="md:col-span-2">
                    <label className={label}>Enquiry Type *</label>
                    <select className={field} value={form.enquiryType} onChange={(e) => setForm({ ...form, enquiryType: e.target.value })}>
                      <option value="">Select enquiry type</option>
                      {enquiryTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                    </select>
                    {errors.enquiryType && <p className="mt-1 text-xs text-red-400">{errors.enquiryType}</p>}
                  </div>
                </div>
                <div>
                  <label className={label}>Message</label>
                  <textarea rows={4} className="w-full p-4 bg-white/5 border border-white/15 text-sm text-white focus:outline-none focus:border-[var(--gold-muted)]" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <label className="flex items-start gap-3 text-sm text-white/70">
                  <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 accent-[var(--gold-muted)]" />
                  I agree to the <Link to="/privacy-policy" className="underline hover:text-[var(--gold-muted)]">Privacy Policy</Link> and consent to being contacted.
                </label>
                {errors.consent && <p className="text-xs text-red-400">{errors.consent}</p>}
                <button type="submit" disabled={status === "loading"} className="justify-self-start inline-flex items-center px-8 py-4 text-[13px] tracking-[0.2em] uppercase bg-[var(--gold-muted)] text-[#05091A] hover:brightness-110 transition disabled:opacity-60">
                  {status === "loading" ? "Submitting…" : "Send Enquiry"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
