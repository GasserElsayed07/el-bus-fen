"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import EntryForm from "./components/EntryForm";
import { useMap } from "./useMapHook";
import { getMinutesAgo } from "./utils";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Markers from "./components/Markers";

export default function Map() {
  const {
    markers,
    setMarkers,
    selectedMarker,
    setSelectedMarker,
    dialogOpen,
    setDialogOpen,
  } = useMap();

  return (
    <div className="flex min-h-full flex-col items-center justify-center pb-2">
      <MapContainer
        className="h-100 w-full z-0"
        center={[31.250545425899407, 29.970028787218897]}
        zoom={14}
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Markers
          markers={markers}
          setSelectedMarker={setSelectedMarker}
          setDialogOpen={setDialogOpen}
        />
      </MapContainer>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="">
          <DialogHeader>
            <DialogTitle>Bus Report</DialogTitle>
          </DialogHeader>

          {selectedMarker && (
            <div className="space-y-3">
              <div>
                <span className="font-semibold">Reported by:</span> Ahmed
                Mohamed
              </div>

              <div>
                <span className="font-semibold">Time:</span>{" "}
                {selectedMarker.hour}:
                {selectedMarker.minutes.toString().padStart(2, "0")} AM
              </div>

              <div>
                <span className="font-semibold">Minutes ago:</span>{" "}
                {getMinutesAgo(selectedMarker)}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <EntryForm setMarkers={setMarkers} />
    </div>
  );
}
