import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { colourOf, heroOrder, journeyBackground } from "@/data/colours";
import { useCarousel } from "./useJourney";

const lineup = heroOrder
  .map((slug) => products.find((p) => p.slug === slug)!)
  .filter(Boolean);

export function HeroJourney() {
  const { index, setIndex, next, prev, swipeHandlers, keyHandlers, hoverHandlers } =
    useCarousel(lineup.length);
  const active = lineup[index];
  const accent = colourOf(active.slug);

  return (
    <section
      aria-label="Arise Paris product colour journey"
      tabIndex={0}
      {...keyHandlers}
      {...hoverHandlers}
      {...swipeHandlers}
      className="relative overflow-x-clip outline-none min-h-[700px] md:min-h-[820px] lg:min-h-[940px] flex flex-col justify-center pt-24 pb-14 md:pb-20"
      style={{
        background: journeyBackground(active.slug),
        transition: "background 600ms ease",
      }}
    >
      {/* glow overlays */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(600px 300px at 20% 20%, rgba(16,105,216,0.20), transparent 70%), radial-gradient(600px 300px at 80% 25%, rgba(216,173,82,0.16), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{ background: "linear-gradient(180deg, transparent, #05091A)" }}
      />

      <div className="container-wide relative">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block text-[11px] tracking-[0.34em] uppercase text-[var(--gold-muted)]">
            The Product Colour Journey
          </span>
          <h1 className="mt-4 font-serif leading-[1.03] text-[36px] sm:text-[46px] lg:text-[62px] xl:text-[72px] text-[var(--text-white)]">
            <span className="text-[var(--gold-muted)]">Eleven</span> Expressions.
            <br />
            One Distinctive <span className="text-[var(--gold-muted)]">Collection.</span>
          </h1>
          <p className="mt-5 text-[15px] md:text-[17px] leading-relaxed text-[var(--text-muted)] max-w-2xl mx-auto">
            Discover eleven distinctive 250 ml deodorant body sprays created for modern retail,
            global distribution and expressive everyday fragrance.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] tracking-[0.14em] uppercase font-medium text-[#05091A] bg-[var(--gold-muted)] hover:brightness-110 hover:-translate-y-0.5 transition"
            >
              Discover All Variants <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/request-catalogue"
              className="inline-flex items-center gap-2 px-6 py-3 text-[14px] tracking-[0.14em] uppercase font-medium text-[var(--text-white)] border border-white/35 bg-white/5 hover:bg-white/10 transition"
            >
              Request Catalogue
            </Link>
          </div>
        </div>

        {/* Product lineup */}
        <div className="relative mt-10 md:mt-12">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous product"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-30 h-11 w-11 grid place-items-center rounded-full border border-white/20 bg-black/30 text-white hover:bg-black/60 transition"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next product"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-30 h-11 w-11 grid place-items-center rounded-full border border-white/20 bg-black/30 text-white hover:bg-black/60 transition"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="hero-stage flex items-end justify-center gap-1 sm:gap-2 md:gap-3 px-12 pt-16 md:pt-20 pb-10 md:pb-12">
            {lineup.map((p, i) => {
              const isActive = i === index;
              const dist = Math.abs(i - index);
              const c = colourOf(p.slug);
              return (
                <button
                  key={p.slug}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Select ${p.name}`}
                  aria-current={isActive}
                  className={`relative shrink-0 group hero-bottle ${isActive ? "is-active" : ""} ${dist > 2 ? "hidden sm:block" : ""}`}
                  style={{
                    transform: isActive
                      ? "scale(var(--sel-scale))"
                      : `scale(${0.9 - Math.min(dist, 4) * 0.02})`,
                    transformOrigin: "center bottom",
                    zIndex: isActive ? 20 : 5 - Math.min(dist, 4),
                    transition: "transform 600ms cubic-bezier(.22,.8,.28,1), filter 600ms ease",
                    filter: isActive ? "none" : "brightness(0.78) saturate(0.9)",
                  }}
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-4 mx-auto h-24 w-24 md:h-32 md:w-32 rounded-full blur-2xl"
                    style={{
                      background: c.glow,
                      opacity: isActive ? 0.55 : 0.18,
                      transition: "opacity 600ms ease",
                    }}
                  />
                  {p.image && (
                    <img
                      src={p.image}
                      alt={p.imageAlt}
                      loading={isActive ? "eager" : "lazy"}
                      className="relative h-[190px] sm:h-[230px] md:h-[300px] lg:h-[360px] w-auto object-contain object-bottom drop-shadow-[0_24px_40px_rgba(0,0,0,0.55)]"
                    />
                  )}
                  {/* reflection */}
                  {p.image && (
                    <img
                      aria-hidden
                      src={p.image}
                      alt=""
                      className="relative -mt-2 h-[46px] md:h-[70px] w-auto object-contain object-bottom opacity-20 scale-y-[-1]"
                      style={{
                        maskImage: "linear-gradient(to top, transparent 10%, black 100%)",
                        WebkitMaskImage: "linear-gradient(to top, transparent 10%, black 100%)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Active product info */}
        <div className="mt-6 text-center max-w-xl mx-auto">
          <h2 className="font-serif text-2xl md:text-3xl text-[var(--text-white)]">{active.name}</h2>
          <p className="mt-1 text-[11px] tracking-[0.28em] uppercase" style={{ color: accent.glow }}>
            Deodorant Body Spray · 250 ml / 8.45 fl. oz.
          </p>
          <p className="mt-3 text-sm md:text-[15px] text-[var(--text-muted)] leading-relaxed">
            {active.shortDescription}
          </p>
          <Link
            to="/products/$slug"
            params={{ slug: active.slug }}
            className="mt-4 inline-flex items-center gap-2 text-[13px] tracking-[0.2em] uppercase text-[var(--text-white)] border-b pb-1"
            style={{ borderColor: accent.glow }}
          >
            View {active.name} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Colour dots */}
        <div className="mt-7 flex justify-center gap-2.5">
          {lineup.map((p, i) => {
            const c = colourOf(p.slug);
            const isActive = i === index;
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={p.name}
                className="rounded-full transition-all duration-500"
                style={{
                  background: c.glow,
                  width: isActive ? 26 : 10,
                  height: 10,
                  boxShadow: isActive ? `0 0 14px ${c.glow}` : "none",
                  opacity: isActive ? 1 : 0.55,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}