# Next Plus Health Blueprint — Sıfırdan Kurumsal Website Oluşturma

Bu skill, Next Plus Health websitesinin birebir aynı mimarisi, tasarım sistemi, veritabanı yapısı ve kod kalitesiyle yeni bir kurumsal sağlık/B2B sitesi inşa etmek için kullanılır.

## Kullanıcı İsteği

$ARGUMENTS

---

## GENEL MİMARİ KARAR AĞACI

Kullanıcının isteğini oku ve hangi parçayı istediğini belirle:

- "Yeni site kur / projeyi ayağa kaldır" → **BÖLÜM A** (Proje Kurulumu)
- "Tasarım sistemi / CSS / renkler" → **BÖLÜM B** (Design System)
- "Veritabanı / tablolar / schema" → **BÖLÜM C** (Supabase Schema)
- "Auth / giriş sistemi / admin login" → **BÖLÜM D** (Auth Sistemi)
- "API route / backend endpoint" → **BÖLÜM E** (API Pattern)
- "Sayfa yap / component ekle" → **BÖLÜM F** (Sayfa & Component Yapısı)
- "Admin paneli / CMS" → **BÖLÜM G** (Admin Panel)
- "i18n / çok dil / TR-EN" → **BÖLÜM H** (i18n Kurulumu)

---

## BÖLÜM A — PROJE KURULUMU

### Tech Stack (Değiştirme)

```json
{
  "next": "16.2.1",
  "react": "19.2.4",
  "typescript": "^5",
  "tailwindcss": "^4",
  "@tailwindcss/postcss": "^4",
  "next-intl": "^4.8.3",
  "next-themes": "^0.4.6",
  "framer-motion": "^12.38.0",
  "lucide-react": "^0.400.0",
  "@supabase/supabase-js": "^2.49.0",
  "bcryptjs": "^3.0.3",
  "react-hook-form": "^7.72.0",
  "@hookform/resolvers": "^5.2.2",
  "zod": "^4.3.6",
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.5.0",
  "recharts": "^3.8.1",
  "leaflet": "^1.9.4",
  "react-leaflet": "^5.0.0",
  "@vercel/analytics": "^2.0.1"
}
```

### Klasör Yapısı

