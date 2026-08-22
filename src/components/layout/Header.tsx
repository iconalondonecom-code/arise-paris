import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ClipboardList } from "lucide-react";
import { site } from "@/data/site";
import { useEnquiry } from "@/lib/enquiry";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/b2b-partnership", label: "B2B Partnership" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header({ transparentOverHero = false }: { transparentOverHero?: boolean }) {
  const [scrolled, setScrolled] = useState(!transparentOverHero);
  const [open, setOpen] = useState(false);
  const { items, setOpen: setEnquiryOpen } = useEnquiry();

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
      <div className="container-wide flex items-center justify-between h-[84px] md:h-[96px]">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label="Arise Paris home">
          <img src={site.logo} alt="Arise Paris" className="h-[68px] md:h-[96px] w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="relative nav-link text-white/85 hover:text-[var(--gold-muted)] transition pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold-muted)] focus-visible:outline-offset-4"
              activeProps={{
                className:
                  "text-[var(--gold-muted)] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-px after:bg-[var(--gold-muted)]",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <button
            type="button"
            aria-label={`Open enquiry list (${items.length} products)`}
            onClick={() => setEnquiryOpen(true)}
            className="relative inline-flex items-center gap-2 border border-white/25 text-white/90 hover:text-[var(--gold-muted)] hover:border-[var(--gold-muted)] transition px-2.5 py-2 md:px-3.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold-muted)] focus-visible:outline-offset-2"
          >
            <ClipboardList className="h-[18px] w-[18px]" />
            <span className="hidden md:inline nav-link">Enquiry List ({items.length})</span>
            {items.length > 0 && (
              <span className="md:hidden absolute -top-1 -right-1 grid h-4 w-4 place-items-center rounded-full bg-[var(--gold-muted)] text-[9px] font-semibold text-[#05091A]">
                {items.length}
              </span>
            )}
          </button>
          <Link
            to="/request-catalogue"
            className="hidden md:inline-flex items-center bg-[var(--gold-muted)] text-[#05091A] btn-label px-5 py-3 hover:brightness-110 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-white focus-visible:outline-offset-2"
          >
            Request Catalogue
          </Link>
          <Link
            to="/become-a-distributor"
            className="hidden xl:inline-flex items-center border border-white/30 text-white btn-label px-5 py-3 hover:border-[var(--gold-muted)] hover:text-[var(--gold-muted)] transition"
          >
            Become a Distributor
          </Link>

          <button
            className="lg:hidden text-white p-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--gold-muted)]"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
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
