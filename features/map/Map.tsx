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
import RecenterMap from "./components/RecenterMap";
import { useUserStore } from "@/store/userStore";
import { kourneshStops } from "../shared/data/busStops";

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

  const selectedBusStopData = kourneshStops.find(
    (stop) => stop.id === selectedBusStop,
  );
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    if (entryLogs && entryLogs.length > 0 && user?.busRoute) {
      const newEntries: marker[] = entryLogs
        .filter((entry) => entry.busRoute === user.busRoute)
        .flatMap((entry) => {
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
              busRoute: entry.busRoute,
            },
          ];
        });
      setEntries((prevEntries) => [...prevEntries, ...newEntries]);
    }
    const handleIncomingEntry = (newMarker: marker) => {
      setEntries((prevEntries) => [...prevEntries, newMarker]);
    };

    socket.on("newEntry", handleIncomingEntry);

    return () => {
      socket.off("newEntry", handleIncomingEntry);
    };
  }, [entryLogs, setEntries, user?.busRoute]);
  return (
    <>
      <div className="flex h-[calc(100dvh-var(--bottom-navbar-height))] flex-col items-center justify-between pb-2">
        <MapContainer
          className="h-100 w-full z-0"
          center={[
            selectedBusStopData?.lat ?? 31.255502,
            selectedBusStopData?.long ?? 29.9773,
          ]}
          zoom={14}
        >
          <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <RecenterMap stop={selectedBusStopData} />

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
              <DialogTitle>
                Bus Report
                <span className="font-normal ">
                  {" - "}
                  {selectedMarker?.hour}:
                  {selectedMarker?.minutes.toString().padStart(2, "0")} AM
                </span>
              </DialogTitle>
            </DialogHeader>

            {selectedMarker && (
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Reported by:</span>{" "}
                  {user?.name ?? "Unknown User"}
                </div>

                <div>
                  <span className="font-semibold">Bus Stop:</span>{" "}
                  {kourneshStops.find((stop) => stop.lat === selectedMarker.lat)
                    ?.name_en ?? "Unknown Stop"}
                </div>

                <div>
                  <span className="font-semibold">
                    {" "}
                    {getMinutesAgo(selectedMarker)} minutes ago
                  </span>{" "}
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
