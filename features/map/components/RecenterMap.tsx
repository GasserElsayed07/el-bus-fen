"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import type { stop } from "@/features/shared/data/busStops";

export default function RecenterMap({ stop }: { stop?: stop }) {
  const map = useMap();

  useEffect(() => {
    if (!stop) {
      return;
    }

    map.flyTo([stop.lat, stop.long], map.getZoom(), {
      animate: true,
      duration: 0.8,
    });
  }, [map, stop]);

  return null;
}
