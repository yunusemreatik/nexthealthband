import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getAdminEmail } from "@/lib/adminAuth";
import { logActivity } from "@/lib/activityLog";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { data } = await supabaseAdmin.from("blog_posts").select("*").eq("id", id).single();
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(data);
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const email = await getAdminEmail();
  const body = await request.json();
  const { error } = await supabaseAdmin.from("blog_posts").update(body).eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await logActivity(email!, "UPDATE", "blog_posts", id);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const email = await getAdminEmail();
  const { error } = await supabaseAdmin.from("blog_posts").delete().eq("id", id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await logActivity(email!, "DELETE", "blog_posts", id);
  return NextResponse.json({ ok: true });
}