```
/
├── app/
│   ├── [locale]/           ← i18n route prefix
│   │   ├── layout.tsx      ← Font, ThemeProvider, i18n provider
│   │   ├── page.tsx        ← Ana sayfa (ISR: revalidate=60)
│   │   ├── admin/          ← CMS sayfaları ("use client")
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx    ← Admin dashboard
│   │   │   ├── blog/page.tsx
│   │   │   ├── teklifler/page.tsx
│   │   │   ├── sss/page.tsx
│   │   │   ├── referanslar/page.tsx
│   │   │   ├── kullanicilar/page.tsx
│   │   │   ├── paketler/page.tsx
│   │   │   ├── icerik/page.tsx
│   │   │   ├── sayfalar/page.tsx
│   │   │   ├── seo/page.tsx
│   │   │   ├── iletisim-bilgileri/page.tsx
│   │   │   └── ayarlar/page.tsx
│   │   ├── blog/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── hizmetler/      ← Şirket/hizmet sayfaları
│   │   │   ├── [sirket]/page.tsx
│   │   ├── iletisim/page.tsx
│   │   ├── teklif-al/page.tsx
│   │   ├── hakkimizda/page.tsx
│   │   ├── hizmetlerimiz/page.tsx
│   │   ├── referanslarimiz/page.tsx
│   │   ├── kariyer/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── portal/         ← B2B müşteri portalı
│   │       ├── page.tsx    ← Login
│   │       └── dashboard/
│   │           ├── layout.tsx
│   │           └── page.tsx
│   ├── api/
│   │   ├── auth/route.ts   ← POST login, GET session, DELETE logout
│   │   ├── leads/route.ts  ← Public form submission
│   │   └── admin/          ← TÜMÜ middleware ile korunuyor
│   │       ├── blog/[id]/route.ts
│   │       ├── blog/route.ts
│   │       ├── contact/route.ts
│   │       ├── dashboard/route.ts
│   │       ├── faq/[id]/route.ts
│   │       ├── faq/route.ts
│   │       ├── hero/route.ts
│   │       ├── leads/[id]/route.ts
│   │       ├── leads/route.ts
│   │       ├── packages/[id]/route.ts
│   │       ├── packages/route.ts
│   │       ├── references/[id]/route.ts
│   │       ├── references/route.ts
│   │       ├── seo/[id]/route.ts
│   │       ├── seo/route.ts
│   │       ├── services/[id]/route.ts
│   │       ├── services/route.ts
│   │       ├── settings/route.ts
│   │       ├── stats/route.ts
│   │       └── users/[id]/route.ts
│   ├── components/
│   │   ├── home/           ← Ana sayfa section'ları
│   │   │   ├── Hero.tsx
│   │   │   ├── ServicesGrid.tsx
│   │   │   ├── AppShowcase.tsx
│   │   │   ├── CorporatePillars.tsx
│   │   │   ├── StatsCounter.tsx
│   │   │   ├── WhyNextPlus.tsx
│   │   │   ├── ReferencesGrid.tsx
│   │   │   ├── BlogPreview.tsx
│   │   │   ├── SectorsRow.tsx
│   │   │   └── ContactCTA.tsx
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── ClientLayoutWrapper.tsx
│   │   ├── shared/
│   │   │   ├── FadeIn.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── VideoEmbed.tsx
│   │   │   ├── StoreButtons.tsx
│   │   │   ├── InteractiveWireframe.tsx
│   │   │   ├── IstanbulMap.tsx
│   │   │   ├── WhatsAppButton.tsx
│   │   │   ├── Cursor.tsx
│   │   │   └── RotatingOrb.tsx
│   │   ├── admin/
│   │   │   ├── AdminTable.tsx
│   │   │   ├── AdminModal.tsx
│   │   │   ├── AdminCard.tsx
│   │   │   ├── AdminTextarea.tsx
│   │   │   ├── AdminSelect.tsx
│   │   │   ├── AdminToggle.tsx
│   │   │   ├── AdminToast.tsx
│   │   │   └── ConfirmDialog.tsx
│   │   ├── ui/
│   │   │   ├── Input.tsx
│   │   │   └── Button.tsx
│   │   ├── analytics/
│   │   │   └── ClarityScript.tsx
│   │   └── theme-provider.tsx
│   ├── globals.css
│   ├── layout.tsx          ← Root layout (sadece html/body)
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── i18n/
│   ├── routing.ts          ← locales: ['tr','en'], defaultLocale:'tr'
│   └── request.ts          ← message loader
├── lib/
│   ├── supabaseClient.ts   ← ANON KEY (public, browser)
│   ├── supabaseAdmin.ts    ← SERVICE ROLE KEY (server-only, Proxy pattern)
│   ├── adminAuth.ts        ← HMAC-SHA256 JWT + cookie helpers
│   ├── rateLimit.ts        ← In-memory rate limiter
│   ├── fieldMap.ts         ← snake_case ↔ camelCase dönüşüm
│   ├── constants.ts
│   ├── utils.ts            ← cn() helper
│   └── supabase-types.ts   ← TypeScript types
├── messages/
│   ├── tr.json             ← Türkçe (default)
│   └── en.json             ← İngilizce
├── middleware.ts
├── next.config.ts
├── supabase-schema.sql
└── public/
    ├── logos/              ← Şirket SVG logoları
    ├── images/             ← Hero/section görselleri
    └── icons/
```

### .env.local Değişkenleri

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://[project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...           # RLS politikaları uygulayarak erişir
SUPABASE_SERVICE_ROLE_KEY=eyJ...               # RLS bypass — sadece sunucu!

# Auth
ADMIN_JWT_SECRET=minimum-32-karakter-random-string

# Analytics (opsiyonel)
NEXT_PUBLIC_CLARITY_ID=xxxxx
```

---

## BÖLÜM B — DESIGN SYSTEM

### Fontlar (`app/[locale]/layout.tsx`)

```typescript
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";

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

// html tag'ine:
className={`${playfairDisplay.variable} ${plusJakartaSans.variable}`}
// body tag'ine:
className="font-body bg-bg text-text antialiased flex flex-col min-h-screen"
```

### CSS Variables (`app/globals.css`)

```css
@import "tailwindcss";

@theme {
  /* Tailwind utility isimleri */
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-border: var(--border);
  --color-accent: var(--accent);
  --color-accent-soft: var(--accent-soft);
  --color-accent-green: var(--accent-green);
  --color-text: var(--text);
  --color-muted: var(--muted);
  --color-peach: var(--peach);
  --color-lavender: var(--lavender);
  --color-blush: var(--blush);

  /* Şirket renkleri */
  --color-nova: #3B82F6;
  --color-mediplus: #386e84;
  --color-net-ambulans: #EF4444;
  --color-mobil-next: #06B6D4;
  /* Yeni şirket eklerken buraya ekle */

  --font-display: var(--font-playfair-display), "Playfair Display", Georgia, serif;
  --font-body: var(--font-plus-jakarta-sans), "Plus Jakarta Sans", system-ui, sans-serif;
}

