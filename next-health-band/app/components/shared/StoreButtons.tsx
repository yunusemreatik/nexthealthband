import Link from "next/link";

interface StoreButtonsProps {
  variant?: "default" | "outline";
  className?: string;
}

export default function StoreButtons({ variant = "default", className = "" }: StoreButtonsProps) {
  const base =
    variant === "outline"
      ? "flex items-center gap-2 border border-border rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-accent-soft transition-colors"
      : "flex items-center gap-2 bg-text text-bg rounded-full px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition-opacity";

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link href="#" className={base}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
        </svg>
        App Store
      </Link>
      <Link href="#" className={base}>
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3.18 23.76c.35.2.74.24 1.12.1l12.44-7.17-2.8-2.8-10.76 9.87zm16.29-10.82L16.6 11.1 3.06.28C2.67.1 2.24.1 1.9.35L14.54 13 19.47 12.94zM21.6 10.67l-2.91-1.68-2.95 2.95 2.95 2.95 2.93-1.7c.84-.48.84-1.67-.02-2.52zM4.3.24c-.38-.15-.8-.1-1.14.1l10.7 10.7 2.8-2.8L4.3.24z" />
        </svg>
        Google Play
      </Link>
    </div>
  );
}
