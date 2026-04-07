"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

interface Hero {
  badge_text: string;
  title_main: string;
  title_sub: string;
  subtitle: string;
  cta_primary: string;
  cta_secondary: string;
}

export default function AdminIcerikPage() {
  const [form, setForm] = useState<Hero>({ badge_text: "", title_main: "", title_sub: "", subtitle: "", cta_primary: "", cta_secondary: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "saved">("idle");

  useEffect(() => {
    fetch("/api/admin/hero").then((r) => r.json()).then((d) => {
      if (d.badge_text) setForm(d);
    });
  }, []);

  async function save() {
    setStatus("loading");
    await fetch("/api/admin/hero", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  }

  const fields: { key: keyof Hero; label: string }[] = [
    { key: "badge_text", label: "Badge Metni" },
    { key: "title_main", label: "Başlık (Ana)" },
    { key: "title_sub", label: "Başlık (Vurgu)" },
    { key: "subtitle", label: "Açıklama" },
    { key: "cta_primary", label: "Ana CTA Butonu" },
    { key: "cta_secondary", label: "İkincil CTA Butonu" },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Hero İçerik</h1>
        <p className="text-muted text-sm mt-1">Ana sayfa hero bölümünü düzenleyin</p>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1.5">{label}</label>
            {key === "subtitle" ? (
              <textarea
                rows={3}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none"
              />
            ) : (
              <input
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
              />
            )}
          </div>
        ))}

        <div className="pt-2">
          <button
            onClick={save}
            disabled={status === "loading"}
            className="flex items-center gap-2 bg-accent text-white rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-accent-green transition-colors disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {status === "loading" ? "Kaydediliyor..." : status === "saved" ? "Kaydedildi ✓" : "Kaydet"}
          </button>
        </div>
      </div>
    </div>
  );
}
