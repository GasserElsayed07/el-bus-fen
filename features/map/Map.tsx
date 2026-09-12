"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import EntryForm from "./components/EntryForm";
import { useMap } from "./useMapHook";
import { getMinutesAgo } from "./utils";
import BottomNavbar from "@/features/bottom-navbar";
// import {socket} from "@/features/shared/socket";
import { createSocket } from "@/features/shared/socket";
import type { entry, marker } from "./types";
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
    selectedEntry,
    setSelectedEntry,
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
      const newEntries: entry[] = entryLogs
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

    const socket = createSocket();
    const handleIncomingEntry = (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message.type !== "newEntry") {
        return;
      }

      const newEntry: entry = message.marker;

      setEntries((prevEntries) => [...prevEntries, newEntry]);
    };

    socket.addEventListener("message", handleIncomingEntry);

    return () => {
      socket.removeEventListener("message", handleIncomingEntry);
      socket.close();
    };
  }, [entryLogs, setEntries, user?.busRoute]);

  useEffect(() => {
    const socket = createSocket();

    socket.addEventListener("open", () => {
      console.log("CONNECTED TO WEBSOCKET");
    });

    socket.addEventListener("message", (event) => {
      console.log("RECEIVED FROM SERVER:", event.data);
    });

    socket.addEventListener("close", () => {
      console.log("WEBSOCKET CLOSED");
    });

    socket.addEventListener("error", (error) => {
      console.error("WEBSOCKET ERROR:", error);
    });

    return () => {
      socket.close();
    };
  }, []);
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
            setSelectedEntry={setSelectedEntry}
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
                  {selectedEntry?.hour}:
                  {selectedEntry?.minutes.toString().padStart(2, "0")} AM
                </span>
              </DialogTitle>
            </DialogHeader>

            {selectedEntry && (
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">Reported by:</span>{" "}
                  {user?.name ?? "Unknown User"}
                </div>

                <div>
                  <span className="font-semibold">Bus Stop:</span>{" "}
                  {kourneshStops.find((stop) => stop.lat === selectedEntry.lat)
                    ?.name_en ?? "Unknown Stop"}
                </div>

                <div>
                  <span className="font-semibold">
                    {" "}
                    {getMinutesAgo(selectedEntry)} minutes ago
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
