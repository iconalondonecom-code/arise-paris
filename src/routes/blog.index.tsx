import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { posts } from "@/data/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Fragrance & Retail Insights | Arise Paris Blog" },
      { name: "description", content: "Educational articles on body fragrance, retail merchandising and B2B insights from the Arise Paris team." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [featured, ...rest] = posts;
  return (
    <PageShell>
      <section className="bg-[var(--ink)] text-white py-24 md:py-32">
        <div className="container-lux max-w-4xl">
          <span className="eyebrow">The Journal</span>
          <h1 className="mt-4 text-5xl md:text-7xl leading-[1.02]">Fragrance & Retail Insights.</h1>
          <p className="mt-6 text-white/70 text-lg max-w-2xl">Educational and B2B-focused perspectives on body fragrance, distribution and retail.</p>
        </div>
      </section>

      <section className="py-20 bg-[var(--warm-white)]">
        <div className="container-lux">
          <Link to="/blog/$slug" params={{ slug: featured.slug }} className="group grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center border border-[var(--border)] p-8 md:p-12 hover:border-[var(--gold)] transition">
            <div className="aspect-[4/3] bg-gradient-to-br from-[var(--ink)] via-[#2a1608] to-[var(--gold)] relative overflow-hidden">
              <span className="absolute top-4 left-4 text-[10px] tracking-[0.24em] uppercase text-white/80 bg-black/25 px-3 py-1">Featured</span>
            </div>
            <div>
              <span className="eyebrow">{featured.category}</span>
              <h2 className="mt-3 text-4xl text-[var(--ink)] group-hover:text-[var(--gold)] transition">{featured.title}</h2>
              <p className="mt-4 text-[var(--body)] leading-relaxed">{featured.excerpt}</p>
              <div className="mt-6 flex items-center gap-4 text-xs text-[var(--body)]">
                <span>{featured.date}</span><span>·</span><span>{featured.readTime}</span>
              </div>
            </div>
          </Link>

          <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link key={post.slug} to="/blog/$slug" params={{ slug: post.slug }} className="group border border-[var(--border)] p-8 hover:border-[var(--gold)] transition flex flex-col bg-white">
                <span className="eyebrow">{post.category}</span>
                <h3 className="mt-3 text-2xl text-[var(--ink)] font-serif group-hover:text-[var(--gold)] transition">{post.title}</h3>
                <p className="mt-3 text-sm text-[var(--body)] leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
                <div className="mt-6 flex items-center justify-between text-xs text-[var(--body)]">
                  <span>{post.date}</span><span>{post.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}