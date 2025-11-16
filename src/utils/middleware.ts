import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenPayload } from "@/utils/token";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  const payload = getTokenPayload(); // decode từ cookie hoặc localStorage
  const path = req.nextUrl.pathname;

  const roleId = payload?.roleId ? Number(payload.roleId) : 0;

if (path.startsWith("/auth/superadmin") && roleId !== 1) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
}

if (path.startsWith("/auth/admin") && roleId !== 2) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
}

if (path.startsWith("/auth/user") && roleId !== 3) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
}


  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*"],
};
