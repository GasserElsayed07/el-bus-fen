"use server";

import { getAuthCookie } from "@/features/login/utils/cookies";
import { getUserByFilter } from "@/features/shared/repositories/user-repo";

export async function getCurrentUser() {
  const auth = await getAuthCookie();

  if (!auth) {
    return null;
  }

  const user = await getUserByFilter({
    _id: auth.userId,
  });

  return user;
}
