"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import EntryForm from "./components/EntryForm";
import { useMap } from "./useMapHook";
import { getMinutesAgo } from "./utils";
import BottomNavbar from "@/features/bottom-navbar";
import { socket } from "@/features/shared/socket";
import type { marker } from "./types";
import type { BusEntryType } from "@/features/shared/models/bus-entry";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Markers from "./components/Markers";

export default function Map({ entryLogs }: { entryLogs: BusEntryType[] }) {
  const {
    busStopMarkers,
    setBusStopMarkers,
    selectedMarker,
    setSelectedMarker,
    entries,
    setEntries,
    dialogOpen,
    setDialogOpen,
    selectedBusStop,
    setSelectedBusStop,
    submitEntry,
  } = useMap();

  useEffect(() => {
    console.log(
      "Initial entry logs:",
      entryLogs,
      entryLogs && entryLogs.length > 0,
    );

    if (entryLogs && entryLogs.length > 0) {
      const newEntries: marker[] = entryLogs.flatMap((entry) => {
        const entryTime = new Date(String(entry.time));

        if (Number.isNaN(entryTime.getTime())) {
          console.error("Skipping bus entry with an invalid time:", entry);
          return [];
        }

        return [
          {
            lat: entry.lat,
            long: entry.long,
            hour: entryTime.getHours(),
            minutes: entryTime.getMinutes(),
          },
        ];
      });
      console.log("Adding new entries to state:", newEntries);
      setEntries((prevEntries) => [...prevEntries, ...newEntries]);
    }
    const handleIncomingEntry = (newMarker: marker) => {
      console.log("Received new entry:", newMarker);
      setEntries((prevEntries) => [...prevEntries, newMarker]);
    };

    socket.on("newEntry", handleIncomingEntry);

    return () => {
      socket.off("newEntry", handleIncomingEntry);
    };
  }, []);
  return (
    <>
      <div className="flex h-[calc(100dvh-var(--bottom-navbar-height))] flex-col items-center justify-between pb-2">
        <MapContainer
          className="h-100 w-full z-0"
          center={[31.250545425899407, 29.970028787218897]}
          zoom={14}
        >
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Markers
            markers={busStopMarkers}
            entries={entries}
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

        <EntryForm
          submitEntry={submitEntry}
          selectedStop={selectedBusStop}
          setSelectedStop={setSelectedBusStop}
        />
      </div>
      <BottomNavbar />
    </>
  );
}
