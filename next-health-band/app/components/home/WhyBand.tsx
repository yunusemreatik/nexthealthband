import { useTranslations } from "next-intl";
import { Zap, RefreshCw, Battery, Waves } from "lucide-react";
import FadeIn from "../shared/FadeIn";

const reasons = [
  { icon: Zap, titleKey: "realtime", descKey: "realtimeDesc", color: "#2D7A4F" },
  { icon: RefreshCw, titleKey: "sync", descKey: "syncDesc", color: "#3B82F6" },
  { icon: Battery, titleKey: "battery", descKey: "batteryDesc", color: "#F59E0B" },
  { icon: Waves, titleKey: "waterproof", descKey: "waterproofDesc", color: "#6366F1" },
];

export default function WhyBand() {
  const t = useTranslations("whyBand");

  return (
    <section className="py-24 bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold">{t("title")}</h2>
          <p className="text-muted mt-3 max-w-md mx-auto">{t("subtitle")}</p>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map(({ icon: Icon, titleKey, descKey, color }, i) => (
            <FadeIn key={titleKey} delay={i * 0.1}>
              <div className="group bg-bg rounded-2xl border border-border p-6 hover:border-accent hover:shadow-lg transition-all h-full">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="w-7 h-7" style={{ color }} />
                </div>
                <h3 className="font-display font-bold text-lg mb-2">{t(titleKey as "realtime")}</h3>
                <p className="text-muted text-sm leading-relaxed">{t(descKey as "realtimeDesc")}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
