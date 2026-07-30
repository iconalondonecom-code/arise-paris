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
          ? "bg-[#05091A]/95 backdrop-blur border-b border-white/10"
          : "bg-gradient-to-b from-black/45 to-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between h-[72px] md:h-20">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Arise Paris home">
          <img
            src={site.logo}
            alt="Arise Paris"
            className="h-11 md:h-14 w-auto"
            style={{ filter: "invert(1) brightness(2)" }}
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative text-[13px] tracking-[0.16em] uppercase text-white/85 hover:text-[var(--gold-muted)] transition pb-1"
              activeProps={{
                className:
                  "text-[var(--gold-muted)] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-[var(--gold-muted)]",
              }}
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
            className="hidden md:inline-flex items-center bg-[var(--gold-muted)] text-[#05091A] text-[13px] font-medium tracking-[0.14em] uppercase px-5 py-2.5 hover:brightness-110 hover:-translate-y-0.5 transition"
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
        <div className="lg:hidden bg-[#05091A] border-t border-white/10">
          <nav className="container-lux flex flex-col py-6 gap-1">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="py-3 text-sm tracking-[0.16em] uppercase text-white/85 hover:text-[var(--gold-muted)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/become-a-distributor"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center bg-[var(--gold-muted)] text-[#05091A] text-[13px] tracking-[0.14em] uppercase px-5 py-3"
            >
              Become a Distributor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}