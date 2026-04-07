"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Check, X } from "lucide-react";

interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  is_published: boolean;
  published_at: string | null;
  author: string;
}

const empty: Omit<Post, "id"> = {
  slug: "", title: "", excerpt: "", content: "", is_published: false, published_at: null, author: "Next Health Band",
};

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [modal, setModal] = useState<{ open: boolean; editing: Post | null }>({ open: false, editing: null });
  const [form, setForm] = useState<Omit<Post, "id">>(empty);
  const [loading, setLoading] = useState(false);

  async function load() {
    const r = await fetch("/api/admin/blog");
    setPosts(await r.json());
  }
  useEffect(() => { load(); }, []);

  function openCreate() {
    setForm(empty);
    setModal({ open: true, editing: null });
  }

  function openEdit(p: Post) {
    const { id, ...rest } = p;
    setForm(rest);
    setModal({ open: true, editing: p });
  }

  async function save() {
    setLoading(true);
    const isEdit = !!modal.editing;
    const url = isEdit ? `/api/admin/blog/${modal.editing!.id}` : "/api/admin/blog";
    const method = isEdit ? "PUT" : "POST";
    const body = { ...form, published_at: form.is_published ? (form.published_at ?? new Date().toISOString()) : null };
    await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setModal({ open: false, editing: null });
    await load();
    setLoading(false);
  }

  async function remove(id: number) {
    if (!confirm("Silmek istediğinizden emin misiniz?")) return;
    await fetch(`/api/admin/blog/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl font-bold">Blog Yazıları</h1>
        <button onClick={openCreate} className="flex items-center gap-2 bg-accent text-white rounded-xl px-4 py-2.5 text-sm font-bold hover:bg-accent-green transition-colors">
          <Plus className="w-4 h-4" /> Yeni Yazı
        </button>
      </div>

      <div className="bg-surface border border-border rounded-2xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-bg border-b border-border">
            <tr>
              <th className="text-left px-4 py-3 text-muted font-medium">Başlık</th>
              <th className="text-left px-4 py-3 text-muted font-medium">Slug</th>
              <th className="text-left px-4 py-3 text-muted font-medium">Durum</th>
              <th className="text-left px-4 py-3 text-muted font-medium">Tarih</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-bg transition-colors">
                <td className="px-4 py-3 font-medium max-w-xs truncate">{p.title}</td>
                <td className="px-4 py-3 text-muted">{p.slug}</td>
                <td className="px-4 py-3">
                  {p.is_published ? (
                    <span className="flex items-center gap-1 text-accent text-xs font-semibold"><Check className="w-3 h-3" /> Yayında</span>
                  ) : (
                    <span className="flex items-center gap-1 text-muted text-xs"><X className="w-3 h-3" /> Taslak</span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted text-xs">
                  {p.published_at ? new Date(p.published_at).toLocaleDateString("tr-TR") : "—"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-accent-soft rounded-lg text-muted hover:text-accent transition-colors"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => remove(p.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-muted hover:text-red-500 transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {posts.length === 0 && <p className="text-center text-muted py-12 text-sm">Henüz blog yazısı yok.</p>}
      </div>

      {modal.open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-surface rounded-2xl border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="font-display font-bold text-lg">{modal.editing ? "Düzenle" : "Yeni Yazı"}</h2>
              <button onClick={() => setModal({ open: false, editing: null })} className="text-muted hover:text-text"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4">
              {(["title", "slug", "author"] as const).map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium mb-1.5 capitalize">{field === "slug" ? "URL (slug)" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    value={form[field]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30"
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium mb-1.5">Özet</label>
                <textarea rows={2} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">İçerik (HTML)</label>
                <textarea rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} className="w-full bg-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/30 resize-none font-mono" />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="pub" checked={form.is_published} onChange={(e) => setForm({ ...form, is_published: e.target.checked })} className="w-4 h-4 accent-accent" />
                <label htmlFor="pub" className="text-sm font-medium">Yayınla</label>
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
