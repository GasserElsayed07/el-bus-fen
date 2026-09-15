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
import { MapPin } from "lucide-react";

export default function FirstPage({
  selectedStop,
  setSelectedStop,
  selectedRoute,
  setSelectedRoute,
  showRouteWarning,
  showStopWarning,
}: {
  selectedStop: string | null;
  setSelectedStop: Dispatch<SetStateAction<string | null>>;
  selectedRoute: string | null;
  setSelectedRoute: (route: string | null) => void;
  showRouteWarning: boolean;
  showStopWarning: boolean;
}) {
  const selectedStopName = kourneshStops.find(
    (stop) => stop.id === selectedStop,
  )?.name_en;

  return (
    <div className="flex w-full max-w-md flex-col items-center px-6 py-10 text-center">
      {/* <div className="mb-8 flex size-14 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground shadow-sm">
        <BusFront className="size-7" aria-hidden="true" />
      </div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
        Your daily route
      </p> */}
      <h1 className="text-3xl font-bold tracking-tight text-foreground">
        Choose your route and stop
      </h1>
      {/* <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
        Pick where you ride so bus updates feel personal to you.
      </p> */}

      <div className="mt-8 flex w-full flex-col gap-5 text-left">
        <div className="space-y-2">
          <label htmlFor="route-select" className="text-sm font-medium">
            Route <span className="text-destructive">*</span>
          </label>
          <Select value={selectedRoute ?? ""} onValueChange={setSelectedRoute}>
            <SelectTrigger
              id="route-select"
              aria-invalid={showRouteWarning}
              className="h-11 w-full bg-card px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
            >
              <SelectValue placeholder="Select a route" />
            </SelectTrigger>
            <SelectContent>
              {busRoutes.map((route) => {
                const isAvailable = route.name_en === "Kournesh";

                return (
                  <SelectItem
                    key={route.name_en}
                    value={route.name_en}
                    disabled={!isAvailable}
                  >
                    <span>{route.name_en}</span>
                    {!isAvailable && (
                      <span className="ml-auto text-xs text-muted-foreground">
                        Coming soon
                      </span>
                    )}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Kournesh is available now. More routes are on the way.
          </p>
          {showRouteWarning && (
            <p className="text-xs font-medium text-destructive" role="alert">
              Please choose a route to continue.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="stop-select" className="text-sm font-medium">
            Bus stop <span className="text-destructive">*</span>
          </label>
          <Select
            value={selectedStop ?? ""}
            onValueChange={setSelectedStop}
            disabled={!selectedRoute}
          >
            <SelectTrigger
              id="stop-select"
              aria-invalid={showStopWarning}
              className="h-11 w-full bg-card px-3 aria-invalid:border-destructive aria-invalid:ring-destructive/20"
            >
              <SelectValue placeholder="Select a stop">
                {selectedStopName ?? "Select a stop"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {kourneshStops.map((stop) => (
                <SelectItem key={stop.id} value={stop.id}>
                  <MapPin
                    className="size-4 text-muted-foreground"
                    aria-hidden="true"
                  />
                  {stop.order}. {stop.name_en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {!selectedRoute && (
            <p className="text-xs text-muted-foreground">
              Select a route first to see its stops.
            </p>
          )}
          {showStopWarning && (
            <p className="text-xs font-medium text-destructive" role="alert">
              Please choose a bus stop to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
