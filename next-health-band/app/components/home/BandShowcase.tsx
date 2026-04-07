import { getTranslations } from "next-intl/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import {
  Activity, Heart, Moon, Monitor, Droplets, Target,
  Zap, Battery, Waves, Bluetooth, Watch, Users,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "../shared/FadeIn";

/** Circular SVG progress ring — static, no client needed */
function CircularProgress({ value, size = 220 }: { value: number; size?: number }) {
  const r = (size - 24) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--border)" strokeWidth={12} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke="var(--accent)" strokeWidth={12}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
      />
    </svg>
  );
}

const iconMap: Record<string, LucideIcon> = {
  Activity, Heart, Moon, Monitor, Droplets, Target,
  Zap, Battery, Waves, Bluetooth, Watch, Users,
};

const pillColors = [
  "bg-accent-soft text-accent",
  "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300",
  "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-300",
  "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-300",
  "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300",
];

interface BandFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
  highlight: string | null;
  sort_order: number;
  is_active: boolean;
}

async function getFeatures(): Promise<BandFeature[]> {
  const { data } = await supabaseAdmin
    .from("band_features")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  return data ?? [];
}

export default async function BandShowcase() {
  const [t, features] = await Promise.all([
    getTranslations("features"),
    getFeatures(),
  ]);

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

        {/* Main content: circular stat left, image/collage right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT: Circular Progress + Features ── */}
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
                {t("description")}
              </p>

              {/* Feature pills — from database */}
              {features.length > 0 && (
                <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
                  {features.map((f, i) => {
                    const Icon = iconMap[f.icon] ?? Activity;
                    const color = pillColors[i % pillColors.length];
                    return (
                      <span
                        key={f.id}
                        title={f.description}
                        className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${color}`}
                      >
                        <Icon className="w-4 h-4" />
                        {f.title}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          </FadeIn>

          {/* ── RIGHT: Feature Showcase Collage ── */}
          <FadeIn direction="right">
            <div className="w-full h-[420px] lg:h-[500px] relative rounded-3xl overflow-hidden shadow-2xl border border-border">
              <img
                src="/images/vitrus_features.png"
                alt="Health Tracking Features"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay cards when image is missing */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-black/40 to-transparent">
                {features.slice(0, 2).map((f, i) => {
                  const Icon = iconMap[f.icon] ?? Activity;
                  return (
                    <div
                      key={f.id}
                      className={`absolute bg-white/90 dark:bg-surface/90 backdrop-blur-sm rounded-2xl px-4 py-2.5 shadow-lg flex items-center gap-2 ${
                        i === 0 ? "bottom-14 left-6" : "top-6 right-6"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-accent" />
                      <span className="text-xs font-bold text-text">{f.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