@layer base {
  /* LIGHT THEME — Warm Wellness */
  :root {
    --bg: #FAF6EF;
    --surface: #FFFFFF;
    --border: #E8E0D4;
    --accent: #386e84;
    --accent-soft: #EBF1F3;
    --accent-green: #2d586a;
    --text: #1A2B2B;
    --muted: #6B7D7D;
    --peach: #F8A66E;
    --lavender: #E2EBFE;
    --blush: #F4B3BC;
    color-scheme: light;
  }

  /* DARK THEME — Warm Dark (orman tonu, cyberpunk değil) */
  [data-theme='dark'] {
    --bg: #1A2420;
    --surface: #222E29;
    --border: #344038;
    --accent: #4a8ca7;
    --accent-soft: #1E353E;
    --accent-green: #3d7e99;
    --text: #EDEAE5;
    --muted: #9CA8A0;
    --peach: #E8956A;
    --lavender: #2A3348;
    --blush: #3D2830;
    color-scheme: dark;
  }

  html { transition: background-color 400ms ease, color 400ms ease; scroll-behavior: smooth; }
  ::selection { background-color: var(--accent); color: #fff; }
  body { background-color: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
  h1, h2, h3, h4, h5, h6 { text-wrap: balance; }
  p { text-wrap: pretty; }
  a, button { transition-property: color, background-color, border-color, opacity, transform; transition-timing-function: ease; transition-duration: 200ms; }
}
```

### Tailwind Kullanım Kuralları

| Şey | Kullanım |
|-----|----------|
| Arka plan (ana) | `bg-bg` |
| Arka plan (kart/yüzey) | `bg-surface` |
| Kenarlık | `border-border` |
| Vurgu rengi | `bg-accent`, `text-accent` |
| Soft vurgu (hover bg) | `bg-accent-soft` |
| Ana metin | `text-text` |
| İkincil metin | `text-muted` |
| Başlık fontu | `font-display` |
| Gövde fontu | `font-body` (varsayılan) |
| Container | `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` |
| Section padding | `py-24` |
| Kart | `rounded-2xl border border-border bg-surface` |
| Büyük kart | `rounded-3xl` |
| Pill badge | `rounded-full` |
| Button primary | `bg-accent text-white rounded-full px-6 py-3 font-bold` |
| Button ghost | `border border-border rounded-full px-6 py-3` |
| Glow efekti | `boxShadow: 0 0 20px color-mix(in srgb, ${color} 30%, transparent)` |
| Dinamik tint | `color-mix(in srgb, ${color} 20%, transparent)` |
| Blur overlay | `backdrop-blur-xl` |

### Animasyon Kuralları (Framer Motion)

```typescript
// Scroll trigger (section'lar için)
import FadeIn from "@/app/components/shared/FadeIn";
<FadeIn><Section /></FadeIn>
<FadeIn delay={0.1} direction="left"><Section /></FadeIn>

// İlk yüklenişte (hero için) — whileInView değil, animate kullan
initial={{ opacity: 0, y: 30 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6 }}

// Stagger (liste animasyonları)
const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

// Sonsuz arka plan animasyonu
animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.5, 0.4] }}
transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}

