"use client";

import { useTranslations } from "next-intl";
import { Activity, MapPin, Clock } from "lucide-react";
import FadeIn from "../shared/FadeIn";

const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const activityLevels = [0.6, 0.8, 0.4, 1, 0.7, 0.5, 0.9];

export default function HealthStats() {
  const t = useTranslations("stats");

  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold">{t("title")}</h2>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly activity */}
          <FadeIn className="lg:col-span-2">
            <div className="bg-bg rounded-3xl border border-border p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <p className="text-muted text-sm font-medium">{t("rested")}</p>
                  <p className="font-display text-3xl font-bold mt-1">
                    195{" "}
                    <span className="text-accent text-xl">{t("time")}</span>
                  </p>
                </div>
                <div className="bg-accent-soft rounded-2xl p-3">
                  <Activity className="w-6 h-6 text-accent" />
                </div>
              </div>

              {/* Bar chart */}
              <div className="flex items-end gap-3 h-32 mb-4">
                {days.map((day, i) => (
                  <div key={day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full rounded-t-lg transition-all"
                      style={{
                        height: `${activityLevels[i] * 100}%`,
                        backgroundColor:
                          i === 3
                            ? "var(--accent)"
                            : `color-mix(in srgb, var(--accent) 40%, transparent)`,
                      }}
                    />
                    <span className="text-xs text-muted">{day}</span>
                  </div>
                ))}
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 bg-surface rounded-2xl p-4">
                  <MapPin className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-bold text-xl">26.9 <span className="text-sm text-muted">{t("distance")}</span></p>
                    <p className="text-xs text-muted">Toplam Mesafe</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-surface rounded-2xl p-4">
                  <Clock className="w-5 h-5 text-accent" />
                  <div>
                    <p className="font-bold text-xl">4h 8m</p>
                    <p className="text-xs text-muted">Aktif Süre</p>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Calendar */}
          <FadeIn direction="right" delay={0.2}>
            <div className="bg-bg rounded-3xl border border-border p-6 h-full">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-muted">Medikal Kayıt</span>
              </div>
              <p className="text-sm text-muted">{t("rested")}</p>
              <p className="font-display text-2xl font-bold mt-1">
                195 <span className="text-accent">{t("time")}</span> bu ay
              </p>

              {/* Mini calendar */}
              <div className="mt-6">
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted mb-2">
                  {["P", "S", "Ç", "P", "C", "C", "P"].map((d, i) => (
                    <span key={i}>{d}</span>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs">
                  {Array.from({ length: 28 }, (_, i) => i + 1).map((day) => (
                    <div
                      key={day}
                      className={`w-7 h-7 flex items-center justify-center rounded-full mx-auto transition-colors ${
                        day === 10
                          ? "bg-accent text-white font-bold"
                          : day % 7 === 3 || day % 5 === 0
                          ? "bg-accent-soft text-accent"
                          : "text-muted hover:bg-surface"
                      }`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
