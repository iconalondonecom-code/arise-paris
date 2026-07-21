import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TopBar } from "./TopBar";
import { WhatsAppFloat } from "./WhatsAppFloat";

export function PageShell({
  children,
  transparentHeader = false,
}: {
  children: ReactNode;
  transparentHeader?: boolean;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--warm-white)]">
      <TopBar />
      <Header transparentOverHero={transparentHeader} />
      <main className={transparentHeader ? "-mt-20 md:-mt-24" : ""}>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}