import { Link } from "@tanstack/react-router";
import { AriseCrest } from "./AriseCrest";
import type { Product } from "@/data/products";
import { AddToEnquiryButton } from "./enquiry/AddToEnquiryButton";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col bg-white border border-[var(--border)] overflow-hidden transition hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.25)]">
      <div
        className="relative aspect-[3/4] overflow-hidden flex items-center justify-center"
        style={{ background: product.gradient }}
      >
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <AriseCrest className="absolute -right-8 -bottom-8 h-64 w-64" color="white" />
        </div>
        {product.image ? (
          <img
            src={product.image}
            alt={product.imageAlt}
            loading="lazy"
            className="relative z-10 h-[90%] w-auto object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-2xl"
          />
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center text-white/80 gap-3 px-6 text-center">
            <AriseCrest className="h-24 w-24" color="white" />
            <span className="text-[10px] tracking-[0.3em] uppercase">Pack visual coming soon</span>
          </div>
        )}
        <span className="absolute top-4 left-4 z-20 text-[10px] tracking-[0.25em] uppercase text-white/90 bg-black/25 backdrop-blur-sm px-3 py-1">
          250 ml
        </span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <span className="eyebrow">Deodorant Body Spray</span>
        <h3 className="mt-2 text-2xl text-[var(--ink)] font-serif">{product.name}</h3>
        <p className="mt-3 text-sm text-[var(--body)] leading-relaxed line-clamp-3 flex-1">
          {product.shortDescription}
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Link
            to="/products/$slug"
            params={{ slug: product.slug }}
            className="text-[11px] tracking-[0.24em] uppercase text-[var(--ink)] border-b border-[var(--gold)] pb-1 hover:text-[var(--gold)] transition"
          >
            View Details
          </Link>
          <AddToEnquiryButton
            slug={product.slug}
            className="ml-auto inline-flex items-center gap-1.5 text-[11px] tracking-[0.24em] uppercase text-[var(--body)] hover:text-[var(--ink)] transition"
          />
        </div>
      </div>
    </div>
  );
}