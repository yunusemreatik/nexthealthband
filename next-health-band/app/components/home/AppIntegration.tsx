import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Check, ExternalLink } from "lucide-react";
import FadeIn from "../shared/FadeIn";
import StoreButtons from "../shared/StoreButtons";

export default function AppIntegration() {
  const t = useTranslations("appIntegration");
  const locale = useLocale();

  const features = [
    { title: t("feature1"), desc: t("feature1Desc") },
    { title: t("feature2"), desc: t("feature2Desc") },
    { title: t("feature3"), desc: t("feature3Desc") },
  ];

  return (
    <section className="py-24 bg-surface border-y border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── LEFT: Phone Mockup ── */}
          <FadeIn direction="left">
            <div className="flex justify-center lg:justify-start">
              <div className="relative w-full max-w-sm lg:max-w-none">
                <img
                  src="/images/vitrus_app.png"
                  alt="Next Health Band App Integration"
                  className="w-full h-auto rounded-[2.5rem] shadow-2xl object-cover"
                />
                {/* Decorative glow */}
                <div className="absolute -top-8 -left-8 w-32 h-32 rounded-full bg-accent/20 blur-3xl -z-10" />
              </div>
            </div>
          </FadeIn>

          {/* ── RIGHT: Text Content ── */}
          <div>
            <FadeIn>
              <span className="inline-flex items-center gap-2 bg-accent-soft text-accent rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
                {t("badge")}
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight">
                {t("title")}{" "}
                <span className="text-accent">{t("titleSub")}</span>
              </h2>
              <p className="text-muted mt-5 leading-relaxed max-w-md">{t("description")}</p>
            </FadeIn>

            {/* Feature list — Vitrus style with check icons */}
            <div className="mt-10 space-y-5">
              {features.map(({ title, desc }, i) => (
                <FadeIn key={title} delay={i * 0.1}>
                  <div className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-text">{title}</p>
                      <p className="text-muted text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.35} className="mt-10 space-y-4">
              <StoreButtons />
              <Link
                href={`https://nextplushealth.vercel.app/${locale}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:underline"
              >
                {t("cta")} <ExternalLink className="w-4 h-4" />
              </Link>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
