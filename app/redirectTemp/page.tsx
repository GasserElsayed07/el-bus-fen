"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { getCurrentUser } from "@/features/shared/apis/getUser";

export default function AuthLoadingPage() {
  const router = useRouter();
  // const setUser = useUserStore((state) => state.useUser);

  useEffect(() => {
    async function initializeUser() {
      const user = await getCurrentUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      // setUser(user);

      if (!user.onboarded) {
        router.replace("/onboarding");
      } else {
        router.replace("/");
      }
    }

    initializeUser();
  }, [router]);

  return <div>RedirectTemp: Loading...</div>;
}
