"use client";

import { useEffect, useState } from "react";
import { Users, FileText, HelpCircle, Activity, Mail } from "lucide-react";

interface DashboardData {
  totalLeads: number;
  unreadLeads: number;
  totalBlog: number;
  totalFaqs: number;
  totalFeatures: number;
  recentLeads: Array<{ id: number; name: string; email: string; created_at: string; is_read: boolean }>;
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/admin/dashboard").then((r) => r.json()).then(setData);
  }, []);

  if (!data) {
    return (
      <div className="p-8 flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const stats = [
    { label: "Toplam Talep", value: data.totalLeads, sub: `${data.unreadLeads} okunmadı`, icon: Users, color: "#2D7A4F" },
    { label: "Blog Yazısı", value: data.totalBlog, sub: "Yayınlı", icon: FileText, color: "#3B82F6" },
    { label: "SSS", value: data.totalFaqs, sub: "Aktif soru", icon: HelpCircle, color: "#F59E0B" },
    { label: "Band Özelliği", value: data.totalFeatures, sub: "Tanımlı", icon: Activity, color: "#6366F1" },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-muted text-sm mt-1">Next Health Band Yönetim Paneli</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, sub, icon: Icon, color }) => (
          <div key={label} className="bg-surface border border-border rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted font-medium">{label}</p>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                <Icon className="w-4.5 h-4.5" style={{ color }} />
              </div>
            </div>
            <p className="font-display text-3xl font-bold">{value}</p>
            <p className="text-xs text-muted mt-1">{sub}</p>
          </div>
        ))}
      </div>

      {/* Recent leads */}
      {data.recentLeads.length > 0 && (
        <div className="bg-surface border border-border rounded-2xl p-6">
          <h2 className="font-display font-bold text-lg mb-4 flex items-center gap-2">
            <Mail className="w-4 h-4 text-accent" /> Son Talepler
          </h2>
          <div className="space-y-3">
            {data.recentLeads.map((lead) => (
              <div key={lead.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="text-sm font-medium">{lead.name}</p>
                  <p className="text-xs text-muted">{lead.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted">
                    {new Date(lead.created_at).toLocaleDateString("tr-TR")}
                  </p>
                  {!lead.is_read && (
                    <span className="inline-block mt-1 w-2 h-2 rounded-full bg-accent" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
