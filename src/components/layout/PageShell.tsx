import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { TopBar } from "./TopBar";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { EnquiryProvider } from "@/lib/enquiry";
import { EnquiryList } from "@/components/enquiry/EnquiryList";

export function PageShell({
  children,
  transparentHeader = false,
}: {
  children: ReactNode;
  transparentHeader?: boolean;
}) {
  return (
    <EnquiryProvider>
      <div className="min-h-screen flex flex-col bg-[#05091A]">
        <TopBar />
        <Header transparentOverHero={transparentHeader} />
        <main className={transparentHeader ? "-mt-[72px] md:-mt-20" : ""}>{children}</main>
        <Footer />
        <WhatsAppFloat />
        <EnquiryList />
      </div>
    </EnquiryProvider>
  );
}