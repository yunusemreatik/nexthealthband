"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send, CheckCircle } from "lucide-react";
import FadeIn from "../shared/FadeIn";

export default function ContactCTA() {
  const t = useTranslations("contact");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "contact_cta" }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-24 bg-bg">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn className="text-center mb-10">
          <h2 className="font-display text-4xl font-bold">{t("title")}</h2>
          <p className="text-muted mt-3">{t("subtitle")}</p>
        </FadeIn>

        {status === "success" ? (
          <FadeIn>
            <div className="bg-accent-soft border border-accent/30 rounded-2xl p-8 text-center">
              <CheckCircle className="w-12 h-12 text-accent mx-auto mb-4" />
              <p className="text-accent font-semibold">{t("success")}</p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn>
            <form onSubmit={handleSubmit} className="bg-surface border border-border rounded-3xl p-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t("name")}</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
                    placeholder="Ad Soyad"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">{t("email")}</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
                    placeholder="ornek@mail.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("phone")}</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition"
                  placeholder="+90 5XX XXX XX XX"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("message")}</label>
                <textarea
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-bg border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 transition resize-none"
                  placeholder="Mesajınızı yazın..."
                />
              </div>
              {status === "error" && (
                <p className="text-red-500 text-sm">{t("error")}</p>
              )}
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full flex items-center justify-center gap-2 bg-accent text-white rounded-xl py-3.5 font-bold hover:bg-accent-green transition-colors disabled:opacity-60"
              >
                {status === "loading" ? "Gönderiliyor..." : (
                  <>
                    {t("submit")} <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </FadeIn>
        )}
      </div>
    </section>
  );
}
