import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");
  const navT = useTranslations("nav");
  const locale = useLocale();

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/logo/Next_Plus_Logo_Full.png"
              alt="Next Health Band"
              width={140}
              height={36}
              className="h-8 w-auto object-contain mb-4"
            />
            <p className="text-muted text-sm leading-relaxed max-w-sm">{t("description")}</p>
            <p className="text-xs text-muted mt-4">
              Part of{" "}
              <Link
                href={`https://nextplushealth.vercel.app/${locale}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline font-medium"
              >
                {t("parentCompany")}
              </Link>
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-display font-bold text-sm mb-4">{t("product")}</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href={`/${locale}/urun`} className="hover:text-accent transition-colors">Next Health Band</Link></li>
              <li><Link href={`/${locale}/uygulama`} className="hover:text-accent transition-colors">Next Plus Health App</Link></li>
            </ul>
          </div>

          {/* Company + Legal */}
          <div>
            <h3 className="font-display font-bold text-sm mb-4">{t("company")}</h3>
            <ul className="space-y-2 text-sm text-muted">
              <li><Link href={`/${locale}/hakkimizda`} className="hover:text-accent transition-colors">{navT("about")}</Link></li>
              <li><Link href={`/${locale}/iletisim`} className="hover:text-accent transition-colors">{navT("contact")}</Link></li>
              <li>
                <Link
                  href={`https://nextplushealth.vercel.app/${locale}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-colors"
                >
                  Next Plus Health ↗
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} Next Health Band. {t("allRights")}</p>
          <div className="flex gap-4">
            <Link href={`/${locale}/iletisim`} className="hover:text-accent transition-colors">{t("privacy")}</Link>
            <Link href={`/${locale}/iletisim`} className="hover:text-accent transition-colors">{t("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
