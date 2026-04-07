"use client";

import { useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";

interface Lead { id: number; name: string; email: string; phone: string | null; message: string | null; source: string; is_read: boolean; created_at: string; }

export default function AdminTaleplerPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  async function load() { const r = await fetch("/api/admin/leads"); setLeads(await r.json()); }
  useEffect(() => { load(); }, []);

  async function markRead(id: number) {
    await fetch(`/api/admin/leads/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ is_read: true }) });
    await load();
  }

  async function remove(id: number) {
    if (!confirm("Silmek istiyor musunuz?")) return;
    await fetch(`/api/admin/leads/${id}`, { method: "DELETE" });
    await load();
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">İletişim Talepleri</h1>
        <p className="text-muted text-sm mt-1">{leads.filter((l) => !l.is_read).length} okunmadı</p>
      </div>

      <div className="space-y-3">
        {leads.map((l) => (
          <div key={l.id} className={`bg-surface border rounded-2xl p-5 ${!l.is_read ? "border-accent/40 bg-accent-soft/30" : "border-border"}`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-semibold text-sm">{l.name}</p>
                  {!l.is_read && <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted">{l.email} {l.phone && `• ${l.phone}`}</p>
                {l.message && <p className="text-sm text-text mt-3 leading-relaxed">{l.message}</p>}
                <p className="text-xs text-muted mt-2">
                  {new Date(l.created_at).toLocaleString("tr-TR")} · {l.source}
                </p>
              </div>
              <div className="flex gap-2">
                {!l.is_read && (
                  <button onClick={() => markRead(l.id)} title="Okundu işaretle" className="p-2 hover:bg-accent-soft rounded-xl text-muted hover:text-accent transition-colors">
                    <Check className="w-4 h-4" />
                  </button>
                )}
                <button onClick={() => remove(l.id)} className="p-2 hover:bg-red-50 rounded-xl text-muted hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {leads.length === 0 && <p className="text-center text-muted py-12 text-sm">Henüz talep yok.</p>}
      </div>
    </div>
  );
}
