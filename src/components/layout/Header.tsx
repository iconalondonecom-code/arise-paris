import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, Globe } from "lucide-react";
import { site } from "@/data/site";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/b2b-partnership", label: "B2B Partnership" },
  { to: "/become-a-distributor", label: "Distributor" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header({ transparentOverHero = false }: { transparentOverHero?: boolean }) {
  const [scrolled, setScrolled] = useState(!transparentOverHero);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!transparentOverHero) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparentOverHero]);

  const solid = scrolled || open;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        solid
          ? "bg-[var(--ink)]/95 backdrop-blur border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-lux flex items-center justify-between h-20 md:h-24">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Arise Paris home">
          <img
            src={site.logo}
            alt="Arise Paris"
            className="h-12 md:h-14 w-auto"
            style={{ filter: "invert(1) brightness(2)" }}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-[11px] tracking-[0.24em] uppercase text-white/80 hover:text-[var(--gold)] transition"
              activeProps={{ className: "text-[var(--gold)]" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Search" className="hidden md:inline-flex text-white/70 hover:text-[var(--gold)]">
            <Search className="h-4 w-4" />
          </button>
          <button aria-label="Language" className="hidden md:inline-flex text-white/70 hover:text-[var(--gold)]">
            <Globe className="h-4 w-4" />
          </button>
          <Link
            to="/become-a-distributor"
            className="hidden md:inline-flex items-center border border-[var(--gold)] text-[var(--gold)] text-[11px] tracking-[0.24em] uppercase px-5 py-2.5 hover:bg-[var(--gold)] hover:text-[var(--ink)] transition"
          >
            Become a Distributor
          </Link>
          <button
            className="lg:hidden text-white p-2"
            aria-label="Menu"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden bg-[var(--ink)] border-t border-white/5">
          <nav className="container-lux flex flex-col py-6 gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm tracking-[0.2em] uppercase text-white/80 hover:text-[var(--gold)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/become-a-distributor"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center border border-[var(--gold)] text-[var(--gold)] text-[11px] tracking-[0.24em] uppercase px-5 py-3"
            >
              Become a Distributor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}