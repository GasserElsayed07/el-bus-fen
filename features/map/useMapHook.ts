import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { updateUserWithCustomFields } from "@/features/shared/repositories/user-repo";
import { entry, marker } from "./types";
import { kourneshStops } from "../shared/data/busStops";
import {
  addBusEntry,
  getLastSevenHoursBusEntries,
} from "../shared/repositories/bus-entry-repo";
import { toast } from "sonner";
import { useCallback } from "react";
import { useWebSocket } from "@/features/shared/useWebSocket";

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
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.useUser);

  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSyncedBusStopRef = useRef<string | null>(user?.busStopId ?? null);
  const userRef = useRef(user);

  // The one WebSocket connection owned by this hook
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const [entries, setEntries] = useState<entry[]>([]);

  const [busStopMarkers, setBusStopMarkers] = useState<marker[]>(
    createMarkers(kourneshStops),
  );

  const [selectedBusStop, setSelectedBusStop] = useState<string | null>(
    () => user?.busStopId ?? null,
  );

  const [selectedEntry, setSelectedEntry] = useState<entry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mergeEntries = useCallback((incomingEntries: entry[]) => {
    setEntries((currentEntries) => {
      const currentIds = new Set(
        currentEntries
          .map((currentEntry) => currentEntry.id)
          .filter((id): id is string => Boolean(id)),
      );

      return [
        ...currentEntries,
        ...incomingEntries.filter(
          (incomingEntry) =>
            !incomingEntry.id || !currentIds.has(incomingEntry.id),
        ),
      ];
    });
  }, []);

  // Sync selected bus stop to the user
  useEffect(() => {
    const currentUser = userRef.current;

    if (!selectedBusStop || !currentUser?._id) {
      return;
    }

    if (selectedBusStop === lastSyncedBusStopRef.current) {
      return;
    }

    lastSyncedBusStopRef.current = selectedBusStop;

    setUser({
      ...currentUser,
      busStopId: selectedBusStop,
    });

    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = setTimeout(() => {
      void updateUserWithCustomFields(
        { busStopId: selectedBusStop },
        currentUser._id,
      );
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveTimeoutRef.current = null;
      }
    };
  }, [selectedBusStop, setUser]);

  const handleWebSocketMessage = useCallback(
    (event: MessageEvent) => {
      const message = JSON.parse(event.data);

      if (message.type !== "newEntry") {
        return;
      }

      const newEntry: entry = message.entry;

      mergeEntries([newEntry]);
    },
    [mergeEntries],
  );

  const handleWebSocketReconnect = useCallback(async () => {
    const recentEntries = await getLastSevenHoursBusEntries();
    const syncedEntries = (recentEntries ?? [])
      .filter((recentEntry) => recentEntry.busRoute === user?.busRoute)
      .flatMap((recentEntry) => {
        const entryTime = new Date(String(recentEntry.time));

        if (Number.isNaN(entryTime.getTime())) {
          return [];
        }

        return [
          {
            lat: recentEntry.lat,
            long: recentEntry.long,
            hour: entryTime.getHours() % 12 || 12,
            minutes: entryTime.getMinutes(),
            amPm: entryTime.getHours() >= 12 ? "PM" : "AM",
            busStop: recentEntry.busStop,
            busRoute: recentEntry.busRoute,
            id: recentEntry._id ? String(recentEntry._id) : undefined,
          },
        ];
      });

    mergeEntries(syncedEntries);
  }, [mergeEntries, user?.busRoute]);

  const { send } = useWebSocket(handleWebSocketMessage, {
    onReconnect: handleWebSocketReconnect,
  });

  async function submitEntry(
    selectedHour: string | undefined,
    selectedMinute: string | undefined,
    selectedAmPm: string | undefined,
  ): Promise<void> {
    const selectedStopDetails =
      kourneshStops.find((stop) => stop.id === selectedBusStop) ?? null;

    if (!selectedStopDetails) {
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("I fired submitEntry", {
        selectedHour,
        selectedMinute,
        selectedBusStop,
        selectedStopDetails,
      });

      const newEntry: entry = {
        hour: Number(selectedHour ?? 0),
        minutes: Number(selectedMinute ?? 0),
        amPm: selectedAmPm,
        lat: Number(selectedStopDetails.lat ?? 0),
        long: Number(selectedStopDetails.long ?? 0),
        busStop: selectedBusStop as string,
        busRoute: user?.busRoute,
      };

      const newBusEntry = await addBusEntry({
        userId: user?._id ?? "",
        selectedHour: selectedHour ?? "",
        selectedMinute: selectedMinute ?? "",
        selectedAmPm: selectedAmPm ?? "",
        busRoute: user?.busRoute,
        busStop: selectedBusStop as string,
        lat: newEntry.lat,
        long: newEntry.long,
      });

      if (!newBusEntry) {
        return;
      }

      const entryWithIdentity: entry = {
        ...newEntry,
        id: newBusEntry._id ? String(newBusEntry._id) : undefined,
      };

      console.log("entry log created:", newBusEntry);

      send({
        type: "newEntry",
        entry: entryWithIdentity,
      });

      // Show the entry immediately to the user who submitted it
      mergeEntries([entryWithIdentity]);
      toast.success("Submitted successfully!");
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
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
    isSubmitting,
    submitEntry,
  };
}
