"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

interface Feature { id: number; icon: string; title: string; description: string; highlight: string | null; sort_order: number; is_active: boolean; }
const empty = { icon: "Activity", title: "", description: "", highlight: "", sort_order: 0, is_active: true };

export default function AdminOzelliklerPage() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [modal, setModal] = useState<{ open: boolean; editing: Feature | null }>({ open: false, editing: null });
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);

  async function load() { const r = await fetch("/api/admin/features"); setFeatures(await r.json()); }
  useEffect(() => { load(); }, []);

  function openCreate() { setForm(empty); setModal({ open: true, editing: null }); }
  function openEdit(f: Feature) { const { id, ...rest } = f; setForm({ ...rest, highlight: rest.highlight ?? "" }); setModal({ open: true, editing: f }); }

  async function save() {
    setLoading(true);
    const isEdit = !!modal.editing;
    await fetch(isEdit ? `/api/admin/features/${modal.editing!.id}` : "/api/admin/features", {
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
    await fetch(`/api/admin/features/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Band Özellikleri</h1>
        <button onClick={openCreate} className="flex items-center gap-2 bg-accent text-white rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-accent-green transition-colors">
          <Plus className="w-4 h-4" /> Yeni Özellik
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f) => (
          <div key={f.id} className="bg-surface border border-border rounded-2xl p-5 flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-accent font-mono text-xs bg-accent-soft px-2 py-0.5 rounded-full">{f.icon}</span>
                <p className="font-semibold text-sm">{f.title}</p>
              </div>
              <p className="text-muted text-sm">{f.description}</p>
              <p className="text-xs text-muted mt-1">Sıra: {f.sort_order}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => openEdit(f)} className="p-1.5 hover:bg-accent-soft rounded-lg text-muted hover:text-accent transition-colors"><Pencil className="w-4 h-4" /></button>
              <button onClick={() => remove(f.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-muted hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
            </div>
          </div>
        ))}
        {features.length === 0 && <p className="text-center text-muted py-12 text-sm col-span-2">Henüz özellik yok.</p>}
      </div>

      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-lg">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-display font-bold text-lg">{modal.editing ? "Düzenle" : "Yeni Özellik"}</h2>
              <button onClick={() => setModal({ open: false, editing: null })}><X className="w-5 h-5 text-muted" /></button>
            </div>
            <div className="p-6 space-y-4">
              {(["icon", "title", "description", "highlight"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1.5 capitalize">{field === "highlight" ? "Öne Çıkan Metin" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input value={(form as Record<string, string | number | boolean>)[field] as string} onChange={(e) => setForm({ ...form, [field]: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1.5">Sıra</label>
                <input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30" />
              </div>
            </div>
            <div className="p-6 border-t border-border flex justify-end gap-3">
              <button onClick={() => setModal({ open: false, editing: null })} className="border border-border rounded-xl px-5 py-2.5 text-sm font-medium hover:bg-accent-soft transition-colors">İptal</button>
              <button onClick={save} disabled={loading} className="flex items-center gap-2 bg-accent text-white rounded-xl px-5 py-2.5 text-sm font-bold hover:bg-accent-green transition-colors disabled:opacity-60">
                <Save className="w-4 h-4" /> {loading ? "Kaydediliyor..." : "Kaydet"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
