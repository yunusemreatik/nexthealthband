"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X } from "lucide-react";

interface FAQ { id: number; question: string; answer: string; sort_order: number; is_active: boolean; }
const empty = { question: "", answer: "", sort_order: 0, is_active: true };

export default function AdminSSSPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [modal, setModal] = useState<{ open: boolean; editing: FAQ | null }>({ open: false, editing: null });
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  async function load() { const r = await fetch("/api/admin/faq"); setFaqs(await r.json()); }
  useEffect(() => { load(); }, []);

  function openCreate() { setForm(empty); setModal({ open: true, editing: null }); }
  function openEdit(f: FAQ) { const { id, ...rest } = f; setForm(rest); setModal({ open: true, editing: f }); }

  async function save() {
    setLoading(true);
    const isEdit = !!modal.editing;
    await fetch(isEdit ? `/api/admin/faq/${modal.editing!.id}` : "/api/admin/faq", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setModal({ open: false, editing: null });
    await load();
    setLoading(false);
  }

  async function remove(id: number) {
    if (!confirm("Silmek istiyor musunuz?")) return;
    await fetch(`/api/admin/faq/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">SSS Yönetimi</h1>
        <button onClick={openCreate} className="flex items-center gap-2 bg-accent text-white rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-accent-green transition-colors">
          <Plus className="w-4 h-4" /> Yeni Soru
        </button>
      </div>

      <div className="space-y-3">
        {faqs.map((f) => (
          <div key={f.id} className="bg-surface border border-border rounded-2xl p-5 flex items-start gap-4">
            <div className="flex-1">
              <p className="font-semibold text-sm">{f.question}</p>
              <p className="text-muted text-sm mt-1 line-clamp-2">{f.answer}</p>
              <p className="text-xs text-muted mt-2">Sıra: {f.sort_order}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(f)} className="p-1.5 hover:bg-accent-soft rounded-lg text-muted hover:text-accent transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(f.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-muted hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {faqs.length === 0 && <p className="text-center text-muted py-12 text-sm">Henüz SSS yok.</p>}
      </div>

      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-lg">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-display font-bold text-lg">{modal.editing ? "Düzenle" : "Yeni SSS"}</h2>
              <button onClick={() => setModal({ open: false, editing: null })}><X className="w-5 h-5 text-muted" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Soru</label>
                <input value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Cevap</label>
                <textarea rows={4} value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Sıra</label>
                <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button onClick={() => setModal({ open: false, editing: null })} className="border border-border rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-accent-soft transition-colors">İptal</button>
              <button onClick={save} disabled={loading} className="bg-accent text-white rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-accent-green transition-colors disabled:opacity-60">
                {loading ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
