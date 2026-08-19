import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { products, collections, type CollectionGroup } from "@/data/products";

export const Route = createFileRoute("/products/")({
  head: () => ({
    meta: [
      { title: "Arise Paris Deodorant Body Spray Collection" },
      { name: "description", content: "Discover all Arise Paris 250 ml deodorant body spray variants available for B2B product, wholesale and distribution enquiries." },
      { property: "og:title", content: "Arise Paris Body Spray Collection" },
      { property: "og:description", content: "Explore the complete Arise Paris 250 ml deodorant body spray range." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const [group, setGroup] = useState<CollectionGroup | "all">("all");

  const filtered = useMemo(
    () => (group === "all" ? products : products.filter((p) => p.collection === group)),
    [group],
  );

  const chips: { key: CollectionGroup | "all"; label: string }[] = [
    { key: "all", label: "All" },
    ...(Object.entries(collections).map(([k, v]) => ({ key: k as CollectionGroup, label: v.title }))),
  ];

  return (
    <PageShell>
      <section className="bg-[var(--ink)] text-white py-20 md:py-28">
        <div className="container-lux">
          <nav className="text-xs tracking-[0.22em] uppercase text-white/50 mb-8">
            <a href="/" className="hover:text-[var(--gold)]">Home</a> / <span className="text-[var(--gold)]">Products</span>
          </nav>
          <span className="eyebrow">The Collection</span>
          <h1 className="display-lg mt-4 max-w-4xl">Arise Paris Body Spray Collection</h1>
          <p className="body-lg mt-6 text-white/70 max-w-2xl">
            Explore all Arise Paris Deodorant Body Spray variants, each presented in a 250 ml / 8.45 fl. oz. format with its own distinctive visual and fragrance personality.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-[var(--warm-white)]">
        <div className="container-wide">
          <div className="flex flex-wrap gap-2 mb-14">
            {chips.map((c) => (
              <button
                key={c.key}
                type="button"
                onClick={() => setGroup(c.key)}
                className={`px-5 py-2.5 text-[11px] tracking-[0.2em] uppercase border transition ${
                  group === c.key
                    ? "bg-[var(--ink)] text-white border-[var(--ink)]"
                    : "border-[var(--border)] text-[var(--body)] hover:border-[var(--ink)] hover:text-[var(--ink)]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
