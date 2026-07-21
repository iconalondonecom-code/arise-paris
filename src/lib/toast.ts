export function successToast(msg: string) {
  if (typeof window === "undefined") return;
  const el = document.createElement("div");
  el.textContent = msg;
  el.className = "fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-[var(--ink)] text-white px-6 py-3 text-sm tracking-wider shadow-2xl border border-[var(--gold)]/40";
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}