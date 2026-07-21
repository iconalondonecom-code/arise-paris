import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({ meta: [{ title: "Privacy Policy | Arise Paris" }, { name: "description", content: "Arise Paris privacy policy — how we handle enquiry information." }] }),
  component: () => (
    <PageShell>
      <section className="bg-[var(--ink)] text-white py-24">
        <div className="container-lux max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-4 text-5xl">Privacy Policy</h1>
        </div>
      </section>
      <section className="py-20 bg-[var(--warm-white)]">
        <div className="container-lux max-w-3xl prose prose-neutral text-[var(--body)] leading-relaxed space-y-6">
          <p>This policy outlines how Arise Paris, a brand of Ronak Group, handles information you provide through this website.</p>
          <h2 className="text-2xl text-[var(--ink)]">Information We Collect</h2>
          <p>We collect information you submit through enquiry, distributor and catalogue forms — including name, company, contact details and message content.</p>
          <h2 className="text-2xl text-[var(--ink)]">How We Use It</h2>
          <p>Information is used to respond to your enquiry and to discuss potential B2B partnerships. We do not sell your information.</p>
          <h2 className="text-2xl text-[var(--ink)]">Contact</h2>
          <p>For privacy queries, email contact@ronak.global.</p>
        </div>
      </section>
    </PageShell>
  ),
});
