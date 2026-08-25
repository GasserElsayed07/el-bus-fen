"use client";

import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function SecondPage({
  name,
  setName,
}: {
  name: string;
  setName: any;
}) {
  // const [name, setName] = useState("");
  // const { setUser } = useUserStore();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  return (
    <div>
      <Input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
}
