import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { createSessionToken, setSessionCookie, clearSessionCookie, getAdminEmail } from "@/lib/adminAuth";
import { checkRateLimit, resetRateLimit } from "@/lib/rateLimit";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for") ?? "unknown";
  const { allowed, retryAfter } = checkRateLimit(ip);

  if (!allowed) {
    return NextResponse.json(
      { error: `Çok fazla deneme. ${retryAfter} saniye bekleyin.` },
      { status: 429 }
    );
  }

  const body = await request.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ error: "E-posta ve şifre gerekli" }, { status: 400 });
  }

  const { data: admin } = await supabaseAdmin
    .from("admin_users")
    .select("email, password_hash")
    .eq("email", email.toLowerCase().trim())
    .single();

  if (!admin) {
    return NextResponse.json({ error: "Geçersiz e-posta veya şifre" }, { status: 401 });
  }

  const valid = await bcrypt.compare(password, admin.password_hash);
  if (!valid) {
    return NextResponse.json({ error: "Geçersiz e-posta veya şifre" }, { status: 401 });
  }

  resetRateLimit(ip);
  const token = await createSessionToken(admin.email);
  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}

export async function GET() {
  const email = await getAdminEmail();
  if (!email) return NextResponse.json({ authenticated: false }, { status: 401 });
  return NextResponse.json({ authenticated: true, email });
}

export async function DELETE() {
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
