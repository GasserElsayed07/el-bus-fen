"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import type { UserType } from "@/features/shared/models/user";

export default function UserStoreProvider({
  user,
  children,
}: {
  user: UserType;
  children: React.ReactNode;
}) {
  const setUser = useUserStore((state) => state.useUser);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(user);
    setReady(true);
  }, [user, setUser]);

  if (!ready) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
