import { useState } from "react";
import { marker } from "./types";
import { kourneshStops } from "../shared/data/busStops";

const dummyMarker = {
  hour: 7,
  minutes: 21,
  lat: 31.253032,
  long: 29.972749,
};

export function createMarkers(
  busStops: Array<{ lat: number; long: number }>,
): marker[] {
  const startMinutes = 6 * 60 + 30;

  return busStops.map((busStop, index) => {
    const markerMinutes = startMinutes - index;

    return {
      lat: busStop.lat,
      long: busStop.long,
      hour: Math.floor(markerMinutes / 60),
      minutes: markerMinutes % 60,
    };
  });
}

export function useMap() {
  const [entries, setEntries] = useState<marker[]>([dummyMarker]);
  const [busStopMarkers, setBusStopMarkers] = useState<marker[]>(
    createMarkers(kourneshStops),
  );

  const [selectedMarker, setSelectedMarker] = useState<marker | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return {
    busStopMarkers,
    setBusStopMarkers,
    selectedMarker,
    setSelectedMarker,
    entries,
    setEntries,
    dialogOpen,
    setDialogOpen,
  };
}
