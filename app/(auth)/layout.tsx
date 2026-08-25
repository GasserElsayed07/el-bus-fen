import { redirect } from "next/navigation";
import { getAuthCookie } from "@/features/login/utils/cookies";
import { getUserByFilter } from "@/features/shared/repositories/user-repo";
import UserStoreProvider from "@/store/UserStoreProvider";

export default async function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuthCookie();

  if (!auth) {
    redirect("/login");
  }

  const user = await getUserByFilter({
    _id: auth.userId,
  });

  if (!user) {
    redirect("/login");
  }

  return <UserStoreProvider user={user}>{children}</UserStoreProvider>;
}
