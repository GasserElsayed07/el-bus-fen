"use server";

import { type UserType } from "@/features/shared/models/user";
import {
  getUserByFilter,
  addUser,
} from "@/features/shared/repositories/user-repo";
import { verifyGoogleToken } from "../utils/jwt";
import { saveAuthCookie } from "../utils/cookies";
import { redirect } from "next/navigation";

export async function Login({
  authType,
  credential,
}: {
  authType: "google" | "password";
  credential: string;
}) {
  if (authType === "google") {
    const payload = await verifyGoogleToken(credential);

    let user = await getUserByFilter({
      email: payload.email,
    });

    if (!user) {
      const newUser: UserType = {
        email: payload.email,
        name: payload.name,
        onboarded: false,
      };

      user = await addUser(newUser);
    }

    // Always save the authenticated user
    await saveAuthCookie(user);

    redirect("/redirectTemp");
  }
}
