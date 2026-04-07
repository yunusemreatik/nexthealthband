"use client";

import { useEffect, useState } from "react";
import { Save } from "lucide-react";

interface ContactInfo { phone: string; email: string; address: string; whatsapp: string; instagram: string; linkedin: string; }
const empty: ContactInfo = { phone: "", email: "", address: "", whatsapp: "", instagram: "", linkedin: "" };

export default function AdminIletisimBilgileriPage() {
  const [form, setForm] = useState<ContactInfo>(empty);
  const [status, setStatus] = useState<"idle" | "loading" | "saved">("idle");

  useEffect(() => {
    fetch("/api/admin/contact").then((r) => r.json()).then((d) => { if (d) setForm({ ...empty, ...d }); });
  }, []);

  async function save() {
    setStatus("loading");
    await fetch("/api/admin/contact", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2000);
  }

  const fields: { key: keyof ContactInfo; label: string }[] = [
    { key: "phone", label: "Telefon" },
    { key: "email", label: "E-posta" },
    { key: "address", label: "Adres" },
    { key: "whatsapp", label: "WhatsApp" },
    { key: "instagram", label: "Instagram" },
    { key: "linkedin", label: "LinkedIn" },
  ];

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">İletişim Bilgileri</h1>
      </div>
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        {fields.map(({ key, label }) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1.5">{label}</label>
            <input value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
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
