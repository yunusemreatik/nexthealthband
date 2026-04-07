"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const { theme, setTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const links = [
    { href: `/${locale}`, label: t("home") },
    { href: `/${locale}/urun`, label: t("product") },
    { href: `/${locale}/uygulama`, label: t("app") },
    { href: `/${locale}/hakkimizda`, label: t("about") },
    { href: `/${locale}/blog`, label: t("blog") },
    { href: `/${locale}/iletisim`, label: t("contact") },
  ];

  const otherLocale = locale === "tr" ? "en" : "tr";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-surface/90 backdrop-blur-xl border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <Image
              src="/logo/Next_Plus_Logo_Full.png"
              alt="Next Health Band"
              width={200}
              height={52}
              className="h-10 md:h-12 w-auto object-contain mix-blend-multiply dark:brightness-0 dark:invert transition-all hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <Link
              href={`/${otherLocale}`}
              className="hidden md:inline-flex text-xs font-semibold text-muted hover:text-accent border border-border rounded-full px-3 py-1 transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-accent-soft transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link
              href={`/${locale}/iletisim`}
              className="hidden md:inline-flex bg-accent text-white rounded-full px-5 py-2 text-sm font-bold hover:bg-accent-green transition-colors"
            >
              {t("getStarted")}
            </Link>
            <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {open && (
          <div className="md:hidden pb-4 border-t border-border mt-2 pt-4 space-y-2">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2 text-sm font-medium text-muted hover:text-accent transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={`/${locale}/iletisim`}
              onClick={() => setOpen(false)}
              className="inline-flex mt-2 bg-accent text-white rounded-full px-5 py-2 text-sm font-bold"
            >
              {t("getStarted")}
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
