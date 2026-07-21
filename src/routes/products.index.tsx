import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PageShell } from "@/components/layout/PageShell";
import { ProductCard } from "@/components/ProductCard";
import { products, collections } from "@/data/products";
import { Search } from "lucide-react";

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
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string>("all");
  const [sort, setSort] = useState<"az" | "za">("az");

  const filtered = useMemo(() => {
    let r = products.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase()) ||
      p.shortDescription.toLowerCase().includes(q.toLowerCase()),
    );
    if (group !== "all") r = r.filter((p) => p.collection === group);
    r = [...r].sort((a, b) =>
      sort === "az" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
    );
    return r;
  }, [q, group, sort]);

  return (
    <PageShell>
      <section className="bg-[var(--ink)] text-white py-24 md:py-32">
        <div className="container-lux">
          <nav className="text-xs tracking-[0.22em] uppercase text-white/50 mb-8">
            <a href="/" className="hover:text-[var(--gold)]">Home</a> / <span className="text-[var(--gold)]">Products</span>
          </nav>
          <span className="eyebrow">The Collection</span>
          <h1 className="mt-4 text-5xl md:text-7xl leading-[1.02] max-w-4xl">Arise Paris Body Spray Collection</h1>
          <p className="mt-6 text-white/70 text-lg max-w-2xl">
            Explore all Arise Paris Deodorant Body Spray variants, each presented in a 250 ml / 8.45 fl. oz. format with its own distinctive visual and fragrance personality.
          </p>
        </div>
      </section>

      <section className="py-16 bg-[var(--warm-white)]">
        <div className="container-lux">
          <div className="grid md:grid-cols-[1fr_auto_auto] gap-4 mb-10">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-4 top-1/2 -translate-y-1/2 text-[var(--body)]" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search products…"
                className="w-full h-12 pl-11 pr-4 bg-white border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--gold)]"
              />
            </div>
            <select
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              className="h-12 px-4 bg-white border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="all">All Collections</option>
              {Object.entries(collections).map(([k, v]) => (
                <option key={k} value={k}>{v.title}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as "az" | "za")}
              className="h-12 px-4 bg-white border border-[var(--border)] text-sm focus:outline-none focus:border-[var(--gold)]"
            >
              <option value="az">Sort A – Z</option>
              <option value="za">Sort Z – A</option>
            </select>
          </div>

          <p className="text-xs tracking-[0.24em] uppercase text-[var(--body)] mb-6">
            Showing {filtered.length} of {products.length} products
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}