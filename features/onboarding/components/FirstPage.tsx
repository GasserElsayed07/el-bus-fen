"use client";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { kourneshStops } from "@/features/shared/data/busStops";
import { useMemo, useState } from "react";
import StopsSelector from "@/features/shared/components/StopsSelector";
import { busRoutes } from "@/features/shared/data/routes";

export default function FirstPage({
  selectedStop,
  setSelectedStop,
  selectedRoute,
  setSelectedRoute,
}: {
  selectedStop: string | null;
  setSelectedStop: any;
  selectedRoute: string | null;
  setSelectedRoute: any;
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
          selected={selectedRoute}
          setSelected={setSelectedRoute}
          options={busRoutes}
          route={true}
        />
        <StopsSelector
          className="w-49"
          text="Select a stop"
          selected={selectedStop}
          setSelected={setSelectedStop}
          options={kourneshStops}
          route={false}
        />
      </div>
    </div>
  );
}
