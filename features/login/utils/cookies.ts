"use server";
import { cookies } from "next/headers";
import { createJWT, verifyJWT } from "./jwt";
// import { UserDocument } from "@/shared/models/user";

export async function saveAuthCookie(user: any) {
  const token = await createJWT(user._id.toString());

  const cookieStore = await cookies();

  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function getAuthCookie() {
  const cookieStore = await cookies();
  const authCookie = await cookieStore.get("auth-token");
  if (!authCookie) return null;
  return verifyJWT(authCookie.value);
}
