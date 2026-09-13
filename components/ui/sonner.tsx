"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="top-center"
      toastOptions={{
        classNames: {
          success:
            "!border-emerald-600 !bg-emerald-600 !text-white [&>button]:!text-white",
        },
      }}
    />
  );
}
