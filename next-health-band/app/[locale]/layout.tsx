// Triggering Vercel deployment after the commit revert.
import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { ThemeProvider } from "@/app/components/theme-provider";
import "../globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin", "latin-ext"],
  variable: "--font-playfair-display",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

import { getSeoMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getSeoMetadata("home", "Next Health Band", "Sağlık verilerinizi gerçek zamanlı izleyin ve Next Plus Health uygulamasıyla senkronize edin.");
  return Object.assign({}, metadata, {
    title: {
      default: metadata.title || "Next Health Band",
      template: "%s | Next Health Band",
    },
    icons: {
      icon: "/favicon.png",
      shortcut: "/favicon.ico",
      apple: "/favicon.png",
    }
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "tr" | "en")) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${playfairDisplay.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="font-body bg-bg text-text antialiased flex flex-col min-h-screen">
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
