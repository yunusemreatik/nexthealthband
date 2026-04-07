import Link from "next/link";
import { useTranslations } from "next-intl";
import { Zap, Users, Target, ExternalLink } from "lucide-react";
import FadeIn from "../shared/FadeIn";
import StoreButtons from "../shared/StoreButtons";

export default function AppIntegration() {
  const t = useTranslations("appIntegration");

  const features = [
    { icon: Zap, title: t("feature1"), desc: t("feature1Desc") },
    { icon: Users, title: t("feature2"), desc: t("feature2Desc") },
    { icon: Target, title: t("feature3"), desc: t("feature3Desc") },
  ];

  return (
    <section className="py-24 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <FadeIn>
              <span className="inline-flex items-center gap-2 bg-accent-soft text-accent rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                {t("badge")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                {t("title")}{" "}
                <span className="text-accent">{t("titleSub")}</span>
              </h2>
              <p className="text-muted mt-5 leading-relaxed">{t("description")}</p>
            </FadeIn>

            <div className="space-y-5 mt-10">
              {features.map(({ icon: Icon, title, desc }, i) => (
                <FadeIn key={title} delay={i * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-soft flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{title}</h3>
                      <p className="text-muted text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3} className="mt-10 space-y-4">
              <StoreButtons />
              <Link
                href="https://nextplushealth.vercel.app/tr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline"
              >
                {t("cta")} <ExternalLink className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>

          {/* App mockup */}
          <FadeIn direction="right">
            <div className="relative">
              <div className="bg-accent-soft rounded-3xl p-8 relative overflow-hidden">
                {/* Phone mockup */}
                <div className="relative mx-auto w-56 h-[420px] bg-text rounded-[2.5rem] shadow-2xl shadow-accent/20 border-4 border-surface p-2 overflow-hidden">
                  <div className="w-full h-full bg-bg rounded-[2rem] overflow-hidden">
                    {/* App header */}
                    <div className="bg-accent p-4 text-white">
                      <p className="text-xs font-semibold opacity-80">Next Plus Health</p>
                      <p className="font-bold text-lg">Merhaba!</p>
                    </div>
                    {/* App content */}
                    <div className="p-3 space-y-2">
                      {[
                        { label: "Nabız", value: "72 bpm", color: "rose" },
                        { label: "Adım", value: "8,420", color: "green" },
                        { label: "Uyku", value: "7s 23d", color: "indigo" },
                        { label: "Kalori", value: "342", color: "amber" },
                      ].map(({ label, value, color }) => (
                        <div key={label} className="bg-surface rounded-xl p-3 flex items-center justify-between">
                          <span className="text-xs text-muted">{label}</span>
                          <span className="text-xs font-bold text-accent">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-16 h-16 rounded-full bg-accent opacity-20 blur-xl" />
                <div className="absolute bottom-4 left-4 w-20 h-20 rounded-full bg-peach opacity-20 blur-xl" />
              </div>

              {/* Next Plus Health badge */}
              <div className="absolute -bottom-4 -right-4 bg-surface border border-border rounded-2xl p-4 shadow-xl">
                <p className="text-xs text-muted">Powered by</p>
                <p className="font-bold text-sm text-accent">Next Plus Health</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
