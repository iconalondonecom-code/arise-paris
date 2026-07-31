import { Link } from "@tanstack/react-router";
import { ClipboardList, X, MessageCircle, Trash2 } from "lucide-react";
import { useEnquiry } from "@/lib/enquiry";
import { products } from "@/data/products";
import { waLink } from "@/data/site";

export function EnquiryList() {
  const { items, remove, clear, open, setOpen } = useEnquiry();
  const selected = items.map((slug) => products.find((p) => p.slug === slug)).filter(Boolean) as typeof products;

  const message =
    selected.length > 0
      ? `Hello, I would like to enquire about the following Arise Paris deodorant body sprays (250 ml) for B2B distribution:\n${selected
          .map((p) => `• ${p.name}`)
          .join("\n")}`
      : undefined;

  return (
    <>
      {selected.length > 0 && !open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full bg-[var(--gold-muted)] text-[#05091A] px-5 py-3 text-[12px] tracking-[0.16em] uppercase shadow-[0_18px_40px_-16px_rgba(0,0,0,0.8)] hover:brightness-110 transition"
        >
          <ClipboardList className="h-4 w-4" />
          Enquiry List
          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#05091A] text-[11px] text-[var(--gold-muted)]">
            {selected.length}
          </span>
        </button>
      )}

      {open && (
        <div className="fixed inset-0 z-[60] flex">
          <button
            type="button"
            aria-label="Close enquiry list"
            className="flex-1 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="w-full max-w-md h-full overflow-y-auto bg-[#05091A] border-l border-white/10 p-6 text-[var(--text-muted)]">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl text-[var(--text-white)]">Your Enquiry List</h2>
              <button type="button" onClick={() => setOpen(false)} aria-label="Close" className="text-white/70 hover:text-white">
                <X className="h-5 w-5" />
              </button>
            </div>

            {selected.length === 0 ? (
              <p className="mt-8 text-sm">
                No products added yet. Browse the collection and use “Add to Enquiry”.
              </p>
            ) : (
              <>
                <ul className="mt-6 space-y-3">
                  {selected.map((p) => (
                    <li key={p.slug} className="flex items-center gap-3 border border-white/10 p-3">
                      {p.image && <img src={p.image} alt={p.imageAlt} className="h-14 w-10 object-contain" />}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-[var(--text-white)] truncate">{p.name}</p>
                        <p className="text-[11px] tracking-[0.2em] uppercase">250 ml</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => remove(p.slug)}
                        aria-label={`Remove ${p.name}`}
                        className="text-white/50 hover:text-[var(--gold-muted)]"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 flex flex-col gap-3">
                  <Link
                    to="/become-a-distributor"
                    onClick={() => setOpen(false)}
                    className="inline-flex justify-center items-center px-6 py-3 text-[13px] tracking-[0.16em] uppercase bg-[var(--gold-muted)] text-[#05091A] hover:brightness-110 transition"
                  >
                    Enquire About These Products
                  </Link>
                  <a
                    href={waLink(message)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex justify-center items-center gap-2 px-6 py-3 text-[13px] tracking-[0.16em] uppercase bg-[#128C4B] text-white hover:brightness-110 transition"
                  >
                    <MessageCircle className="h-4 w-4" /> WhatsApp Enquiry
                  </a>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-[12px] tracking-[0.16em] uppercase text-white/50 hover:text-white"
                  >
                    Clear list
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </>
  );
}
