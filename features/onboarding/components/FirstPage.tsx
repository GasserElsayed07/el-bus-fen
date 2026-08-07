"use client";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { kourneshStops } from "@/shared/data/busStops";
import { useMemo, useState } from "react";
import StopsSelector from "@/shared/components/StopsSelector";

export default function FirstPage({
  selectedStop,
  setSelectedStop,
}: {
  selectedStop: string | null;
  setSelectedStop: any;
}) {
  return (
    <div className="flex flex-col justify-between items-center relative h-full w-full">
      <h1 className="absolute -top-60 text-xl font-bold">
        Choose your route and bus stop
      </h1>
      <div className="flex flex-col gap-2">
        <StopsSelector
          className="w-49"
          text="Select a route"
          selected={selectedStop}
          setSelected={setSelectedStop}
          options={kourneshStops}
        />
        <StopsSelector
          className="w-49"
          text="Select a stop"
          selected={selectedStop}
          setSelected={setSelectedStop}
          options={kourneshStops}
        />
      </div>
    </div>
  );
}
