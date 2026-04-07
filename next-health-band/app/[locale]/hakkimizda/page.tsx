import type { Metadata } from "next";
import Link from "next/link";
import ClientLayoutWrapper from "@/app/components/layout/ClientLayoutWrapper";
import FadeIn from "@/app/components/shared/FadeIn";
import { Target, Eye, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda — Next Health Band",
  description: "Next Health Band ve Next Plus Health ailesi hakkında bilgi edinin.",
};

export default function HakkimizdaPage() {
  return (
    <ClientLayoutWrapper>
      {/* Hero */}
      <section className="py-24 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <span className="inline-flex items-center gap-2 bg-accent-soft text-accent rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              Hakkımızda
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold">
              Next Health Band<br />
              <span className="text-accent">Ailesi</span>
            </h1>
            <p className="text-muted mt-6 text-lg leading-relaxed">
              Next Health Band, sağlık teknolojisinde öncü çözümler sunan Next Plus Health ailesinin bir parçasıdır. Sağlık verilerinizi anlamlı kılmak için yola çıktık.
            </p>
          </FadeIn>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <FadeIn>
            <div className="relative w-full h-[300px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl border border-border">
              <img
                src="/images/hakkimizda.png"
                alt="Next Health Band Team"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 bg-surface border-y border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-bg border border-border rounded-3xl p-8">
                <div className="w-14 h-14 rounded-2xl bg-accent-soft flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-3">Misyonumuz</h2>
                <p className="text-muted leading-relaxed">
                  Herkesin sağlık verilerine kolayca erişebileceği, anlayabileceği ve yönetebileceği bir dünya inşa etmek. Next Health Band ile sağlık takibini herkes için erişilebilir kılıyoruz.
                </p>
              </div>
              <div className="bg-bg border border-border rounded-3xl p-8">
                <div className="w-14 h-14 rounded-2xl bg-accent-soft flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-accent" />
                </div>
                <h2 className="font-display text-2xl font-bold mb-3">Vizyonumuz</h2>
                <p className="text-muted leading-relaxed">
                  Sağlık takibini herkes için erişilebilir ve anlamlı kılmak. Next Plus Health ekosistemi ile band, uygulama ve uzman erişimi tek çatı altında buluşturmak.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Parent company */}
      <section className="py-24 bg-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl font-bold mb-4">Next Plus Health Ailesi</h2>
            <p className="text-muted mb-8 leading-relaxed">
              Next Health Band, Next Plus Health çatısı altında faaliyet göstermektedir. Kapsamlı bir sağlık ekosistemi sunan ana şirketimiz; uzman erişimi, mobil uygulama, kurumsal çözümler ve daha fazlasını bir araya getirir.
            </p>
            <Link
              href="https://nextplushealth.vercel.app/tr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-accent text-white rounded-full px-7 py-3.5 font-bold hover:bg-accent-green transition-colors"
            >
              Next Plus Health&apos;i Keşfet <ExternalLink className="w-4 h-4" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </ClientLayoutWrapper>
  );
}
