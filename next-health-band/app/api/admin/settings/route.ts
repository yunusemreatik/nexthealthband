import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getAdminEmail } from "@/lib/adminAuth";
import { logActivity } from "@/lib/activityLog";

export async function GET() {
  const { data } = await supabaseAdmin.from("site_settings").select("*");
  const obj: Record<string, string> = {};
  (data ?? []).forEach((row) => (obj[row.key] = row.value));
  return NextResponse.json(obj);
}

export async function PUT(request: NextRequest) {
  const email = await getAdminEmail();
  const body: Record<string, string> = await request.json();
  const rows = Object.entries(body).map(([key, value]) => ({
    key,
    value,
    updated_at: new Date().toISOString(),
  }));
  const { error } = await supabaseAdmin.from("site_settings").upsert(rows, { onConflict: "key" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await logActivity(email!, "UPDATE", "site_settings");
  return NextResponse.json({ ok: true });
}
