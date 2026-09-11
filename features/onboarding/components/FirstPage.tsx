"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { kourneshStops } from "@/features/shared/data/busStops";
import { busRoutes } from "@/features/shared/data/routes";
import type { Dispatch, SetStateAction } from "react";

export default function FirstPage({
  selectedStop,
  setSelectedStop,
  selectedRoute,
  setSelectedRoute,
}: {
  selectedStop: string | null;
  setSelectedStop: Dispatch<SetStateAction<string | null>>;
  selectedRoute: string | null;
  setSelectedRoute: Dispatch<SetStateAction<string | null>>;
}) {
  const selectedStopName = kourneshStops.find(
    (stop) => stop.id === selectedStop,
  )?.name_en;

  return (
    <div className="flex flex-col justify-between items-center relative h-full w-full">
      <h1 className="absolute -top-60 text-xl font-bold">
        Choose your route and bus stop
      </h1>
      <div className="flex flex-col gap-2">
        <Select value={selectedRoute ?? ""} onValueChange={setSelectedRoute}>
          <SelectTrigger className="w-49">
            <SelectValue placeholder="Select a route" />
          </SelectTrigger>
          <SelectContent>
            {busRoutes.map((route) => (
              <SelectItem key={route.name_en} value={route.name_en}>
                {route.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedStop ?? ""} onValueChange={setSelectedStop}>
          <SelectTrigger className="w-49">
            <SelectValue placeholder="Select a stop">
              {selectedStopName ?? "Select a stop"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {kourneshStops.map((stop) => (
              <SelectItem key={stop.id} value={stop.id}>
                {stop.order}. {stop.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
