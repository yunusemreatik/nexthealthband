"use client";

import Header from "./Header";
import Footer from "./Footer";
import WhatsAppButton from "../shared/WhatsAppButton";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
