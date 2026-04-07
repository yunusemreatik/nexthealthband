import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getAdminEmail } from "@/lib/adminAuth";
import { logActivity } from "@/lib/activityLog";

export async function GET() {
  const { data } = await supabaseAdmin.from("seo_meta").select("*").order("page");
  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  const email = await getAdminEmail();
  const body = await request.json();
  const { data, error } = await supabaseAdmin
    .from("seo_meta")
    .upsert(body, { onConflict: "page" })
    .select()
    .single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await logActivity(email!, "UPSERT", "seo_meta", data?.id);
  return NextResponse.json(data);
}
