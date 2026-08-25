"use server";
import { cookies } from "next/headers";
import { createJWT, verifyJWT } from "./jwt";
// import { UserDocument } from "@/shared/models/user";

export async function saveAuthCookie(user: any) {
  const userId =
    typeof user === "string" || typeof user === "number"
      ? user.toString()
      : (user?._id?.toString?.() ?? user?.id?.toString?.());

  if (!userId) {
    throw new Error("saveAuthCookie requires a user id or user object.");
  }

  const token = await createJWT(userId);

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
  console.time("cookies");

  const cookieStore = await cookies();

  console.timeEnd("cookies");

  console.time("get cookie");

  const authCookie = cookieStore.get("auth-token");

  console.timeEnd("get cookie");

  if (!authCookie) return null;

  return verifyJWT(authCookie.value);
}
