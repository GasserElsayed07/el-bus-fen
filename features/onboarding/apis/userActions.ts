"use server";
import { dbConnect } from "@/features/shared/dbConnect";
import { updateUserWithCustomFields } from "@/features/shared/repositories/user-repo";

export async function setUserAsOnboarded({ userId }: { userId: any }) {
  try {
    await dbConnect();
    const response = updateUserWithCustomFields({ onboarded: true }, userId);
    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.error("Failed to set the user as onboarded, error: ", error);
  }
}
