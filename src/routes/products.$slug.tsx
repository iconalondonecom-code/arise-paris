import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { getProduct, products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { site, waLink } from "@/data/site";
import { AriseCrest } from "@/components/AriseCrest";
import { MessageCircle, Share2 } from "lucide-react";
import { AddToEnquiryButton } from "@/components/enquiry/AddToEnquiryButton";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: loaderData.product.seoTitle },
          { name: "description", content: loaderData.product.metaDescription },
          { property: "og:title", content: loaderData.product.seoTitle },
          { property: "og:description", content: loaderData.product.metaDescription },
          ...(loaderData.product.image ? [{ property: "og:image", content: loaderData.product.image }] : []),
        ]
      : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <section className="container-lux py-32 text-center">
        <h1 className="text-4xl">Product not found</h1>
        <Link to="/products" className="mt-6 inline-block text-[var(--gold)]">← Back to Products</Link>
      </section>
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <section className="container-lux py-32 text-center">
        <h1 className="text-3xl">Something went wrong.</h1>
      </section>
    </PageShell>
  ),
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.slug !== product.slug && p.collection === product.collection).slice(0, 3);

  return (
    <PageShell>
      <section className="py-16 md:py-24 bg-[var(--warm-white)]">
        <div className="container-lux">
          <nav className="text-xs tracking-[0.22em] uppercase text-[var(--body)] mb-10">
            <Link to="/" className="hover:text-[var(--gold)]">Home</Link> / <Link to="/products" className="hover:text-[var(--gold)]">Products</Link> / <span className="text-[var(--ink)]">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div
              className="relative aspect-[3/4] flex items-center justify-center overflow-hidden"
              style={{ background: product.gradient }}
            >
              <div className="absolute inset-0 opacity-10">
                <AriseCrest className="absolute -right-16 -bottom-16 h-[400px] w-[400px]" color="white" />
              </div>
              {product.image ? (
                <img src={product.image} alt={product.imageAlt} className="relative z-10 h-[92%] w-auto object-contain drop-shadow-2xl" />
              ) : (
                <div className="text-white/80 flex flex-col items-center gap-3">
                  <AriseCrest className="h-32 w-32" color="white" />
                  <span className="text-xs tracking-[0.3em] uppercase">Pack visual coming soon</span>
                </div>
              )}
            </div>

            <div>
              <span className="eyebrow">Deodorant Body Spray · 250 ml</span>
              <h1 className="mt-4 text-5xl md:text-6xl leading-[1.02] text-[var(--ink)]">{product.name}</h1>
              <p className="mt-5 text-lg text-[var(--body)] leading-relaxed">{product.shortDescription}</p>
              <p className="mt-4 text-[var(--body)] leading-relaxed">{product.detailedDescription}</p>

              <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-[var(--border)] pt-8">
                {[
                  ["Brand", "Arise Paris"],
                  ["Product Type", product.productType],
                  ["Net Volume", product.size],
                  ["Equivalent", product.fluidOunce],
                  ["Availability", "B2B Enquiries"],
                  ["Parent Brand", "Ronak Group"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="text-[10px] tracking-[0.24em] uppercase text-[var(--body)]">{k}</dt>
                    <dd className="mt-1 text-sm text-[var(--ink)]">{v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex flex-wrap gap-3">
                <AddToEnquiryButton
                  slug={product.slug}
                  className="inline-flex items-center gap-2 bg-[var(--ink)] text-white px-6 py-3.5 text-[11px] tracking-[0.28em] uppercase hover:bg-[var(--gold)] hover:text-[var(--ink)] transition"
                />
                <a href={waLink(`Hello, I'm interested in Arise Paris ${product.name} for B2B distribution.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 border border-[var(--ink)] text-[var(--ink)] px-6 py-3.5 text-[11px] tracking-[0.28em] uppercase hover:bg-[var(--ink)] hover:text-white transition">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <button className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--body)] px-6 py-3.5 text-[11px] tracking-[0.28em] uppercase hover:border-[var(--gold)] hover:text-[var(--gold)] transition" aria-label="Share">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>

              <p className="mt-8 text-xs text-[var(--body)] italic border-l-2 border-[var(--gold)] pl-4">
                Product information and packaging may be updated. Commercial specifications are available upon enquiry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-24 bg-[var(--ivory)]">
          <div className="container-lux">
            <h2 className="text-3xl md:text-4xl text-[var(--ink)]">Related from the {product.collection === "bold-dynamic" ? "Bold & Dynamic" : product.collection === "deep-rich" ? "Deep & Rich" : "Soft & Expressive"} group</h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-[var(--warm-white)]">
        <div className="container-lux max-w-3xl text-center">
          <h2 className="text-3xl text-[var(--ink)]">Enquire about {product.name}</h2>
          <p className="mt-4 text-[var(--body)]">Speak with our team about wholesale, import and distribution opportunities.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${site.email}?subject=Enquiry: ${product.name}`} className="bg-[var(--ink)] text-white px-6 py-3.5 text-[11px] tracking-[0.28em] uppercase">Email Us</a>
            <Link to="/become-a-distributor" className="border border-[var(--ink)] px-6 py-3.5 text-[11px] tracking-[0.28em] uppercase text-[var(--ink)]">Become Distributor</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}