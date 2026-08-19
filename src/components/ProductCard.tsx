import { Link } from "@tanstack/react-router";
import { AriseCrest } from "./AriseCrest";
import type { Product } from "@/data/products";
import { AddToEnquiryButton } from "./enquiry/AddToEnquiryButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col bg-white border border-[var(--border)] overflow-hidden transition hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.2)]">
      <div
        className="relative aspect-[4/5] overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: product.accentSoft }}
      >
        <div
          className="absolute inset-0 opacity-90"
          style={{ background: `radial-gradient(120% 100% at 50% 100%, ${product.accentSoft} 0%, transparent 60%)` }}
        />
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <AriseCrest className="absolute -right-10 -bottom-10 h-72 w-72" color={product.accent} />
        </div>
        {product.image ? (
          <img
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            className="relative z-10 h-[86%] w-auto object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-xl"
          />
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center gap-3 px-6 text-center" style={{ color: product.accent }}>
            <AriseCrest className="h-24 w-24" color={product.accent} />
            <span className="text-[10px] tracking-[0.3em] uppercase">Pack visual coming soon</span>
          </div>
        )}
      </div>
      <div className="p-6 md:p-7 flex flex-col flex-1">
        <h3 className="product-name text-[var(--ink)]">{product.name}</h3>
        <p className="mt-2.5 text-sm text-[var(--body)] leading-relaxed line-clamp-2 flex-1">
          {product.shortDescription}
        </p>
        <p className="mt-4 text-[11px] tracking-[0.2em] uppercase text-[var(--body)]">250 ml</p>
        <div className="mt-5 flex items-center justify-between gap-3 pt-4 border-t border-[var(--border)]">
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="btn-label text-[var(--ink)] hover:text-[var(--gold)] transition"
          >
            View Product
          </Link>
          <AddToEnquiryButton
            slug={product.slug}
            className="inline-flex items-center gap-1.5 btn-label text-[var(--body)] hover:text-[var(--ink)] transition"
          />
        </div>
      </div>
    </div>
  );
}
