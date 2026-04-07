import type { Metadata } from "next";
import ClientLayoutWrapper from "@/app/components/layout/ClientLayoutWrapper";
import ContactCTA from "@/app/components/home/ContactCTA";
import FadeIn from "@/app/components/shared/FadeIn";
import { Mail, Phone, MapPin } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export const metadata: Metadata = {
  title: "İletişim — Next Health Band",
  description: "Next Health Band ile iletişime geçin.",
};

export const revalidate = 60;

async function getContactInfo() {
  const { data } = await supabase.from("contact_info").select("*").limit(1).single();
  return data;
}

export default async function IletisimPage() {
  const info = await getContactInfo();

  return (
    <ClientLayoutWrapper>
      <section className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h1 className="font-display text-5xl font-bold">İletişim</h1>
            <p className="text-muted mt-3">Sorularınız için bize ulaşın</p>
          </FadeIn>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Phone, label: "Telefon", value: info?.phone ?? "+90 (XXX) XXX XX XX" },
              { icon: Mail, label: "E-posta", value: info?.email ?? "info@nexthealthband.com" },
              { icon: MapPin, label: "Adres", value: info?.address ?? "İstanbul, Türkiye" },
            ].map(({ icon: Icon, label, value }) => (
              <FadeIn key={label}>
                <div className="bg-surface border border-border rounded-2xl p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-sm text-muted mb-1">{label}</p>
                  <p className="font-semibold">{value}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
      <ContactCTA />
    </ClientLayoutWrapper>
  );
}
