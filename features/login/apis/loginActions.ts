"use server";
import { UserDocument } from "@/shared/models/user";
import { verifyGoogleToken } from "../utils/jwt";
import { getUserByFilter, addUser } from "@/shared/repositories/user-repo";
import { saveAuthCookie } from "../utils/cookies";
import { redirect } from "next/navigation";

export async function Login({
  authType,
  credential,
}: {
  authType: "google" | "password";
  credential: string;
}) {
  // based on the auth type, it would login (for now only google login)
  if (authType == "google") {
    // 1. verify google token
    const payload = await verifyGoogleToken(credential);
    console.log("The payload", payload);
    // 2. check if a user already exists with this email
    const user = await getUserByFilter({ email: payload.email });
    if (user) {
      // 2.1 create a jwt token and save it in cookies
      console.log("user._id:", user._id);
      await saveAuthCookie(user);
    } else {
      // 3. if not, create a new user with this email
      const newUser: UserDocument = {
        email: payload.email,
        name: payload.name,
        onboarded: false,
      };
      await addUser(newUser);
    }
    if (user.onboarded == false) {
      // redirect the user to the onboarding page
      redirect("/onboarding");
    } else if (user.onboarded) {
      redirect("/");
    }
  }
}
