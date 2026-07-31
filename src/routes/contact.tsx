import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { site, waLink } from "@/data/site";
import { successToast } from "@/lib/toast";
import { Mail, Phone, MessageCircle, MapPin } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Arise Paris | B2B Enquiries" },
      { name: "description", content: "Contact Arise Paris for distributor, wholesale, import, catalogue and general enquiries — email, phone and WhatsApp." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    successToast("Message sent. Our team will respond shortly.");
    (e.target as HTMLFormElement).reset();
  };
  const field = "w-full h-12 px-4 bg-[var(--warm-white)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--gold)]";
  const label = "text-[10px] tracking-[0.24em] uppercase text-[var(--body)] mb-2 block";

  return (
    <PageShell>
      <section className="bg-[var(--ink)] text-white py-24 md:py-32">
        <div className="container-lux max-w-4xl">
          <span className="eyebrow">Contact</span>
          <h1 className="mt-4 text-5xl md:text-7xl leading-[1.02]">Speak with our team.</h1>
          <p className="mt-6 text-white/70 text-lg max-w-2xl">Get in touch for distributor, wholesale, import, catalogue and general enquiries.</p>
        </div>
      </section>

      <section className="py-20 bg-[var(--warm-white)]">
        <div className="container-lux grid lg:grid-cols-[1fr_1.4fr] gap-16">
          <div>
            <h2 className="text-3xl text-[var(--ink)]">{site.brand}</h2>
            <p className="text-sm text-[var(--gold)] tracking-[0.2em] uppercase mt-1">A Brand of {site.parent}</p>

            <ul className="mt-10 space-y-6">
              <li className="flex gap-4">
                <Mail className="h-5 w-5 text-[var(--gold)] mt-1" />
                <div>
                  <span className="eyebrow">Email</span>
                  <a href={`mailto:${site.email}`} className="block text-[var(--ink)] mt-1 hover:text-[var(--gold)]">{site.email}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <Phone className="h-5 w-5 text-[var(--gold)] mt-1" />
                <div>
                  <span className="eyebrow">UAE</span>
                  <a href={`tel:${site.phoneUAE.replace(/\s/g, "")}`} className="block text-[var(--ink)] mt-1 hover:text-[var(--gold)]">{site.phoneUAE}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <MessageCircle className="h-5 w-5 text-[var(--gold)] mt-1" />
                <div>
                  <span className="eyebrow">India</span>
                  <a href={site.whatsappIndia} target="_blank" rel="noreferrer" className="block text-[var(--ink)] mt-1 hover:text-[var(--gold)]">{site.phoneIndia}</a>
                </div>
              </li>
              <li className="flex gap-4">
                <MapPin className="h-5 w-5 text-[var(--gold)] mt-1" />
                <div>
                  <span className="eyebrow">Address</span>
                  <address className="not-italic block text-[var(--ink)] mt-1 leading-relaxed text-sm">
                    {site.address.line1}<br />
                    {site.address.line2}<br />
                    {site.address.line3}<br />
                    {site.address.city}<br />
                    {site.address.country}
                  </address>
                </div>
              </li>
            </ul>

            <a href={waLink()} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 text-[11px] tracking-[0.28em] uppercase">
              <MessageCircle className="h-4 w-4" /> WhatsApp Now
            </a>

            <div className="mt-10 aspect-video border border-[var(--border)] overflow-hidden">
              <iframe
                title="Ronak Group Location"
                src="https://maps.google.com/maps?q=Ronak+Group+Building+Gotri+Road+Vadodara+Gujarat&z=15&output=embed"
                className="w-full h-full"
                loading="lazy"
              />
            </div>
          </div>

          <form onSubmit={submit} className="border border-[var(--border)] p-8 md:p-10 bg-[var(--ivory)] grid gap-5 self-start">
            <div className="grid md:grid-cols-2 gap-5">
              <div><label className={label}>Name *</label><input required className={field} /></div>
              <div><label className={label}>Company</label><input className={field} /></div>
              <div><label className={label}>Email *</label><input required type="email" className={field} /></div>
              <div><label className={label}>Phone</label><input className={field} /></div>
              <div><label className={label}>Country</label><input className={field} /></div>
              <div>
                <label className={label}>Enquiry Type</label>
                <select className={field}>
                  {["Distributor Enquiry", "Wholesale Enquiry", "Import Enquiry", "Product Information", "General Enquiry"].map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>
              <div className="md:col-span-2"><label className={label}>Product Interest</label><input className={field} /></div>
              <div className="md:col-span-2"><label className={label}>Message *</label><textarea required rows={5} className="w-full p-4 bg-[var(--warm-white)] border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--gold)]" /></div>
            </div>
            <button disabled={loading} className="justify-self-start bg-[var(--ink)] text-white px-10 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[var(--gold)] hover:text-[var(--ink)] transition disabled:opacity-60">
              {loading ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}