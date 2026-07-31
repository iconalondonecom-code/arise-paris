import { Link } from "@tanstack/react-router";
import { waLink } from "@/data/site";

export function EnquiryCTA() {
  return (
    <section className="relative bg-[var(--ink)] text-white py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "radial-gradient(circle at 20% 20%, var(--gold) 0%, transparent 50%), radial-gradient(circle at 80% 80%, var(--gold) 0%, transparent 50%)",
      }} />
      <div className="container-lux relative text-center max-w-3xl">
        <span className="eyebrow">Partner With Us</span>
        <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
          Interested in distributing Arise Paris?
        </h2>
        <p className="mt-6 text-white/70 text-lg leading-relaxed">
          Connect with our team to receive product information or discuss regional distribution opportunities.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link to="/become-a-distributor" className="bg-[var(--gold)] text-[var(--ink)] px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:bg-[var(--warm-white)] transition">
            Become a Distributor
          </Link>
          <a href={waLink()} target="_blank" rel="noreferrer" className="border border-white/30 px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition">
            WhatsApp Us
          </a>
          <Link to="/contact" className="border border-white/30 px-8 py-4 text-[11px] tracking-[0.28em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition">
            Email Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}