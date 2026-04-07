import Header from "./Header";
import Footer from "./Footer";
import WhatsAppServerButton from "../shared/WhatsAppServerButton";

/**
 * Server component — wraps all public pages with Header, Footer, WhatsApp.
 * Admin pages use their own layout and don't render this.
 */
export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
      <WhatsAppServerButton />
    </>
  );
}
