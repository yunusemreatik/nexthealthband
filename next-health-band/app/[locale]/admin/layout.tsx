"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard, FileText, HelpCircle, Users, Settings,
  Mail, Search, LogOut, Activity, MessageSquare, ChevronRight, Menu, X
} from "lucide-react";

const navItems = [
  { href: "admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "admin/icerik", label: "Hero İçerik", icon: FileText },
  { href: "admin/ozellikler", label: "Özellikler", icon: Activity },
  { href: "admin/blog", label: "Blog", icon: MessageSquare },
  { href: "admin/sss", label: "SSS", icon: HelpCircle },
  { href: "admin/talepler", label: "Talepler", icon: Users },
  { href: "admin/iletisim-bilgileri", label: "İletişim Bilgileri", icon: Mail },
  { href: "admin/seo", label: "SEO", icon: Search },
  { href: "admin/ayarlar", label: "Ayarlar", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [email, setEmail] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const isLoginPage = pathname.endsWith("/admin/login");

  useEffect(() => {
    if (isLoginPage) return; // Login sayfasında auth kontrolü yapma
    fetch("/api/auth")
      .then((r) => r.json())
      .then((d) => {
        if (!d.authenticated) router.push(`/${locale}/admin/login`);
        else setEmail(d.email);
      });
  }, [router, locale, isLoginPage]);

  async function logout() {
    await fetch("/api/auth", { method: "DELETE" });
    router.push(`/${locale}/admin/login`);
  }

  // Login sayfasını layout olmadan döndür
  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!email) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-bg md:pt-0 pt-16">
      {/* Mobile Topbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-surface border-b border-border flex items-center justify-between px-4 z-50">
        <Image src="/logo/Next_Health_Band_Logo.png" alt="NHB" width={100} height={25} className="h-6 w-auto object-contain" />
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
          {menuOpen ? <X className="w-6 h-6 text-text" /> : <Menu className="w-6 h-6 text-text" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`${menuOpen ? "flex fixed inset-y-16 w-full max-w-xs" : "hidden"} md:flex md:relative w-64 bg-surface border-r border-border flex-col z-40 h-[calc(100vh-4rem)] md:h-screen transition-all`}>
        <div className="p-6 border-b border-border">
          <Image src="/logo/Next_Health_Band_Logo.png" alt="NHB" width={120} height={30} className="h-7 w-auto object-contain" />
          <p className="text-xs text-muted mt-2">Admin Panel</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const fullHref = `/${locale}/${href}`;
            const active = pathname === fullHref || (href !== "admin" && pathname.startsWith(fullHref));
            return (
              <Link
                key={href}
                href={fullHref}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  active ? "bg-accent text-white" : "text-muted hover:bg-accent-soft hover:text-text"
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center">
              <span className="text-accent text-xs font-bold">{email[0].toUpperCase()}</span>
            </div>
            <p className="text-xs text-muted truncate">{email}</p>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center gap-2 text-sm text-muted hover:text-red-500 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
