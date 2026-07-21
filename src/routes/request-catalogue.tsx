import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { successToast } from "@/lib/toast";

export const Route = createFileRoute("/request-catalogue")({
  head: () => ({
    meta: [
      { title: "Request Catalogue | Arise Paris Body Sprays" },
      { name: "description", content: "Request the Arise Paris deodorant body spray catalogue for B2B, wholesale and distribution enquiries." },
    ],
  }),
  component: CataloguePage,
});

function CataloguePage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setSent(true);
    successToast("Catalogue request received.");
  };
  const field = "w-full h-12 px-4 bg-[var(--warm-white)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--gold)]";
  const label = "text-[10px] tracking-[0.24em] uppercase text-[var(--body)] mb-2 block";

  return (
    <PageShell>
      <section className="bg-[var(--ink)] text-white py-24 md:py-32">
        <div className="container-lux max-w-3xl">
          <span className="eyebrow">Request Catalogue</span>
          <h1 className="mt-4 text-5xl md:text-6xl leading-[1.05]">Receive the Arise Paris catalogue.</h1>
          <p className="mt-6 text-white/70 text-lg">Complete the form and our team will share the appropriate Arise Paris product information for your business.</p>
        </div>
      </section>
      <section className="py-20 bg-[var(--warm-white)]">
        <div className="container-lux max-w-3xl">
          {sent ? (
            <div className="border border-[var(--gold)] p-10 text-center bg-[var(--ivory)]">
              <h2 className="text-3xl text-[var(--ink)]">Thank you.</h2>
              <p className="mt-3 text-[var(--body)]">Our team will contact you with the appropriate Arise Paris product information.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div><label className={label}>Name *</label><input required name="name" className={field} /></div>
                <div><label className={label}>Company *</label><input required name="company" className={field} /></div>
                <div><label className={label}>Business Email *</label><input required type="email" className={field} /></div>
                <div><label className={label}>Phone</label><input className={field} /></div>
                <div><label className={label}>WhatsApp</label><input className={field} /></div>
                <div><label className={label}>Country *</label><input required className={field} /></div>
                <div className="md:col-span-2"><label className={label}>Business Type</label><input className={field} /></div>
                <div className="md:col-span-2"><label className={label}>Products of Interest</label><input className={field} placeholder="e.g. Active Man, Signature, Black Musk" /></div>
                <div className="md:col-span-2"><label className={label}>Message</label><textarea rows={4} className="w-full p-4 bg-[var(--warm-white)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--gold)]" /></div>
              </div>
              <label className="flex gap-3 items-start text-sm text-[var(--body)]">
                <input required type="checkbox" className="mt-1 accent-[var(--gold)]" />
                <span>I consent to Arise Paris contacting me about my catalogue request.</span>
              </label>
              <button disabled={loading} className="justify-self-start bg-[var(--ink)] text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[var(--gold)] hover:text-[var(--ink)] transition disabled:opacity-60">
                {loading ? "Sending…" : "Request Catalogue"}
              </button>
            </form>
          )}
        </div>
      </section>
    </PageShell>
  );
}