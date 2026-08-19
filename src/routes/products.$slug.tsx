import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { getProduct, products, collections } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { site, waLink } from "@/data/site";
import { AriseCrest } from "@/components/AriseCrest";
import { MessageCircle } from "lucide-react";
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

  const specs: [string, string][] = [
    ["Brand", "Arise Paris"],
    ["Product Type", product.productType],
    ["Net Volume", product.size],
    ["Equivalent", product.fluidOunce],
    ["Availability", "B2B Enquiries"],
    ["A Brand of", "Ronak Group"],
  ];

  return (
    <PageShell>
      {/* Cinematic gallery / hero */}
      <section className="py-14 md:py-20 bg-[var(--warm-white)]">
        <div className="container-wide">
          <nav className="text-xs tracking-[0.22em] uppercase text-[var(--body)] mb-8 md:mb-10">
            <Link to="/" className="hover:text-[var(--gold)]">Home</Link> / <Link to="/products" className="hover:text-[var(--gold)]">Products</Link> / <span className="text-[var(--ink)]">{product.name}</span>
          </nav>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div
              className="relative aspect-[4/5] lg:aspect-[4/5] flex items-center justify-center overflow-hidden rounded-sm"
              style={{ background: product.gradient }}
            >
              <div className="absolute inset-0 opacity-10">
                <AriseCrest className="absolute -right-16 -bottom-16 h-[420px] w-[420px]" color="white" />
              </div>
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.imageAlt}
                  className="relative z-10 h-[88%] w-auto max-w-[80%] object-contain drop-shadow-2xl"
                />
              ) : (
                <div className="text-white/80 flex flex-col items-center gap-3">
                  <AriseCrest className="h-32 w-32" color="white" />
                  <span className="text-xs tracking-[0.3em] uppercase">Pack visual coming soon</span>
                </div>
              )}
              <span className="absolute top-5 left-5 z-20 text-[10px] tracking-[0.25em] uppercase text-white/90 bg-black/25 backdrop-blur-sm px-3 py-1">
                250 ml
              </span>
            </div>

            <div>
              <span className="eyebrow">Deodorant Body Spray · 250 ml</span>
              <h1 className="display-lg mt-4 text-[var(--ink)]">{product.name}</h1>
              <p className="body-lg mt-5 text-[var(--body)]">{product.shortDescription}</p>

              <div className="mt-10 flex flex-wrap gap-3">
                <AddToEnquiryButton
                  slug={product.slug}
                  className="inline-flex items-center gap-2 bg-[var(--ink)] text-white px-6 py-3.5 btn-label hover:bg-[var(--gold)] hover:text-[var(--ink)] transition"
                />
                <Link
                  to="/become-a-distributor"
                  className="inline-flex items-center gap-2 border border-[var(--ink)] text-[var(--ink)] px-6 py-3.5 btn-label hover:bg-[var(--ink)] hover:text-white transition"
                >
                  Request Catalogue
                </Link>
                <a
                  href={waLink(`Hello, I'm interested in Arise Paris ${product.name} for B2B distribution.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border border-[var(--border)] text-[var(--body)] px-6 py-3.5 btn-label hover:border-[var(--gold)] hover:text-[var(--gold)] transition"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 md:py-20 bg-[var(--ivory)]">
        <div className="container-lux max-w-3xl">
          <span className="eyebrow">Overview</span>
          <h2 className="display-md mt-3 text-[var(--ink)]">About {product.name}</h2>
          <p className="body-lg mt-5 text-[var(--body)]">{product.detailedDescription}</p>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-16 md:py-20 bg-[var(--warm-white)]">
        <div className="container-lux max-w-3xl">
          <span className="eyebrow">Specifications</span>
          <h2 className="display-md mt-3 text-[var(--ink)]">Product Specifications</h2>
          <dl className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-6 border-t border-[var(--border)] pt-8">
            {specs.map(([k, v]) => (
              <div key={k}>
                <dt className="text-[10px] tracking-[0.24em] uppercase text-[var(--body)]">{k}</dt>
                <dd className="mt-1 text-sm text-[var(--ink)]">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* B2B information */}
      <section className="py-16 md:py-20 bg-[var(--ivory)]">
        <div className="container-lux max-w-3xl">
          <span className="eyebrow">For Business Partners</span>
          <h2 className="display-md mt-3 text-[var(--ink)]">B2B Partnership & Enquiries</h2>
          <p className="body-lg mt-5 text-[var(--body)]">
            {product.name} is available for distributors, wholesalers and retailers interested in adding Arise
            Paris to their portfolio. To begin, add this product to your enquiry list and share your business
            details with our team via the enquiry form, or reach out directly on WhatsApp for a faster response.
            Our team will follow up with the relevant commercial information for your market.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-20 md:py-24 bg-[var(--warm-white)]">
          <div className="container-wide">
            <span className="eyebrow">You May Also Like</span>
            <h2 className="display-md mt-3 text-[var(--ink)]">More from {collections[product.collection].title}</h2>
            <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {related.map((p) => <ProductCard key={p.slug} product={p} />)}
            </div>
          </div>
        </section>
      )}

      <section className="py-20 bg-[var(--ink)] text-white">
        <div className="container-lux max-w-3xl text-center">
          <h2 className="display-md text-white">Enquire about {product.name}</h2>
          <p className="body-lg mt-4 text-white/70">Speak with our team about wholesale, import and distribution opportunities.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${site.email}?subject=Enquiry: ${product.name}`} className="bg-white text-[var(--ink)] px-6 py-3.5 btn-label">Email Us</a>
            <Link to="/become-a-distributor" className="border border-white/40 px-6 py-3.5 btn-label text-white hover:bg-white/10 transition">Become Distributor</Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
