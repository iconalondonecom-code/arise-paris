import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight, Plus } from "lucide-react";
import { products } from "@/data/products";
import { colourOf, heroOrder } from "@/data/colours";
import { waLink } from "@/data/site";
import { useCarousel } from "./useJourney";

const list = heroOrder.map((slug) => products.find((p) => p.slug === slug)!).filter(Boolean);

export function ProductExplorer() {
  const { index, setIndex, next, prev, swipeHandlers, keyHandlers, hoverHandlers } = useCarousel(
    list.length,
    7000,
  );
  const active = list[index];
  const c = colourOf(active.slug);

  return (
    <section
      className="relative overflow-hidden section-dark"
      style={{
        background: `radial-gradient(900px 600px at 20% 20%, ${c.mid}cc, transparent 70%), radial-gradient(900px 600px at 85% 80%, ${c.glow}33, transparent 70%), linear-gradient(160deg, #12061C 0%, #07142F 55%, #05091A 100%)`,
        transition: "background 600ms ease",
      }}
      tabIndex={0}
      {...keyHandlers}
      {...hoverHandlers}
      {...swipeHandlers}
    >
      <div className="container-wide relative">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-[11px] tracking-[0.32em] uppercase text-[var(--gold-muted)]">
            Interactive Explorer
          </span>
          <h2 className="mt-3 font-serif text-[30px] md:text-[42px] text-[var(--text-white)]">
            Explore the Collection
          </h2>
          <p className="mt-3 text-[15px] md:text-[17px] text-[var(--text-muted)] leading-relaxed">
            Discover every expression and select the body spray that best matches your market and
            customer preferences.
          </p>
        </div>

        {/* Centre-focus card */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-8 items-center rounded-2xl border p-6 md:p-10 backdrop-blur-md"
          style={{
            borderColor: `${c.glow}66`,
            background: `linear-gradient(150deg, ${c.mid}66, rgba(5,9,26,0.72))`,
            boxShadow: `0 30px 90px -40px ${c.glow}`,
            transition: "all 600ms ease",
          }}
        >
          <div className="relative grid place-items-center">
            <span
              aria-hidden
              className="absolute h-56 w-56 md:h-72 md:w-72 rounded-full blur-3xl"
              style={{ background: c.glow, opacity: 0.4 }}
            />
            {active.image && (
              <img
                src={active.image}
                alt={active.imageAlt}
                loading="lazy"
                className="relative h-[300px] md:h-[420px] w-auto object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.6)]"
              />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="font-serif text-[32px] md:text-[44px] text-[var(--text-white)]">
              {active.name}
            </h3>
            <p className="mt-2 text-[12px] tracking-[0.26em] uppercase" style={{ color: c.glow }}>
              Deodorant Body Spray
            </p>
            <p className="mt-1 text-[12px] tracking-[0.26em] uppercase text-[var(--text-muted)]">
              250 ml / 8.45 fl. oz.
            </p>
            <p className="mt-5 text-[15px] md:text-[17px] text-[var(--text-muted)] leading-relaxed">
              {active.shortDescription}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/products/$slug"
                params={{ slug: active.slug }}
                className="inline-flex items-center gap-2 px-5 py-3 text-[13px] tracking-[0.16em] uppercase text-[#05091A] bg-[var(--gold-muted)] hover:brightness-110 transition"
              >
                View Product <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/become-a-distributor"
                className="inline-flex items-center gap-2 px-5 py-3 text-[13px] tracking-[0.16em] uppercase text-[var(--text-white)] border border-white/30 hover:bg-white/10 transition"
              >
                <Plus className="h-4 w-4" /> Add to Enquiry
              </Link>
              <a
                href={waLink(
                  `Hello, I am interested in Arise Paris ${active.name} (250 ml deodorant body spray) for B2B distribution.`,
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-[13px] tracking-[0.16em] uppercase text-white bg-[#128C4B] hover:brightness-110 transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
              </a>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="relative mt-8">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous variant"
            className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 h-10 w-10 grid place-items-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next variant"
            className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 h-10 w-10 grid place-items-center rounded-full border border-white/20 bg-black/40 text-white hover:bg-black/70 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="flex gap-3 overflow-x-auto px-12 pb-2 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {list.map((p, i) => {
              const pc = colourOf(p.slug);
              const isActive = i === index;
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={p.name}
                  className="shrink-0 snap-center rounded-xl border px-3 py-3 w-[112px] md:w-[128px] transition-all duration-500"
                  style={{
                    borderColor: isActive ? pc.glow : "rgba(255,255,255,0.14)",
                    background: isActive ? `${pc.mid}99` : "rgba(255,255,255,0.04)",
                    boxShadow: isActive ? `0 0 30px -8px ${pc.glow}` : "none",
                    transform: isActive ? "translateY(-6px)" : "none",
                  }}
                >
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      loading="lazy"
                      className="h-[104px] md:h-[124px] w-full object-contain"
                    />
                  )}
                  <span className="mt-2 block text-[11px] tracking-[0.12em] uppercase text-[var(--text-muted)] truncate">
                    {p.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}