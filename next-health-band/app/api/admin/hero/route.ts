import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getAdminEmail } from "@/lib/adminAuth";
import { logActivity } from "@/lib/activityLog";

export async function GET() {
  const { data } = await supabaseAdmin.from("hero_sections").select("*").limit(1).single();
  return NextResponse.json(data ?? {});
}

export async function PUT(request: NextRequest) {
  const email = await getAdminEmail();
  const body = await request.json();
  const { error } = await supabaseAdmin
    .from("hero_sections")
    .upsert({ id: 1, ...body, updated_at: new Date().toISOString() }, { onConflict: "id" });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await logActivity(email!, "UPSERT", "hero_sections", 1);
  return NextResponse.json({ ok: true });
}
