import { createRemoteJWKSet, jwtVerify, SignJWT } from "jose";

const JWKS = createRemoteJWKSet(
  new URL("https://www.googleapis.com/oauth2/v3/certs"),
);

interface GooglePayload {
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  picture?: string;
}

export async function verifyGoogleToken(token: string) {
  const { payload } = await jwtVerify(token, JWKS, {
    audience: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    issuer: ["https://accounts.google.com", "accounts.google.com"],
  });

  return payload as unknown as GooglePayload;
}

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createJWT(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

interface AuthPayload {
  userId: string;
}

export async function verifyJWT(token: string): Promise<AuthPayload> {
  const { payload } = await jwtVerify(token, secret);

  if (typeof payload.userId !== "string") {
    throw new Error("Invalid auth token.");
  }

  return {
    userId: payload.userId,
  };
}
