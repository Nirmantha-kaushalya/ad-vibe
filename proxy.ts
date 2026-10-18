import { NextResponse, type NextRequest } from "next/server";

import { isValidAdminSession, SESSION_COOKIE } from "@/src/lib/admin-session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage =
    pathname.startsWith("/admin") &&
    pathname !== "/admin/login" &&
    pathname !== "/admin/forgot-password" &&
    !pathname.startsWith("/admin/reset-password/");
  const isProtectedApi =
    pathname === "/api/works"
      ? request.method !== "GET"
      : pathname.startsWith("/api/works/") ||
        pathname === "/api/upload" ||
        pathname.startsWith("/api/upload/") ||
        pathname.startsWith("/api/contact/");

  if (!isAdminPage && !isProtectedApi) {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  if (token && (await isValidAdminSession(token))) {
    return NextResponse.next();
  }

  if (isProtectedApi) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.redirect(new URL("/admin/login", request.url));
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/works/:path*",
    "/api/upload/:path*",
    "/api/contact/:path*",
  ],
};
