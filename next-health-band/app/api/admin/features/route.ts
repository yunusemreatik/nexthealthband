import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { getAdminEmail } from "@/lib/adminAuth";
import { logActivity } from "@/lib/activityLog";

export async function GET() {
  const { data } = await supabaseAdmin
    .from("band_features")
    .select("*")
    .order("sort_order");
  return NextResponse.json(data ?? []);
}

export async function POST(request: NextRequest) {
  const email = await getAdminEmail();
  const body = await request.json();
  const { data, error } = await supabaseAdmin.from("band_features").insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  await logActivity(email!, "CREATE", "band_features", data.id);
  return NextResponse.json(data, { status: 201 });
}
