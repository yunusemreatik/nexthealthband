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
    .update({ ...body, updated_at: new Date().toISOString() })
    .eq("id", 1);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await logActivity(email!, "UPDATE", "hero_sections", 1);
  return NextResponse.json({ ok: true });
}
