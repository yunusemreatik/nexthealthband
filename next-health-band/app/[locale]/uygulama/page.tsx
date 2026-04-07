import type { Metadata } from "next";
import Link from "next/link";
import ClientLayoutWrapper from "@/app/components/layout/ClientLayoutWrapper";
import StoreButtons from "@/app/components/shared/StoreButtons";
import FadeIn from "@/app/components/shared/FadeIn";
import { ExternalLink, Zap, Users, Shield, Target, BarChart3, Bell } from "lucide-react";

export const metadata: Metadata = {
  title: "Uygulama — Next Health Band",
  description: "Next Plus Health mobil uygulaması ile Next Health Band'ı senkronize edin.",
};

const appFeatures = [
  { icon: Zap, title: "Gerçek Zamanlı Sync", desc: "Band verileriniz anında uygulamaya aktarılır." },
  { icon: Users, title: "7/24 Uzman Erişimi", desc: "Next Plus Health uzmanlarına doğrudan bağlanın." },
  { icon: BarChart3, title: "Detaylı Raporlar", desc: "Haftalık ve aylık sağlık raporlarınızı görün." },
  { icon: Target, title: "Kişisel Hedefler", desc: "Verilerinize göre özelleştirilmiş hedefler belirleyin." },
  { icon: Shield, title: "Veri Güvenliği", desc: "Sağlık verileriniz şifrelenmiş ve güvende." },
  { icon: Bell, title: "Akıllı Bildirimler", desc: "Anormal değerlerde anında uyarı alın." },
];

export default function UygulamaPage() {
  return (
    <ClientLayoutWrapper>
      {/* Hero */}
      <section className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 bg-accent-soft text-accent rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              Mobil Uygulama
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
              Next Plus Health ile{" "}
              <span className="text-accent">Kesintisiz Çalışır</span>
            </h1>
            <p className="text-muted mt-5 text-lg max-w-2xl mx-auto leading-relaxed">
              Next Health Band&apos;dan gelen tüm sağlık verileri Next Plus Health mobil uygulamasıyla senkronize olur. Sağlık uzmanlarınıza anlık erişim, kişiselleştirilmiş öneriler ve çok daha fazlası tek uygulamada.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <StoreButtons />
              <Link
                href="https://nextplushealth.vercel.app/tr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent font-semibold hover:underline"
              >
                Web&apos;de İncele <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* App showcase */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-6 overflow-x-auto pb-4">
            {["Ana Sayfa", "Sağlık", "Uzman", "Profil"].map((screen, i) => (
              <div key={screen} className="flex-shrink-0 w-44 h-80 bg-accent rounded-[2rem] border-4 border-surface shadow-xl flex flex-col overflow-hidden">
                <div className="bg-accent-green p-3 text-white text-center">
                  <p className="text-xs font-bold">Next Plus Health</p>
                </div>
                <div className="flex-1 bg-bg p-3 space-y-2">
                  <p className="text-xs text-muted font-medium">{screen}</p>
                  {[1, 2, 3].map((j) => (
                    <div key={j} className="bg-surface rounded-lg p-2 h-10 animate-pulse opacity-60" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold">Uygulama Özellikleri</h2>
            <p className="text-muted mt-3 max-w-md mx-auto">
              Next Plus Health, sağlık takibini bir üst seviyeye taşıyan güçlü özellikler sunar.
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {appFeatures.map(({ icon: Icon, title, desc }, i) => (
              <FadeIn key={title} delay={i * 0.1}>
                <div className="bg-surface border border-border rounded-2xl p-6 hover:border-accent hover:shadow-md transition-all">
                  <div className="w-12 h-12 rounded-xl bg-accent-soft flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{title}</h3>
                  <p className="text-muted text-sm">{desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-accent">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <FadeIn>
            <h2 className="font-display text-4xl font-bold">Hemen Başlayın</h2>
            <p className="text-white/80 mt-4 mb-8">
              Next Health Band&apos;ı edinin, uygulamayı indirin ve sağlığınızı kontrol altına alın.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <StoreButtons variant="outline" />
              <Link
                href="https://nextplushealth.vercel.app/tr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-accent font-bold rounded-full px-7 py-3 hover:opacity-90 transition-opacity"
              >
                Web&apos;e Git <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </ClientLayoutWrapper>
  );
}
