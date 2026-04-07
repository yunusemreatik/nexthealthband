"use client";

import { useTranslations } from "next-intl";
import { Droplets, Target, Activity, Heart, Moon, Users } from "lucide-react";
import FadeIn from "../shared/FadeIn";

/** Circular SVG progress ring */
function CircularProgress({ value, size = 220 }: { value: number; size?: number }) {
  const r = (size - 24) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={12} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="var(--accent)" strokeWidth={12}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1.5s ease" }}
      />
    </svg>
  );
}

const featurePills = [
  { icon: Droplets, label: "Akıllı Nemlendirme", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
  { icon: Target, label: "Hedef Takibi", color: "bg-accent-soft text-accent" },
];


export default function BandShowcase() {
  const t = useTranslations("features");

  return (
    <section className="py-24 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Title */}
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
            {t("title")}{" "}
            <span className="text-accent">{t("subtitle")}</span>
          </h2>
          <p className="text-muted mt-4 max-w-xl mx-auto">{t("description")}</p>
        </FadeIn>

        {/* Main content: circular stat left, image grid right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: Circular Progress + Stats ── */}
          <FadeIn direction="left">
            <div className="flex flex-col items-center lg:items-start gap-8">
              {/* Circular gauge */}
              <div className="relative inline-flex items-center justify-center">
                <CircularProgress value={95.5} size={220} />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <p className="font-display text-4xl font-bold text-text">95.5%</p>
                  <p className="text-xs text-muted mt-1 max-w-[80px] leading-tight">Veri Doğruluğu</p>
                </div>
              </div>

              {/* User social proof */}
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {["#2D7A4F", "#3B82F6", "#F59E0B", "#EF4444"].map((color, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-full border-2 border-surface flex items-center justify-center text-white text-xs font-bold"
                      style={{ backgroundColor: color }}
                    >
                      {["Y", "A", "M", "Z"][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-text">50.000+ Kullanıcı</p>
                  <p className="text-xs text-muted">Sağlık hedeflerine ulaştı</p>
                </div>
              </div>

              {/* Description */}
              <p className="text-muted text-sm leading-relaxed max-w-sm text-center lg:text-left">
                Next Health Band, hassas sensörleriyle günlük sağlık verilerinizi kesintisiz toplar ve
                akıllı analizlerle size özel önerilerde bulunur.
              </p>

              {/* Feature pills */}
              <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
                {featurePills.map(({ icon: Icon, label, color }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${color}`}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* ── RIGHT: Image Grid ── */}
          {/* ── RIGHT: Feature Showcase Collage ── */}
          <FadeIn direction="right">
            <div className="w-full h-[420px] lg:h-[500px] relative rounded-3xl overflow-hidden shadow-2xl border border-border">
              <img
                src="/images/vitrus_features.png"
                alt="Health Tracking Features"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
