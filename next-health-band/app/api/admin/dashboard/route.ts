import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const [leads, blog, faqs, features] = await Promise.all([
    supabaseAdmin.from("leads").select("id, created_at, name, email, is_read").order("created_at", { ascending: false }).limit(5),
    supabaseAdmin.from("blog_posts").select("id", { count: "exact" }),
    supabaseAdmin.from("faqs").select("id", { count: "exact" }),
    supabaseAdmin.from("band_features").select("id", { count: "exact" }),
  ]);

  const leadsCount = await supabaseAdmin.from("leads").select("id", { count: "exact" });
  const unreadCount = await supabaseAdmin.from("leads").select("id", { count: "exact" }).eq("is_read", false);

  return NextResponse.json({
    totalLeads: leadsCount.count ?? 0,
    unreadLeads: unreadCount.count ?? 0,
    totalBlog: blog.count ?? 0,
    totalFaqs: faqs.count ?? 0,
    totalFeatures: features.count ?? 0,
    recentLeads: leads.data ?? [],
  });
}
