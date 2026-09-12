"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "motion/react";

export default function Loading() {
  const [dotCount, setDotCount] = useState(1);
  const loadingText = `Loading${".".repeat(dotCount)}`;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setDotCount((currentCount) =>
        currentCount === 3 ? 1 : currentCount + 1,
      );
    }, 350);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <main
      className="flex min-h-dvh flex-col items-center justify-center gap-3 bg-background text-foreground"
      aria-live="polite"
      aria-label="Loading"
    >
      <motion.div
        animate={{ rotate: [-10, 10, -10] }}
        transition={{
          duration: 1.4,
          ease: ["easeOut", "easeIn"],
          repeat: Infinity,
        }}
      >
        <Image
          src="/icons/icon-192x192.png"
          alt=""
          width={128}
          height={128}
          priority
          className="h-32 w-32 object-contain"
        />
      </motion.div>
      <p className="text-sm font-medium text-muted-foreground">{loadingText}</p>
    </main>
  );
}
