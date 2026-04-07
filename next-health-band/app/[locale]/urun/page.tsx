import type { Metadata } from "next";
import ClientLayoutWrapper from "@/app/components/layout/ClientLayoutWrapper";
import { supabase } from "@/lib/supabaseClient";
import { Check, Activity, Heart, Moon, Monitor, Waves, Battery, Bluetooth, Watch } from "lucide-react";
import FadeIn from "@/app/components/shared/FadeIn";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ürün — Next Health Band",
  description: "Next Health Band teknik özellikleri ve detaylı ürün bilgisi.",
};

export const revalidate = 60;

const defaultSpecs = [
  { category: "Sensörler", specs: [{ key: "Kalp Atışı", value: "Optik HR sensör" }, { key: "SpO2", value: "Kan oksijen ölçümü" }, { key: "Hızlanma", value: "3 eksenli ivme ölçer" }, { key: "Jiroskop", value: "6 eksenli IMU" }] },
  { category: "Ekran", specs: [{ key: "Boyut", value: '1.62" AMOLED' }, { key: "Çözünürlük", value: "192×490 px" }, { key: "Parlaklık", value: "600 nit" }] },
  { category: "Batarya", specs: [{ key: "Kapasite", value: "230 mAh" }, { key: "Kullanım", value: "14 gün" }, { key: "Şarj", value: "Manyetik" }] },
  { category: "Bağlantı", specs: [{ key: "Bluetooth", value: "5.3" }, { key: "Uygulama", value: "iOS & Android" }] },
  { category: "Fiziksel", specs: [{ key: "Su Direnci", value: "5ATM" }, { key: "Ağırlık", value: "26g" }, { key: "Kasa", value: "Alüminyum" }] },
];

const features = [
  { icon: Activity, label: "Fitness & Adım Takibi" },
  { icon: Heart, label: "Kalp Atışı İzleme" },
  { icon: Moon, label: "Uyku Analizi" },
  { icon: Monitor, label: "AMOLED Ekran" },
  { icon: Waves, label: "5ATM Su Direnci" },
  { icon: Battery, label: "14 Gün Pil" },
  { icon: Bluetooth, label: "Bluetooth 5.3" },
  { icon: Watch, label: "Çoklu Spor Modu" },
];

export default async function UrunPage() {
  return (
    <ClientLayoutWrapper>
      {/* Hero */}
      <section className="py-24 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeIn>
                <span className="inline-flex items-center gap-2 bg-accent-soft text-accent rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                  Yeni Nesil Sağlık Bandı
                </span>
                <h1 className="font-display text-5xl md:text-6xl font-bold leading-tight">
                  Next Health Band
                </h1>
                <p className="text-muted mt-5 text-lg leading-relaxed">
                  Sağlık verilerinizi hassas sensörlerle ölçen, Next Plus Health uygulamasıyla senkronize olan akıllı sağlık bandı.
                </p>
                <div className="grid grid-cols-2 gap-3 mt-8">
                  {features.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-accent flex-shrink-0" />
                      <span className="text-sm">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 mt-10">
                  <Link
                    href="/tr/iletisim"
                    className="inline-flex items-center gap-2 bg-accent text-white rounded-full px-7 py-3.5 font-bold hover:bg-accent-green transition-colors"
                  >
                    Ön Sipariş Ver
                  </Link>
                  <Link
                    href="/tr/uygulama"
                    className="inline-flex items-center gap-2 border border-border rounded-full px-7 py-3.5 font-semibold hover:bg-accent-soft transition-colors"
                  >
                    Uygulamayı Gör
                  </Link>
                </div>
              </FadeIn>
            </div>

            {/* Band visual */}
            <FadeIn direction="right">
              <div className="bg-accent-soft rounded-3xl p-12 flex items-center justify-center min-h-80">
                <div className="relative">
                  <div className="w-36 h-60 bg-accent rounded-3xl shadow-2xl shadow-accent/40 flex flex-col items-center justify-center gap-4">
                    <div className="w-24 h-32 bg-surface/20 rounded-2xl flex items-center justify-center">
                      <div className="text-center text-white">
                        <p className="text-2xl font-bold">72</p>
                        <p className="text-xs opacity-80">bpm</p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className={`w-1.5 rounded-full bg-white ${i === 3 || i === 4 ? "h-6" : "h-3"} opacity-80`} />
                      ))}
                    </div>
                  </div>
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-10 h-12 bg-accent/60 rounded-t-xl" />
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-10 h-12 bg-accent/60 rounded-b-xl" />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-24 bg-surface border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold">Teknik Özellikler</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultSpecs.map((group, i) => (
              <FadeIn key={group.category} delay={i * 0.1}>
                <div className="bg-bg border border-border rounded-2xl p-6">
                  <h3 className="font-display font-bold text-lg text-accent mb-4">{group.category}</h3>
                  <table className="w-full text-sm">
                    <tbody className="divide-y divide-border">
                      {group.specs.map(({ key, value }) => (
                        <tr key={key}>
                          <td className="py-2 text-muted pr-4">{key}</td>
                          <td className="py-2 font-medium text-right">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </ClientLayoutWrapper>
  );
}
