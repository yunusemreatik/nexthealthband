"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Activity, Heart, Moon, ArrowRight } from "lucide-react";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-bg">
      {/* Background orbs */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl bg-accent"
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/6 w-72 h-72 rounded-full opacity-10 blur-3xl bg-peach"
        animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-accent-soft text-accent rounded-full px-4 py-1.5 text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              {t("badge")}
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              {t("titleMain")}
              <br />
              <span className="text-accent">{t("titleSub")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-muted text-lg mt-6 max-w-lg leading-relaxed"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mt-8"
            >
              <Link
                href={`/${locale}/iletisim`}
                className="inline-flex items-center gap-2 bg-accent text-white rounded-full px-7 py-3.5 font-bold text-base hover:bg-accent-green transition-colors shadow-lg shadow-accent/20"
              >
                {t("ctaPrimary")} <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href={`/${locale}/urun`}
                className="inline-flex items-center gap-2 border border-border rounded-full px-7 py-3.5 font-semibold text-base hover:bg-accent-soft transition-colors"
              >
                {t("ctaSecondary")}
              </Link>
            </motion.div>

            {/* Feature badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-3 mt-10"
            >
              {[
                { icon: Activity, label: t("badge1"), color: "text-accent" },
                { icon: Heart, label: t("badge2"), color: "text-rose-500" },
                { icon: Moon, label: t("badge3"), color: "text-indigo-500" },
              ].map(({ icon: Icon, label, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 bg-surface border border-border rounded-full px-4 py-2 text-sm font-medium shadow-sm"
                >
                  <Icon className={`w-4 h-4 ${color}`} />
                  {label}
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — decorative health dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-surface rounded-3xl border border-border p-6 shadow-2xl">
              {/* Band image placeholder */}
              <div className="bg-accent-soft rounded-2xl h-64 flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="w-20 h-40 mx-auto bg-accent rounded-2xl flex items-center justify-center shadow-lg shadow-accent/30">
                    <Activity className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-muted text-sm mt-3 font-medium">Next Health Band</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Adım", value: "8,420" },
                  { label: "Kalori", value: "342" },
                  { label: "Nabız", value: "72 bpm" },
                ].map((stat) => (
                  <div key={stat.label} className="bg-bg rounded-xl p-3 text-center">
                    <p className="font-bold text-lg text-text">{stat.value}</p>
                    <p className="text-xs text-muted mt-0.5">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-surface border border-border rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-accent-soft flex items-center justify-center">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-xs text-muted">Kalp Atışı</p>
                  <p className="font-bold text-sm">72 bpm</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -left-4 bg-surface border border-border rounded-2xl p-4 shadow-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-accent-soft flex items-center justify-center">
                  <Moon className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <p className="text-xs text-muted">Uyku Kalitesi</p>
                  <p className="font-bold text-sm">%92 İyi</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
