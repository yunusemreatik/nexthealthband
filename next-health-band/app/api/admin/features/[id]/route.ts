import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getAdminEmail } from "@/lib/adminAuth";
import { logActivity } from "@/lib/activityLog";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const email = await getAdminEmail();
  const body = await request.json();
  const { error } = await supabaseAdmin.from("band_features").update(body).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await logActivity(email!, "UPDATE", "band_features", id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const email = await getAdminEmail();
  const { error } = await supabaseAdmin.from("band_features").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await logActivity(email!, "DELETE", "band_features", id);
  return NextResponse.json({ ok: true });
}
