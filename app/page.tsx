"use client";
import Map from "@/features/map/Map";
import { useUserStore } from "@/store/userStore";
import { useEffect } from "react";
import { getAuthCookie } from "@/features/login/utils/cookies";
import { getUserByFilter } from "@/shared/repositories/user-repo";

export default function Home() {
  const setUser = useUserStore((state) => state.useUser);

  useEffect(() => {
    // Example of setting a user (replace with actual user data)
    async function manga() {
      console.log("I fired manga");
      const authCookie = await getAuthCookie();
      console.log("decoded authCookie", authCookie);
      const user = await getUserByFilter({ _id: authCookie?.userId });
      console.log("user", user, typeof user);
      setUser(user);
    }
    manga();
  }, []);

  return <Map />;
}
