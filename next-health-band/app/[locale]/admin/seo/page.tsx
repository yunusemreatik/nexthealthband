"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

interface SeoMeta { page: string; title: string; description: string; og_image: string; }

const pages = [
  { page: "home", label: "Ana Sayfa" },
  { page: "product", label: "Ürün" },
  { page: "app", label: "Uygulama" },
  { page: "about", label: "Hakkımızda" },
  { page: "blog", label: "Blog" },
  { page: "contact", label: "İletişim" },
];

export default function AdminSeoPage() {
  const [metas, setMetas] = useState<SeoMeta[]>([]);
  const [selected, setSelected] = useState("home");
  const [form, setForm] = useState<SeoMeta>({ page: "home", title: "", description: "", og_image: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "saved">("idle");

  useEffect(() => {
    fetch("/api/admin/seo").then((r) => r.json()).then(setMetas);
  }, []);

  useEffect(() => {
    const existing = metas.find((m) => m.page === selected);
    setForm(existing ?? { page: selected, title: "", description: "", og_image: "" });
  }, [selected, metas]);

  async function save() {
    setStatus("loading");
    try {
      const res = await fetch("/api/admin/seo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Ağ hatası veya sunucu hatası");
      
      const r = await fetch("/api/admin/seo");
      if (!r.ok) throw new Error("Veriler güncellenirken hata oluştu");
      setMetas(await r.json());
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2000);
    } catch (error) {
      console.error(error);
      alert("Hata: Değişiklikler kaydedilemedi!");
      setStatus("idle");
    }
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">SEO Metadata</h1>
      </div>

      <div className="flex gap-2 flex-wrap mb-6">
        {pages.map(({ page, label }) => (
          <button
            key={page}
            onClick={() => setSelected(page)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selected === page ? "bg-accent text-white" : "border border-border hover:bg-accent-soft"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5">Sayfa Başlığı</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Açıklama</label>
          <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">OG Görsel URL</label>
          <input value={form.og_image} onChange={(e) => setForm({ ...form, og_image: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
        </div>
        <div className="pt-2">
          <button onClick={save} disabled={status === "loading"} className="flex items-center gap-2 bg-accent text-white rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-accent-green transition-colors disabled:opacity-60">
            <Save className="w-4 h-4" />
            {status === "loading" ? "Kaydediliyor..." : status === "saved" ? "Kaydedildi ✓" : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
}
