"use client";

import { Input } from "@/components/ui/input";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { useUserStore } from "@/store/userStore";

export default function SecondPage({
  name,
  setName,
}: {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}) {
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  return (
    <div className="flex w-full max-w-md flex-col px-6 py-10">
      {/* <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Almost there
      </p> */}
      <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
        What should we call you?
      </h1>
      {/* <p className="mt-3 text-sm leading-6 text-muted-foreground">
        Add a username so your bus updates feel a little more personal.
      </p> */}

      <div className="mt-8 space-y-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <Input
          id="username"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Enter your username"
          autoComplete="name"
          className="h-11 bg-card px-3"
        />
      </div>
    </div>
  );
}
