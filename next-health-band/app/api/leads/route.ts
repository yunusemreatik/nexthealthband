import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  message: z.string().max(1000).optional(),
  source: z.string().max(50).optional(),
});

const rateLimit = new Map<string, number>();

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") || "unknown";
  const now = Date.now();
  const lastCall = rateLimit.get(ip) || 0;
  
  if (now - lastCall < 60_000) {
    return NextResponse.json({ error: "Lütfen mesaj göndermeden önce 1 dakika bekleyin." }, { status: 429 });
  }
  rateLimit.set(ip, now);

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Geçersiz form verisi" }, { status: 400 });
  }

  const { name, email, phone, message, source } = parsed.data;

  const { error } = await supabaseAdmin.from("leads").insert({
    name,
    email,
    phone: phone ?? null,
    message: message ?? null,
    source: source ?? "contact_form",
  });

  if (error) {
    return NextResponse.json({ error: "Kayıt hatası" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
