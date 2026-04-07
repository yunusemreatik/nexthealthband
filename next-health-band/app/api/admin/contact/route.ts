import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getAdminEmail } from "@/lib/adminAuth";
import { logActivity } from "@/lib/activityLog";

export async function GET() {
  const { data } = await supabaseAdmin.from("contact_info").select("*").limit(1).single();
  return NextResponse.json(data ?? {});
}

export async function PUT(request: NextRequest) {
  const email = await getAdminEmail();
  const body = await request.json();
  const { data: existing } = await supabaseAdmin.from("contact_info").select("id").limit(1).single();
  if (existing) {
    await supabaseAdmin.from("contact_info").update({ ...body, updated_at: new Date().toISOString() }).eq("id", existing.id);
  } else {
    await supabaseAdmin.from("contact_info").insert(body);
  }
  await logActivity(email!, "UPDATE", "contact_info");
  return NextResponse.json({ ok: true });
}
