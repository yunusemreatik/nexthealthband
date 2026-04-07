"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Activity, Heart, Moon, ArrowRight, Footprints, Flame, Zap } from "lucide-react";

interface HeroData {
  badge_text?: string;
  title_main?: string;
  title_sub?: string;
  subtitle?: string;
  cta_primary?: string;
  cta_secondary?: string;
}

export default function Hero({ data }: { data?: HeroData }) {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen overflow-hidden bg-bg">
      {/* Full-bleed layout: text left, image right */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 w-full py-24 lg:py-0">

          {/* ── LEFT TEXT COLUMN ── */}
          <div className="flex flex-col justify-center lg:pr-16 z-10 relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent-soft text-accent rounded-full px-4 py-1.5 text-sm font-semibold mb-7 w-fit"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {data?.badge_text || t("badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.08] tracking-tight"
            >
              {data?.title_main || t("titleMain")}
              <br />
              <span className="text-accent">{data?.title_sub || t("titleSub")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted text-lg mt-6 max-w-md leading-relaxed"
            >
              {data?.subtitle || t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-8"
            >
              <Link
                href={`/${locale}/iletisim`}
                className="inline-flex items-center gap-2.5 bg-accent text-white rounded-full px-8 py-4 font-bold text-base hover:bg-accent-green transition-colors shadow-lg shadow-accent/25"
              >
                {data?.cta_primary || t("ctaPrimary")} <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Feature list — Vitrus style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-12 space-y-4"
            >
              {[
                { icon: Footprints, label: t("badge1"), desc: "Adım, kalori, egzersiz takibi" },
                { icon: Heart, label: t("badge2"), desc: "7/24 gerçek zamanlı izleme" },
                { icon: Moon, label: t("badge3"), desc: "Uyku kalitesi ve REM analizi" },
              ].map(({ icon: Icon, label, desc }, i) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-accent-soft border border-accent/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-accent" style={{ width: 18, height: 18 }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">{label}</p>
                    <p className="text-xs text-muted">{desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT IMAGE COLUMN ── */}
          <div className="relative flex items-center justify-center lg:min-h-screen">
            {/* Person / image placeholder */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative w-full max-w-md lg:max-w-none lg:w-auto lg:absolute lg:inset-0"
            >
              {/* Gradient image placeholder — replace with <Image src="/images/hero-person.jpg" ... /> */}
              <div className="relative w-full lg:w-[90%] mx-auto lg:h-full min-h-[480px] lg:min-h-[90vh] lg:mt-10 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/images/vitrus_hero.png"
                  alt="Healthy User Tracking"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Floating card — top right (Food / Calorie) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-16 right-0 lg:-right-8 bg-yellow-400 rounded-2xl p-4 shadow-xl z-20 w-52"
              >
                <p className="text-xs font-bold text-yellow-900 mb-1">Günlük Kalori</p>
                <p className="text-2xl font-bold text-yellow-900">1.842 <span className="text-sm font-normal">kcal</span></p>
                <div className="mt-2 h-1.5 bg-yellow-200 rounded-full">
                  <div className="h-full bg-yellow-700 rounded-full" style={{ width: "72%" }} />
                </div>
                <p className="text-xs text-yellow-800 mt-1">Günlük hedefinizin %72'si</p>
              </motion.div>
            </motion.div>

            {/* Floating card — bottom left (Kalp Atışı) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-24 left-0 lg:-left-8 bg-surface border border-border rounded-2xl p-4 shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Kalp Atışı</p>
                    <p className="font-bold text-lg">72 <span className="text-sm font-normal text-muted">bpm</span></p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-2">
                  {[3, 5, 8, 6, 4, 7, 5, 8, 6, 4].map((h, i) => (
                    <div key={i} className="flex-1 rounded-sm bg-rose-400" style={{ height: h * 2 }} />
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Floating card — middle right (Adım) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="hidden lg:block"
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-1/2 -translate-y-1/2 right-0 lg:-right-6 bg-surface border border-border rounded-2xl p-4 shadow-xl z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center">
                    <Flame className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs text-muted">Adım</p>
                    <p className="font-bold text-lg">8.420</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Subtle background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent-soft/30 -z-10 hidden lg:block" />
    </section>
  );
}
