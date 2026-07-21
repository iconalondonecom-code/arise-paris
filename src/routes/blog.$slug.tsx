import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageShell } from "@/components/layout/PageShell";
import { getPost, posts, type BlogPost } from "@/data/blog";
import { EnquiryCTA } from "@/components/EnquiryCTA";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }): { post: BlogPost } => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData ? [
      { title: loaderData.post.seoTitle },
      { name: "description", content: loaderData.post.metaDescription },
      { property: "og:title", content: loaderData.post.seoTitle },
      { property: "og:description", content: loaderData.post.metaDescription },
      { property: "og:type", content: "article" },
    ] : [],
  }),
  notFoundComponent: () => (
    <PageShell>
      <section className="container-lux py-32 text-center">
        <h1 className="text-4xl">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-[var(--gold)]">← Back to Blog</Link>
      </section>
    </PageShell>
  ),
  errorComponent: () => (
    <PageShell>
      <section className="container-lux py-32 text-center">
        <h1>Something went wrong</h1>
      </section>
    </PageShell>
  ),
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData();
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <PageShell>
      <article className="bg-[var(--warm-white)]">
        <header className="bg-[var(--ink)] text-white py-24 md:py-32">
          <div className="container-lux max-w-3xl">
            <nav className="text-xs tracking-[0.22em] uppercase text-white/50 mb-6">
              <Link to="/" className="hover:text-[var(--gold)]">Home</Link> / <Link to="/blog" className="hover:text-[var(--gold)]">Blog</Link> / <span className="text-[var(--gold)]">{post.category}</span>
            </nav>
            <span className="eyebrow">{post.category}</span>
            <h1 className="mt-4 text-4xl md:text-6xl leading-[1.05]">{post.title}</h1>
            <div className="mt-8 flex items-center gap-4 text-xs text-white/60">
              <span>{post.author}</span><span>·</span><span>{post.date}</span><span>·</span><span>{post.readTime}</span>
            </div>
          </div>
        </header>

        <div className="container-lux max-w-3xl py-20">
          <p className="text-xl text-[var(--ink)] leading-relaxed font-serif italic border-l-2 border-[var(--gold)] pl-6">{post.excerpt}</p>
          <div className="mt-12 space-y-8 text-[var(--body)] leading-relaxed">
            {post.content.map((c, i) => (
              <div key={i}>
                {c.heading && <h2 className="text-2xl md:text-3xl text-[var(--ink)] mb-4">{c.heading}</h2>}
                <p>{c.body}</p>
              </div>
            ))}
          </div>

          {post.faq.length > 0 && (
            <div className="mt-16 border-t border-[var(--border)] pt-12">
              <h2 className="text-3xl text-[var(--ink)]">Frequently Asked Questions</h2>
              <div className="mt-8 space-y-6">
                {post.faq.map((f) => (
                  <div key={f.q}>
                    <h3 className="text-lg text-[var(--ink)] font-serif">{f.q}</h3>
                    <p className="mt-2 text-[var(--body)]">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <section className="py-20 bg-[var(--ivory)]">
          <div className="container-lux">
            <h2 className="text-3xl text-[var(--ink)]">Related Articles</h2>
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group p-6 border border-[var(--border)] bg-white hover:border-[var(--gold)] transition">
                  <span className="eyebrow">{p.category}</span>
                  <h3 className="mt-2 text-xl text-[var(--ink)] font-serif group-hover:text-[var(--gold)]">{p.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <EnquiryCTA />
      </article>
    </PageShell>
  );
}