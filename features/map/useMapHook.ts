import { useState } from "react";
import { marker } from "./types";

const dummyMarker = {
  hour: 7,
  minutes: 21,
  lat: 31.253032,
  long: 29.972749,
};

export function useMap() {
  const [markers, setMarkers] = useState<marker[]>([dummyMarker]);

  const [selectedMarker, setSelectedMarker] = useState<marker | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  return {
    markers,
    setMarkers,
    selectedMarker,
    setSelectedMarker,
    dialogOpen,
    setDialogOpen,
  };
}
