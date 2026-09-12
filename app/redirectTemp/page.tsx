"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/features/shared/apis/getUser";
import Loading from "@/components/loading";

export default function AuthLoadingPage() {
  const router = useRouter();

  useEffect(() => {
    async function initializeUser() {
      const user = await getCurrentUser();

      if (!user) {
        router.replace("/login");
        return;
      }

      if (!user.onboarded) {
        router.replace("/onboarding");
      } else {
        router.replace("/");
      }
    }

    initializeUser();
  }, [router]);

  return <Loading />;
}
