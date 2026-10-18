import { isValidAdminSession, SESSION_COOKIE } from "@/src/lib/admin-session";

export async function hasAdminAccess(request: Request) {
  const token = request.headers
    .get("cookie")
    ?.split(";")
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${SESSION_COOKIE}=`))
    ?.slice(SESSION_COOKIE.length + 1);

  return token ? isValidAdminSession(token) : false;
}
