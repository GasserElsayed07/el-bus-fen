"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import EntryForm from "./components/EntryForm";
import { useMap } from "./useMapHook";
import { getMinutesAgo } from "./utils";
import BottomNavbar from "@/features/bottom-navbar";
import type { entry } from "./types";
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
    selectedEntry,
    setSelectedEntry,
    entries,
    setEntries,
    dialogOpen,
    setDialogOpen,
    selectedBusStop,
    setSelectedBusStop,
    isSubmitting,
    submitEntry,
  } = useMap();

  const selectedBusStopData = kourneshStops.find(
    (stop) => stop.id === selectedBusStop,
  );

  const user = useUserStore((state) => state.user);

  // Process entries fetched from the database
  useEffect(() => {
    if (!entryLogs || entryLogs.length === 0 || !user?.busRoute) {
      return;
    }

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
            hour: entryTime.getHours() % 12 || 12,
            minutes: entryTime.getMinutes(),
            amPm: entryTime.getHours() >= 12 ? "PM" : "AM",
            busStop: entry.busStop,
            busRoute: entry.busRoute,
            id: entry._id ? String(entry._id) : undefined,
          },
        ];
      });

    setEntries((prevEntries) => {
      const existingIds = new Set(
        prevEntries
          .map((currentEntry) => currentEntry.id)
          .filter((id): id is string => Boolean(id)),
      );

      return [
        ...prevEntries,
        ...newEntries.filter(
          (newEntry) => !newEntry.id || !existingIds.has(newEntry.id),
        ),
      ];
    });
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
            setSelectedEntry={setSelectedEntry}
            setDialogOpen={setDialogOpen}
          />
        </MapContainer>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Bus Report
                <span className="font-normal">
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
                    {getMinutesAgo(selectedEntry)} minutes ago
                  </span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <EntryForm
          submitEntry={submitEntry}
          isSubmitting={isSubmitting}
          selectedStop={selectedBusStop}
          setSelectedStop={setSelectedBusStop}
        />
      </div>

      <BottomNavbar />
    </>
  );
}
