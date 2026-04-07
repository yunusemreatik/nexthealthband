"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

export default function AdminAyarlarPage() {
  const [settings, setSettings] = useState<Record<string, string>>({
    site_name: "Next Health Band",
    site_description: "Sağlığınızı takip edin, her an her yerde.",
    whatsapp_phone: "905000000000",
    google_analytics_id: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "saved">("idle");

  useEffect(() => {
    fetch("/api/admin/settings").then((r) => r.json()).then((d) => {
      if (Object.keys(d).length > 0) setSettings((prev) => ({ ...prev, ...d }));
    });
  }, []);

  async function save() {
    setStatus("loading");
    await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  }

  const fields = [
    { key: "site_name", label: "Site Adı" },
    { key: "site_description", label: "Site Açıklaması" },
    { key: "whatsapp_phone", label: "WhatsApp Numarası" },
    { key: "google_analytics_id", label: "Google Analytics ID" },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Site Ayarları</h1>
      </div>
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1.5">{label}</label>
            <input
              value={settings[key] ?? ""}
              onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
              className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
            />
          </div>
        ))}
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
