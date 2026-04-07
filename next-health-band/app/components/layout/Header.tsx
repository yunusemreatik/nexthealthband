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

  // Close menu on route change or body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-surface/95 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        {/* ── Top bar ── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href={`/${locale}`} className="flex items-center gap-2 z-10" onClick={() => setOpen(false)}>
              <Image
                src="/logo/Next_Plus_Logo_Full.png"
                alt="Next Health Band"
                width={200}
                height={52}
                className="h-9 md:h-11 w-auto object-contain mix-blend-multiply dark:brightness-0 dark:invert transition-all"
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
            <div className="flex items-center gap-2">
              <Link
                href={`/${otherLocale}`}
                className="hidden md:inline-flex text-xs font-semibold text-muted hover:text-accent border border-border rounded-full px-3 py-1 transition-colors"
              >
                {otherLocale.toUpperCase()}
              </Link>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-full hover:bg-accent-soft transition-colors"
                aria-label="Tema değiştir"
              >
                {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <Link
                href={`/${locale}/iletisim`}
                className="hidden md:inline-flex bg-accent text-white rounded-full px-5 py-2 text-sm font-bold hover:bg-accent-green transition-colors"
              >
                {t("getStarted")}
              </Link>
              {/* Hamburger */}
              <button
                className="md:hidden p-2 rounded-lg hover:bg-accent-soft transition-colors"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              >
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mobile nav drawer ── */}
        {open && (
          <div className="md:hidden bg-surface border-t border-border">
            <nav className="px-4 py-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center py-3.5 text-base font-medium text-text hover:text-accent border-b border-border/60 last:border-none transition-colors"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            {/* Bottom actions */}
            <div className="px-4 pb-6 pt-2 flex items-center gap-3">
              <Link
                href={`/${locale}/iletisim`}
                onClick={() => setOpen(false)}
                className="flex-1 text-center bg-accent text-white rounded-full py-3 text-sm font-bold hover:bg-accent-green transition-colors"
              >
                {t("getStarted")}
              </Link>
              <Link
                href={`/${otherLocale}`}
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-muted border border-border rounded-full px-4 py-3 hover:text-accent transition-colors"
              >
                {otherLocale.toUpperCase()}
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Backdrop — closes menu when tapping outside */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
