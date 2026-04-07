import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { verifySessionToken } from "./lib/adminAuth";

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin API routes — check session token
  if (pathname.startsWith("/api/admin")) {
    const token = request.cookies.get("nhb_admin_token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const email = await verifySessionToken(token);
    if (!email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.next();
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    "/api/admin/:path*",
    "/((?!api|_next/static|_next/image|favicon.ico|logo|images|icons).*)",
  ],
};
