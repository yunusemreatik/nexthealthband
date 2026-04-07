-- ═══ Next Health Band — Supabase Database Schema ═══
-- Supabase Dashboard > SQL Editor'de çalıştırın

-- Hero (singleton)
CREATE TABLE IF NOT EXISTS hero_sections (
  id SERIAL PRIMARY KEY,
  badge_text TEXT NOT NULL DEFAULT 'Yeni Nesil Sağlık Takibi',
  title_main TEXT NOT NULL DEFAULT 'Sağlığınızı Takip Edin',
  title_sub  TEXT NOT NULL DEFAULT 'Her An, Her Yerde',
  subtitle   TEXT NOT NULL DEFAULT 'Next Health Band ile sağlık verilerinizi gerçek zamanlı izleyin.',
  bg_image   TEXT,
  cta_primary TEXT NOT NULL DEFAULT 'Hemen Başla',
  cta_secondary TEXT NOT NULL DEFAULT 'Daha Fazla Bilgi',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Varsayılan hero satırı
INSERT INTO hero_sections (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- Band özellikleri
CREATE TABLE IF NOT EXISTS band_features (
  id SERIAL PRIMARY KEY,
  icon TEXT NOT NULL DEFAULT 'Activity',
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  highlight TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Teknik özellikler
CREATE TABLE IF NOT EXISTS band_specs (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  spec_key TEXT NOT NULL,
  spec_value TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Sayaçlar
CREATE TABLE IF NOT EXISTS stat_counters (
  id SERIAL PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  suffix TEXT,
  sort_order INT NOT NULL DEFAULT 0
);

-- Neden Next Health Band?
CREATE TABLE IF NOT EXISTS why_reasons (
  id SERIAL PRIMARY KEY,
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0
);

-- Blog
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT,
  author TEXT NOT NULL DEFAULT 'Next Health Band',
  is_published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- SSS
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true
);

-- Örnek SSS kayıtları
INSERT INTO faqs (question, answer, sort_order) VALUES
  ('Next Health Band hangi sağlık verilerini takip eder?', 'Adım sayısı, kalori yakımı, kalp atış hızı, uyku kalitesi, kan oksijen saturasyonu (SpO2) ve günlük aktivite verilerini takip eder.', 1),
  ('Next Plus Health uygulamasıyla nasıl senkronize olur?', 'Band, Bluetooth 5.3 aracılığıyla akıllı telefonunuzdaki Next Plus Health uygulamasına bağlanır ve veriler otomatik olarak senkronize edilir.', 2),
  ('Pil ömrü ne kadar sürer?', '14 güne kadar pil ömrü sunar. Yoğun kullanımda bu süre 7-10 gün civarında olabilir.', 3),
  ('Su geçirmez mi?', 'Evet, 5ATM su direncine sahiptir. Yüzme ve duş sırasında kullanabilirsiniz.', 4)
ON CONFLICT DO NOTHING;

-- İletişim talepleri (leads)
CREATE TABLE IF NOT EXISTS leads (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  source TEXT DEFAULT 'contact_form',
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Admin kullanıcılar
CREATE TABLE IF NOT EXISTS admin_users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- İletişim bilgileri
CREATE TABLE IF NOT EXISTS contact_info (
  id SERIAL PRIMARY KEY,
  phone TEXT,
  email TEXT,
  address TEXT,
  whatsapp TEXT,
  instagram TEXT,
  linkedin TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Site ayarları
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Varsayılan ayarlar
INSERT INTO site_settings (key, value) VALUES
  ('site_name', 'Next Health Band'),
  ('site_description', 'Sağlığınızı takip edin, her an her yerde.'),
  ('whatsapp_phone', '905000000000')
ON CONFLICT (key) DO NOTHING;

-- SEO metadata
CREATE TABLE IF NOT EXISTS seo_meta (
  id SERIAL PRIMARY KEY,
  page TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  og_image TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Activity log
CREATE TABLE IF NOT EXISTS activity_logs (
  id SERIAL PRIMARY KEY,
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ═══ Admin kullanıcı oluşturmak için ═══
-- bcrypt hash üretmek için: node -e "const b=require('bcryptjs'); b.hash('SifrenizBuraya', 12).then(console.log)"
-- Sonra aşağıdaki INSERT'e hash'i yapıştırın:
-- INSERT INTO admin_users (email, password_hash) VALUES ('admin@nexthealthband.com', '$2a$12$...');

-- ═══ RLS (Row Level Security) — Opsiyonel ═══
-- Eğer Supabase RLS aktifse şu politikaları ekleyin:
-- ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
-- (Service role key tüm politikaları bypass eder, ANON key sadece public okuma)
