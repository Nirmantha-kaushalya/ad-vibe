import { jwtVerify, SignJWT } from "jose";

export const ADMIN_ID = "primary-admin";
export const SESSION_COOKIE = "session";
export const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 7;

const issuer = "ad-vibe-admin";
const audience = "ad-vibe-admin-panel";

function getSessionSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret || Buffer.byteLength(secret, "utf8") < 32) {
    throw new Error("JWT_SECRET must be configured with at least 32 bytes.");
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminSession() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(ADMIN_ID)
    .setIssuer(issuer)
    .setAudience(audience)
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSessionSecret());
}

export async function isValidAdminSession(token: string) {
  const secret = getSessionSecret();

  try {
    const { payload } = await jwtVerify(token, secret, { issuer, audience });
    return payload.sub === ADMIN_ID && payload.role === "admin";
  } catch {
    return false;
  }
}
