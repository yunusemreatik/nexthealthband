import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function GET() {
  const { data } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });
  return NextResponse.json(data ?? []);
}
