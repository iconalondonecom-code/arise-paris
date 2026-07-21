import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms & Conditions | Arise Paris" }, { name: "description", content: "Arise Paris terms & conditions for website usage." }] }),
  component: () => (
    <PageShell>
      <section className="bg-[var(--ink)] text-white py-24">
        <div className="container-lux max-w-3xl">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-4 text-5xl">Terms & Conditions</h1>
        </div>
      </section>
      <section className="py-20 bg-[var(--warm-white)]">
        <div className="container-lux max-w-3xl text-[var(--body)] leading-relaxed space-y-6">
          <p>By using this website, you agree to these terms. This website provides information about Arise Paris deodorant body sprays and B2B partnership enquiries. It is not an e-commerce platform.</p>
          <h2 className="text-2xl text-[var(--ink)]">Content</h2>
          <p>All brand assets, product images and content on this website are the property of Arise Paris and Ronak Group. Unauthorised use is not permitted.</p>
          <h2 className="text-2xl text-[var(--ink)]">Enquiries</h2>
          <p>Submitting an enquiry does not constitute a commercial agreement. Commercial terms are established through direct discussions with the Ronak Group team.</p>
        </div>
      </section>
    </PageShell>
  ),
});