import { Mail, Phone, MessageCircle } from "lucide-react";
import { site } from "@/data/site";

export function TopBar() {
  return (
    <div className="hidden md:block bg-[var(--ink)] text-[var(--warm-white)]/80 text-xs">
      <div className="container-lux flex items-center justify-between py-2">
        <span className="tracking-[0.24em] uppercase text-[10px] text-[var(--gold)]">
          B2B Distribution Enquiries Worldwide
        </span>
        <div className="flex items-center gap-6">
          <a href={`mailto:${site.email}`} className="flex items-center gap-1.5 hover:text-[var(--gold)] transition">
            <Mail className="h-3 w-3" /> {site.email}
          </a>
          <a href={`tel:${site.phoneUAE.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-[var(--gold)] transition">
            <Phone className="h-3 w-3" /> UAE {site.phoneUAE}
          </a>
          <a href={site.whatsappIndia} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-[var(--gold)] transition">
            <MessageCircle className="h-3 w-3" /> India {site.phoneIndia}
          </a>
        </div>
      </div>
    </div>
  );
}