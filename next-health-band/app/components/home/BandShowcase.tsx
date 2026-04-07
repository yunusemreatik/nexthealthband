"use client";

import { useTranslations } from "next-intl";
import { Activity, Heart, Moon, Monitor, Check } from "lucide-react";
import FadeIn from "../shared/FadeIn";

const features = [
  {
    key: "fitness",
    icon: Activity,
    color: "#2D7A4F",
    highlight: "Adım, kalori ve günlük egzersiz takibi",
  },
  {
    key: "heart",
    icon: Heart,
    color: "#EF4444",
    highlight: "7/24 gerçek zamanlı izleme",
  },
  {
    key: "sleep",
    icon: Moon,
    color: "#6366F1",
    highlight: "Uyku kalitesi ve REM analizi",
  },
  {
    key: "display",
    icon: Monitor,
    color: "#F59E0B",
    highlight: "Büyük AMOLED ekran",
  },
];

export default function BandShowcase() {
  const t = useTranslations("features");

  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold">
            {t("title")}{" "}
            <span className="text-accent">{t("subtitle")}</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">{t("description")}</p>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Band visual */}
          <FadeIn direction="left">
            <div className="relative">
              <div className="bg-accent-soft rounded-3xl p-12 flex items-center justify-center min-h-80">
                <div className="relative">
                  {/* Band shape */}
                  <div className="w-32 h-56 bg-accent rounded-3xl shadow-2xl shadow-accent/40 flex flex-col items-center justify-center gap-3">
                    <div className="w-20 h-28 bg-surface/20 rounded-2xl flex items-center justify-center">
                      <Activity className="w-10 h-10 text-white" />
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`w-1 rounded-full bg-white ${i === 3 ? "h-5" : "h-3"} opacity-80`} />
                      ))}
                    </div>
                  </div>
                  {/* Band strap */}
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-8 h-10 bg-accent rounded-t-lg opacity-60" />
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-8 h-10 bg-accent rounded-b-lg opacity-60" />
                </div>
              </div>

              {/* Floating feature pills */}
              <div className="absolute top-6 -right-4 bg-surface border border-border rounded-2xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span className="text-xs font-semibold">72 bpm</span>
                </div>
              </div>
              <div className="absolute bottom-10 -left-6 bg-surface border border-border rounded-2xl p-3 shadow-lg">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-accent" />
                  <span className="text-xs font-semibold">8,420 adım</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Feature list */}
          <div className="space-y-4">
            {features.map(({ key, icon: Icon, color, highlight }, i) => (
              <FadeIn key={key} delay={i * 0.1}>
                <div className="group bg-surface border border-border rounded-2xl p-5 hover:border-accent hover:shadow-md transition-all cursor-default">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}20` }}
                    >
                      <Icon className="w-6 h-6" style={{ color }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-bold text-lg">{t(key as "fitness")}</h3>
                      <p className="text-muted text-sm mt-1">{t(`${key}Desc` as "fitnessDesc")}</p>
                      <div className="flex items-center gap-1.5 mt-2">
                        <Check className="w-3.5 h-3.5 text-accent" />
                        <span className="text-xs text-accent font-medium">{highlight}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