// Spring hover
whileHover={{ scale: 1.02 }}
transition={{ type: "spring", stiffness: 400, damping: 30 }}
```

---

## BÖLÜM C — SUPABASE SCHEMA

Supabase Dashboard → SQL Editor'de çalıştır.

### Tablolar

```sql
-- ═══ HERO (Singleton) ═══
CREATE TABLE IF NOT EXISTS hero_sections (
  id SERIAL PRIMARY KEY,
  badge_text TEXT NOT NULL DEFAULT 'Sağlıkta Yeni Nesil',
  title_main TEXT NOT NULL DEFAULT 'Sağlığınız İçin',
  title_sub  TEXT NOT NULL DEFAULT 'Yanınızdayız',
  subtitle   TEXT NOT NULL DEFAULT 'Uzman ekibimizle 7/24 yanınızdayız',
  bg_image   TEXT,
  trust_badge1 TEXT NOT NULL DEFAULT '7/24 Uzman',
  trust_badge2 TEXT NOT NULL DEFAULT 'Gizlilik Güvencesi',
  trust_badge3 TEXT NOT NULL DEFAULT '100+ Uzman',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ HİZMETLER GRİD ═══
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  badge TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  feature1 TEXT NOT NULL,
  feature2 TEXT NOT NULL,
  href TEXT NOT NULL,
  image TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ KURUMSAL YAPILAR ═══
CREATE TABLE IF NOT EXISTS corporate_pillars (
  id SERIAL PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  color TEXT NOT NULL,
  bg_light TEXT NOT NULL,
  href TEXT NOT NULL,
  logo TEXT NOT NULL,
  bg_image TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ İSTATİSTİKLER ═══
CREATE TABLE IF NOT EXISTS stat_counters (
  id SERIAL PRIMARY KEY,
  value INT NOT NULL,
  suffix TEXT NOT NULL,
  label TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ NEDEN BİZ ═══
CREATE TABLE IF NOT EXISTS why_reasons (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  bg_color TEXT NOT NULL,
  icon_color TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ BLOG ═══
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image TEXT NOT NULL,
  category TEXT NOT NULL,
  date TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ PAKETLERİ FİYATLANDIRMA ═══
CREATE TABLE IF NOT EXISTS service_packages (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DOUBLE PRECISION NOT NULL,
  original_price DOUBLE PRECISION NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT '₺',
  discount INT NOT NULL DEFAULT 0,
  category TEXT NOT NULL,
  rating DOUBLE PRECISION NOT NULL DEFAULT 5.0,
  tag TEXT,
  image TEXT NOT NULL,
  includes TEXT[] NOT NULL DEFAULT '{}',
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ REFERANSLAR ═══
CREATE TABLE IF NOT EXISTS "references" (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  sector TEXT NOT NULL,
  service TEXT NOT NULL,
  description TEXT NOT NULL,
  tag TEXT NOT NULL,
  logo_url TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ TEKLİF FORMU (CRM) ═══
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  firm TEXT NOT NULL,
  contact TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  service TEXT NOT NULL,
  scope TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Beklemede',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ SSS ═══
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ ADMIN KULLANICILARI ═══
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
   TEXT NOT NULL,                   -- bcrypt hash
  role TEXT NOT NULL DEFAULT 'editor',      -- 'admin' | 'editor'
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ İLETİŞİM BİLGİLERİ (Singleton) ═══
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  whatsapp TEXT,
  instagram TEXT,
  linkedin TEXT,
  twitter TEXT,
  facebook TEXT,
  map_embed_url TEXT,                       -- NOT: UI'da mapEmbedUrl bekliyor — fieldMap.ts kullan
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ SİTE AYARLARI (Singleton) ═══
CREATE TABLE IF NOT EXISTS site_settings (
  id SERIAL PRIMARY KEY,
  site_title TEXT NOT NULL DEFAULT 'Site Adı',
  logo_url TEXT,
  footer_text TEXT,
  default_locale TEXT NOT NULL DEFAULT 'tr',
  maintenance_mode BOOLEAN NOT NULL DEFAULT false,
  email_notif BOOLEAN NOT NULL DEFAULT true,
  sms_notif BOOLEAN NOT NULL DEFAULT false,
  two_factor_auth BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ SEO META ═══
CREATE TABLE IF NOT EXISTS seo_meta (
  id SERIAL PRIMARY KEY,
  page_path TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  og_image TEXT,
  keywords TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ AKTİVİTE LOG ═══
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  action TEXT NOT NULL,
  resource TEXT NOT NULL,
  detail TEXT NOT NULL,
  user_id INT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ PORTAL KULLANICILARI (B2B) ═══
CREATE TABLE IF NOT EXISTS portal_users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
   TEXT NOT NULL,
  company_name TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ UPDATED_AT TRIGGER ═══
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

DO $$ DECLARE tbl TEXT; BEGIN
  FOR tbl IN SELECT unnest(ARRAY[
    'hero_sections','services','corporate_pillars','stat_counters','why_reasons',
    'blog_posts','service_packages','references','leads','faqs','admin_users',
    'contact_info','site_settings','seo_meta','portal_users'
  ]) LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS set_updated_at ON %I; CREATE TRIGGER set_updated_at BEFORE UPDATE ON %I FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();', tbl, tbl);
  END LOOP;
END; $$;

-- ═══ RLS (GELİŞTİRME) ═══
-- Prod'da admin tabloları için uygun policy ekle!
ALTER TABLE hero_sections ENABLE ROW LEVEL SECURITY;
CREATE POLICY "allow_all" ON hero_sections FOR ALL USING (true) WITH CHECK (true);
-- Aynı pattern'ı diğer tablolara uygula
```

### İlk Admin Kullanıcısı

```sql
-- Supabase SQL Editor'de çalıştır (password = "admin123" bcrypt hash):
INSERT INTO admin_users (name, email, password, role)
VALUES ('Admin', 'admin@site.com', '$2b$10$hash_buraya', 'admin');
```

Gerçek hash oluşturmak için: `node -e "const b=require('bcryptjs'); b.hash('sifre',10).then(console.log)"`

---

## BÖLÜM D — AUTH SİSTEMİ

### Dosya: `lib/adminAuth.ts`

HMAC-SHA256 imzalı JWT — 3 fonksiyon kopyala:
- `createSessionToken(userId, expiresInHours=8)` → `"header.payload.signature"` formatı
- `verifySessionToken(token)` → `{ userId }` veya `null` (timing-safe karşılaştırma)
- `setSessionCookie(response, token)` → HttpOnly, secure, sameSite:'lax', 8 saat

### Dosya: `lib/rateLimit.ts`

In-memory Map tabanlı rate limiter:
- `checkRateLimit(identifier, options)` → `{ allowed, remainingAttempts, retryAfterMs? }`
- `resetRateLimit(identifier)` → başarılı login sonrası çağır
- 5 deneme / 15 dakika pencere / 15 dakika lockout
- 5 dakikada bir temizleme (setInterval)

### Dosya: `app/api/auth/route.ts`

```typescript
// POST — login
// 1. Rate limit: identifier = `${email}::${ip}` (x-forwarded-for header'dan)
// 2. admin_users tablosundan email + is_active=true ile sorgula
// 3. bcrypt.compare(password, user.password)
// 4. resetRateLimit(identifier)
// 5. createSessionToken(user.id, 8)
// 6. setSessionCookie(response, token)
// 7. Sadece user objesini dön (id, name, email, role) — TOKEN BODY'YE EKLEME

// GET — session check
// Cookie'den token al → verifySessionToken → admin_users'dan user çek

// DELETE — logout
// response.cookies.delete("admin_session")
```

### Dosya: `middleware.ts`

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { verifySessionToken } from './lib/adminAuth';

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/admin')) {
    const token =
      req.cookies.get('admin_session')?.value ||
      req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) return NextResponse.json({ error: 'Yetkilendirme gerekli.' }, { status: 401 });

    const result = verifySessionToken(token);
    if (!result) {
      const response = NextResponse.json({ error: 'Oturum süresi doldu.' }, { status: 401 });
      response.cookies.delete('admin_session');
      return response;
    }

    return NextResponse.next();
  }

  return intlMiddleware(req);
}

export const config = {
  matcher: ['/api/admin/:path*', '/api/portal/:path*', '/((?!api|_next|_vercel|.*\\..*).*)', '/(tr|en)/:path*']
};
```

---

## BÖLÜM E — API ROUTE PATTERN

### Supabase Client Seçimi

```typescript
// client component'ler (browser'da çalışan fetch) — ANON KEY
import { supabase } from "@/lib/supabaseClient";

// API route'lar (sunucu) — SERVICE ROLE KEY (RLS bypass)
import { supabaseAdmin as supabase } from "@/lib/supabaseAdmin";
```

### Standart CRUD Route (Örnek: blog)

```typescript
// app/api/admin/blog/route.ts
import { supabaseAdmin as supabase } from "@/lib/supabaseAdmin";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/adminAuth";

async function getAdminUserId(): Promise<number | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;
    if (!token) return null;
    return verifySessionToken(token)?.userId ?? null;
  } catch { return null; }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
    if (search) query = query.or(`title.ilike.%${search}%,excerpt.ilike.%${search}%`);
    if (category) query = query.eq("category", category);

    const { data, error } = await query;
    if (error) throw error;
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "Liste alınamadı" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = await getAdminUserId();

    const { data, error } = await supabase.from("blog_posts").insert(body).select().single();
    if (error) throw error;

    await supabase.from("activity_logs").insert({
      action: "create", resource: "blog",
      detail: `Blog eklendi: ${data.title}`, user_id: userId,
    });

    return NextResponse.json(data, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Oluşturulamadı" }, { status: 500 });
  }
}
```

```typescript
// app/api/admin/blog/[id]/route.ts
export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const { data, error } = await supabase.from("blog_posts").update(body).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { error } = await supabase.from("blog_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
```

### snake_case ↔ camelCase Dönüşümü

Supabase her zaman `snake_case` döner. UI `camelCase` bekler. `lib/fieldMap.ts`'i kullan:

```typescript
import { snakeToCamel, camelToSnake, mapToCamel } from "@/lib/fieldMap";

// API GET response'unda:
return NextResponse.json(mapToCamel(data));

// API PUT/POST body'sinde:
const dbBody = camelToSnake(body);
await supabase.from("table").update(dbBody)...
```

**UYARI:** Bu dönüşümü tutarsız uygulama. Ya her yerde uygula ya da hiçbir yerde. Karıştırırsan bazı alanlar UI'da göründüğü halde kaydedilmez (en sık hata).

---

## BÖLÜM F — SAYFA & COMPONENT YAPISI

### Layout (`app/[locale]/layout.tsx`)

```typescript
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import ClientLayoutWrapper from "@/app/components/layout/ClientLayoutWrapper";
import { ThemeProvider } from "@/app/components/theme-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) notFound();
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${playfairDisplay.variable} ${plusJakartaSans.variable}`} suppressHydrationWarning>
      <body className="font-body bg-bg text-text antialiased flex flex-col min-h-screen">
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          <NextIntlClientProvider messages={messages}>
            <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### ClientLayoutWrapper

```typescript
"use client";
import { LazyMotion, domAnimation } from "framer-motion";
import { usePathname } from "next/navigation";

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const isPortal = pathname?.includes("/portal");
  const isAdmin = pathname?.includes("/admin");
  const isHiddenRoute = isPortal || isAdmin;

  return (
    <LazyMotion features={domAnimation}>
      {!isHiddenRoute && <Cursor />}
      {!isHiddenRoute && <Header />}
      <main className="flex-grow">{children}</main>
      {!isHiddenRoute && <Footer />}
      {!isHiddenRoute && <WhatsAppButton />}
    </LazyMotion>
  );
}
```

**NOT:** Framer Motion `m` import'u için `LazyMotion` + `domAnimation` sarmalayıcısı **zorunlu**. Aksi halde `m.div` çalışmaz.

### Ana Sayfa (`app/[locale]/page.tsx`)

```typescript
export const revalidate = 60; // ISR — Server Component olduğu için çalışır

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <Hero />
      <FadeIn><AppShowcase /></FadeIn>
      <ServicesGrid />
      <FadeIn><CorporatePillars /></FadeIn>
      <StatsCounter />
      <FadeIn><WhyNextPlus /></FadeIn>
      <FadeIn><SectorsRow /></FadeIn>
      <FadeIn><BlogPreview /></FadeIn>
      <FadeIn><ReferencesGrid /></FadeIn>
      <FadeIn><FAQSection faqs={...} title={...} /></FadeIn>
      <FadeIn><ContactCTA /></FadeIn>
    </div>
  );
}
```

**KURAL:** Ana sayfa Server Component'tır (`revalidate` export eder). `"use client"` ekleme. İçindeki componentler kendi içinde client olabilir.

### DB'den Veri Çeken Component Kalıbı

```typescript
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Item { id: number; title: string; is_active: boolean; }

export default function MySection() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    supabase.from("table_name")
      .select("*")
      .eq("is_active", true)
      .order("sort_order")
      .then(({ data }) => { if (data) setItems(data); });
  }, []);

  if (items.length === 0) return null; // Skeleton veya null — loading spinner ekleme

  return <div>{items.map(item => ...)}</div>;
}
```

### FadeIn Component

```typescript
// app/components/shared/FadeIn.tsx
"use client";
import { motion } from "framer-motion";

export default function FadeIn({ children, delay=0, direction="up", className="" }) {
  const dirs = { up:{y:40,x:0}, down:{y:-40,x:0}, left:{x:40,y:0}, right:{x:-40,y:0}, none:{x:0,y:0} };
  return (
    <motion.div
      initial={{ opacity: 0, ...dirs[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

### i18n Navigation (Önemli Ayrım)

```typescript
// Header, Footer ve locale-aware bileşenlerde:
import { Link, usePathname, useRouter } from "@/i18n/routing";

// Hizmet/şirket sayfaları gibi content sayfalarda:
import Link from "next/link";
```

---

## BÖLÜM G — ADMIN PANELİ

### Admin Sayfa Kalıbı

```typescript
"use client";
import { useState, useEffect } from "react";
import AdminTable from "@/app/components/admin/AdminTable";
import AdminModal from "@/app/components/admin/AdminModal";
import { Input } from "@/app/components/ui/Input";
import AdminTextarea from "@/app/components/admin/AdminTextarea";
import AdminSelect from "@/app/components/admin/AdminSelect";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import { showToast } from "@/app/components/admin/AdminToast";
import { PlusIcon } from "lucide-react";

interface Item { id: number; title: string; is_active: boolean; }

const empty: Partial<Item> = { title: "", is_active: true };

export default function AdminItemPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Partial<Item>>(empty);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const fetch = () => {
    setLoading(true);
    window.fetch("/api/admin/items")
      .then(r => r.json())
      .then(d => { setItems(Array.isArray(d) ? d : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(fetch, []);

  const handleSave = async () => {
    const isNew = !editing.id;
    const res = await window.fetch(isNew ? "/api/admin/items" : `/api/admin/items/${editing.id}`, {
      method: isNew ? "POST" : "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editing),
    });
    if (res.ok) {
      showToast("success", isNew ? "Eklendi!" : "Güncellendi!");
      setModalOpen(false); setEditing(empty); fetch();
    } else {
      const err = await res.json();
      showToast("error", err.error || "Hata");
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const res = await window.fetch(`/api/admin/items/${deleteId}`, { method: "DELETE" });
    if (res.ok) { showToast("success", "Silindi!"); setDeleteId(null); fetch(); }
    else showToast("error", "Silinemedi");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">İçerik Adı</h1>
        <button onClick={() => { setEditing(empty); setModalOpen(true); }}
          className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-xl">
          <PlusIcon size={16} /> Yeni Ekle
        </button>
      </div>

      <AdminTable
        data={items}
        loading={loading}
        columns={[
          { key: "title", label: "Başlık" },
          { key: "is_active", label: "Aktif", render: (v) => v ? "✓" : "✗" },
        ]}
        onEdit={(item) => { setEditing(item); setModalOpen(true); }}
        onDelete={(item) => setDeleteId(item.id)}
      />

      <AdminModal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(empty); }}
        title={editing.id ? "Düzenle" : "Yeni Ekle"} onSave={handleSave}>
        <Input placeholder="Başlık" value={editing.title || ""}
          onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} />
      </AdminModal>

      <ConfirmDialog open={!!deleteId} onCancel={() => setDeleteId(null)} onConfirm={handleDelete}
        title="Silmek istediğinize emin misiniz?" />
    </div>
  );
}
```

### Admin Layout

```typescript
// app/[locale]/admin/layout.tsx
"use client";
// Sidebar navigation + auth check
// GET /api/auth → authenticated: false ise /admin/login'e yönlendir
```

---

## BÖLÜM H — i18n KURULUMU

### `i18n/routing.ts`

```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['tr', 'en'],
  defaultLocale: 'tr'
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

### `i18n/request.ts`

```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
```

### `next.config.ts`

```typescript
import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'plus.unsplash.com' },
    ],
  },
};

export default withNextIntl(nextConfig);
```

### Mesaj Dosyası Yapısı (`messages/tr.json`)

```json
{
  "nav": {
    "home": "Ana Sayfa",
    "services": "Hizmetlerimiz",
    "contact": "İletişim",
    "companies": "Diğer Şirketlerimiz",
    "nova_clinic": { "desc": "Sabit klinik ve revir" },
    "mediplus": { "desc": "Mobil sağlık tarama" },
    "net_ambulans": { "desc": "Ambulans hizmetleri" }
  },
  "hero": {
    "title_main": "...",
    "title_sub": "...",
    "subtitle": "..."
  },
  "faq": {
    "title": "Sıkça Sorulan Sorular",
    "q1": "...", "a1": "..."
  },
  "contact": {
    "form": { "full_name": "Ad Soyad", "email": "E-posta", "submit": "Gönder" }
  }
}
```

### Component'te Kullanım

```typescript
"use client";
import { useTranslations, useLocale } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("nav");
  const locale = useLocale();
  return <div>{t("home")}</div>;
}

// Server component'te:
import { getTranslations } from "next-intl/server";
const t = await getTranslations("hero");
```

---

## KRİTİK HATALAR — ASLA YAPMA

Bu hatalar Next Plus Health'te tespit edildi. Yeni projede tekrarlama:

### 1. Token'ı body'ye koyma
```typescript
// ❌ YANLIŞ
return NextResponse.json({ token, user });
// ✅ DOĞRU
const response = NextResponse.json({ user });
return setSessionCookie(response, token);
```

### 2. API endpoint'i authentication'sız bırakma
```typescript
// ❌ YANLIŞ — leads GET endpoint'i herkese açık
export async function GET() { return NextResponse.json(await getAllLeads()); }
// ✅ DOĞRU — /api/admin/ altında middleware korur, public endpoint'ler sadece POST alır
```

### 3. Form sadece state flip etme
```typescript
// ❌ YANLIŞ
const onSubmit = () => { setSuccess(true); }; // hiçbir şey göndermeden başarı göster
// ✅ DOĞRU
const onSubmit = async (data) => {
  const res = await fetch('/api/leads', { method:'POST', body: JSON.stringify(data) });
  if (res.ok) setSuccess(true);
};
```

### 4. camelCase/snake_case tutarsızlığı
```typescript
// ❌ YANLIŞ — DB'den is_active gelir, UI isActive bekler → veri gelmiyor gibi görünür
setItems(data); // snake_case direkt kullan veya...
// ✅ DOĞRU
import { mapToCamel } from "@/lib/fieldMap";
setItems(mapToCamel(data));
// API'ye gönderirken:
import { camelToSnake } from "@/lib/fieldMap";
fetch('/api/admin/items', { body: JSON.stringify(camelToSnake(editing)) });
```

### 5. Client'ta service role key kullanma
```typescript
// ❌ YANLIŞ — NEXT_PUBLIC_ prefix'i var → browser bundle'a girer
const supabase = createClient(url, process.env.NEXT_PUBLIC_SERVICE_ROLE_KEY);
// ✅ DOĞRU — supabaseAdmin sadece API route'larda (sunucu tarafında) kullan
import { supabaseAdmin } from "@/lib/supabaseAdmin"; // route.ts'de
import { supabase } from "@/lib/supabaseClient";     // client component'de
```

### 6. "use client" sayfada ISR kullanma
```typescript
// ❌ YANLIŞ
"use client";
export const revalidate = 60; // Client component'te çalışmaz!
// ✅ DOĞRU — revalidate sadece Server Component'lerde
// Eğer sayfaya "use client" gerekiyorsa → revalidate kaldır
```

### 7. Blog list/detail çelişkisi
```typescript
// ❌ YANLIŞ — liste DB'den, detail statik array'den
// blog/page.tsx → supabase'den çek
// blog/[slug]/page.tsx → hardcoded array'den ara → 404

// ✅ DOĞRU — her ikisi de aynı kaynaktan
// blog/[slug]/page.tsx:
const { data: post } = await supabase.from('blog_posts').select('*').eq('slug', slug).single();
if (!post) notFound();
```

### 8. Portal'ı güvenli gösterme
```typescript
// ❌ YANLIŞ — setTimeout ile redirect yapma
useEffect(() => { setTimeout(() => router.push('/portal/dashboard'), 1500); }, []);
// ✅ DOĞRU — gerçek session kontrolü yap
```

---

## ÖZET KONTROL LİSTESİ

Projeyi teslim etmeden önce kontrol et:

- [ ] `.env.local` dosyası var, tüm değişkenler tanımlı
- [ ] `SUPABASE_SERVICE_ROLE_KEY` hiçbir client component veya `NEXT_PUBLIC_` değişkende yok
- [ ] `ADMIN_JWT_SECRET` minimum 32 karakter random string
- [ ] `admin_users` tablosunda en az bir kullanıcı var (bcrypt hash ile)
- [ ] Tüm admin API route'ları `/api/admin/` altında (middleware koruyacak)
- [ ] Public form submit endpoint'i sadece POST alıyor, GET yok
- [ ] DB'den okunan snake_case verileri UI'a taşınmadan önce camelCase'e çevriliyor
- [ ] Tüm form submit'ler gerçekten API'ye veri gönderiyor
- [ ] Blog detail sayfası DB'den slug sorgulayarak çalışıyor
- [ ] `font-display` class'ı h1/h2'lerde, `font-body` gövde metninde
- [ ] Mobil menu kapatılıyor (onClick={() => setMobileMenuOpen(false)})
- [ ] `<Image>` alt prop'ları dolu
- [ ] `revalidate` sadece Server Component'lerde tanımlı
