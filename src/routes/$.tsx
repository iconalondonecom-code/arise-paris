import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [{ title: "Page Not Found | Arise Paris" }, { name: "robots", content: "noindex" }],
  }),
  component: NotFoundCatchAll,
});

function NotFoundCatchAll() {
  return (
    <PageShell>
      <section className="min-h-[70vh] flex items-center justify-center bg-[#05091A] text-white py-24">
        <div className="container-wide max-w-2xl text-center">
          <span className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold-muted)]">404</span>
          <h1 className="mt-4 font-serif text-[36px] md:text-[52px] text-white">This page could not be found.</h1>
          <p className="mt-4 text-white/70 text-base md:text-lg">
            The page you are looking for may have moved. Explore the Arise Paris collection or get in touch with our team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="inline-flex items-center px-6 py-3 text-[13px] tracking-[0.16em] uppercase bg-[var(--gold-muted)] text-[#05091A] hover:brightness-110 transition">Return Home</Link>
            <Link to="/products" className="inline-flex items-center px-6 py-3 text-[13px] tracking-[0.16em] uppercase border border-white/30 text-white hover:bg-white/10 transition">Explore Products</Link>
            <Link to="/contact" className="inline-flex items-center px-6 py-3 text-[13px] tracking-[0.16em] uppercase border border-white/30 text-white hover:bg-white/10 transition">Contact Our Team</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
