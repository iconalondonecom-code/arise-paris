import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const KEY = "arise-enquiry-list";

type EnquiryCtx = {
  items: string[];
  has: (slug: string) => boolean;
  add: (slug: string) => void;
  remove: (slug: string) => void;
  toggle: (slug: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const Ctx = createContext<EnquiryCtx | null>(null);

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const add = useCallback((slug: string) => {
    setItems((prev) => (prev.includes(slug) ? prev : [...prev, slug]));
    setOpen(true);
  }, []);
  const remove = useCallback((slug: string) => setItems((prev) => prev.filter((s) => s !== slug)), []);
  const toggle = useCallback(
    (slug: string) => setItems((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug])),
    [],
  );
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<EnquiryCtx>(
    () => ({ items, has: (s) => items.includes(s), add, remove, toggle, clear, open, setOpen }),
    [items, add, remove, toggle, clear, open],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useEnquiry() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useEnquiry must be used within EnquiryProvider");
  return ctx;
}
