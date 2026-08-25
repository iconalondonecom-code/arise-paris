import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/data/site";
import { products } from "@/data/products";

export function Footer() {
  return (
    <footer className="bg-[#05091A] text-[var(--text-muted)] border-t border-white/10">
      <div className="container-wide py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
        <div>
          <img src={site.logo} alt="Arise Paris" className="h-28 md:h-32 w-auto mb-7" />
          <p className="text-[15px] leading-[1.8]">
            Arise Paris is a contemporary body fragrance brand offering a distinctive collection of 250 ml deodorant body sprays for international B2B customers.
          </p>
        </div>

        <div>
          <h4 className="text-white text-xs tracking-[0.28em] uppercase mb-6">Quick Links</h4>
          <ul className="space-y-3.5 text-[15px] leading-relaxed">
            {[
              { to: "/", l: "Home" },
              { to: "/about", l: "About" },
              { to: "/products", l: "Products" },
              { to: "/b2b-partnership", l: "B2B Partnership" },
              { to: "/become-a-distributor", l: "Become a Distributor" },
              { to: "/request-catalogue", l: "Request Catalogue" },
              { to: "/blog", l: "Blog" },
              { to: "/contact", l: "Contact" },
              { to: "/sitemap", l: "Sitemap" },
            ].map((i) => (
              <li key={i.to}>
                <Link to={i.to} className="hover:text-[var(--gold)] transition">{i.l}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs tracking-[0.28em] uppercase mb-6">Products</h4>
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-[15px] leading-relaxed">
            {products.map((p) => (
              <li key={p.slug}>
                <Link to="/products/$slug" params={{ slug: p.slug }} className="hover:text-[var(--gold)] transition">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white text-xs tracking-[0.28em] uppercase mb-6">Contact</h4>
          <ul className="space-y-4 text-[15px] leading-relaxed">
            <li className="flex items-start gap-2">
              <Mail className="h-4 w-4 mt-0.5 shrink-0 text-[var(--gold)]" />
              <a href={`mailto:${site.email}`} className="hover:text-[var(--gold)] transition">{site.email}</a>
            </li>
            <li className="flex items-start gap-2">
              <Phone className="h-4 w-4 mt-0.5 shrink-0 text-[var(--gold)]" />
              <div>
                <div>UAE {site.phoneUAE}</div>
                <div>India {site.phoneIndia}</div>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[var(--gold)]" />
              <address className="not-italic leading-relaxed">
                {site.address.line1},<br />
                {site.address.line2},<br />
                {site.address.line3},<br />
                {site.address.city},<br />
                {site.address.country}
              </address>
            </li>
          </ul>

          <div className="mt-8 pt-6 border-t border-white/10">
            <a href={site.ronakUrl} target="_blank" rel="noreferrer" className="inline-block">
              <img src={site.ronakLogo} alt="Ronak Group" className="h-16 w-auto" />
            </a>
            <p className="text-xs mt-3 tracking-wider text-white/60">
              Parent Group: Ronak Group — Arise Paris is a brand of Ronak Group.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-xs text-white/50">
          <p>{site.copyright}</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-[var(--gold)]">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-[var(--gold)]">Terms</Link>
            <Link to="/sitemap" className="hover:text-[var(--gold)]">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
