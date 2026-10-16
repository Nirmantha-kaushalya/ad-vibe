import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const secret = new TextEncoder().encode(process.env.JWT_SECRET ?? "development-secret");

async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get("session")?.value;

  if (!token) {
    return false;
  }

  try {
    await jwtVerify(token, secret);
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminPage = pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !pathname.startsWith("/admin/forgot-password") && !pathname.startsWith("/admin/reset-password");
  const isProtectedApi = pathname.startsWith("/api/works") || pathname.startsWith("/api/upload") || pathname.startsWith("/api/contact") || pathname.startsWith("/api/auth/logout");

  if ((isAdminPage || isProtectedApi) && !(await isAuthenticated(request))) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/works/:path*", "/api/upload/:path*", "/api/contact/:path*", "/api/auth/logout"],
};
