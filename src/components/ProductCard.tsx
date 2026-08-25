import { Link } from "@tanstack/react-router";
import { AriseCrest } from "./AriseCrest";
import type { Product } from "@/data/products";
import { colourOf } from "@/data/colours";
import { AddToEnquiryButton } from "./enquiry/AddToEnquiryButton";

export function ProductCard({ product }: { product: Product }) {
  const c = colourOf(product.slug);

  return (
    <article className="group flex flex-col">
      <Link
        to="/products/$slug"
        params={{ slug: product.slug }}
        className="relative aspect-[4/5] overflow-hidden flex items-end justify-center"
        style={{ background: `linear-gradient(180deg, ${c.mid} 0%, ${c.deep} 100%)` }}
        aria-label={`View ${product.name}`}
      >
        <span
          aria-hidden
          className="absolute inset-x-0 top-[18%] h-1/2 blur-3xl opacity-45"
          style={{ background: c.glow }}
        />
        <span aria-hidden className="absolute inset-0 opacity-[0.07] pointer-events-none">
          <AriseCrest className="absolute -right-12 -bottom-12 h-80 w-80" color="#FFFFFF" />
        </span>
        {product.image ? (
          <img
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            className="relative z-10 h-[92%] w-auto object-contain object-bottom drop-shadow-[0_28px_44px_rgba(0,0,0,0.6)] transition-transform duration-700 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="relative z-10 mb-16 flex flex-col items-center gap-3 px-6 text-center text-white/70">
            <AriseCrest className="h-24 w-24" color="#FFFFFF" />
            <span className="text-[10px] tracking-[0.3em] uppercase">Pack visual coming soon</span>
          </div>
        )}
      </Link>

      <div className="pt-6 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="product-name text-[var(--ink)]">
            <Link to="/products/$slug" params={{ slug: product.slug }}>
              {product.name}
            </Link>
          </h3>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[var(--body)] shrink-0">
            250 ml
          </span>
        </div>
        <p className="mt-2 text-[15px] leading-[1.7] text-[var(--body)] line-clamp-2 flex-1">
          {product.shortDescription}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="inline-flex items-center justify-center btn-label border border-[var(--ink)] text-[var(--ink)] px-5 py-3 hover:bg-[var(--ink)] hover:text-[var(--warm-white)] transition"
          >
            View Product
          </Link>
          <AddToEnquiryButton
            slug={product.slug}
            className="inline-flex items-center gap-1.5 btn-label text-[var(--body)] hover:text-[var(--ink)] transition"
          />
        </div>
      </div>
    </article>
  );
}
