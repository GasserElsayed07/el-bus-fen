import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { updateUserWithCustomFields } from "@/features/shared/repositories/user-repo";
import { marker } from "./types";
import { kourneshStops } from "../shared/data/busStops";
// import { socket } from "@/features/shared/socket";
import { addBusEntry } from "../shared/repositories/bus-entry-repo";

// const dummyMarker = {
//   hour: 7,
//   minutes: 21,
//   lat: 31.253032,
//   long: 29.972749,
// };

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

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const [entries, setEntries] = useState<marker[]>([]);
  const [busStopMarkers, setBusStopMarkers] = useState<marker[]>(
    createMarkers(kourneshStops),
  );
  const [selectedBusStop, setSelectedBusStop] = useState<string | null>(
    () => user?.busStopId ?? null,
  );

  const [selectedMarker, setSelectedMarker] = useState<marker | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const currentUser = userRef.current;

    if (!selectedBusStop || !currentUser?._id) {
      return;
    }

    if (selectedBusStop === lastSyncedBusStopRef.current) {
      return;
    }

    lastSyncedBusStopRef.current = selectedBusStop;
    setUser({ ...currentUser, busStopId: selectedBusStop });

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

  async function submitEntry(
    selectedHour: string | undefined,
    selectedMinute: string | undefined,
    selectedAmPm: string | undefined,
  ) {
    const selectedStopDetails =
      kourneshStops.find((stop) => stop.id === selectedBusStop) ?? null;

    if (!selectedStopDetails) {
      return;
    }

    console.log(" I fired submitEntry", {
      selectedHour,
      selectedMinute,
      selectedBusStop,
      selectedStopDetails,
      // user,
    });

    const newMarker: marker = {
      hour: Number(selectedHour ?? 0),
      minutes: Number(selectedMinute ?? 0),
      lat: Number(selectedStopDetails.lat ?? 0),
      long: Number(selectedStopDetails.long ?? 0),
      busRoute: user?.busRoute,
    };
    const newBusEntry = await addBusEntry({
      userId: user?._id ?? "",
      selectedHour: selectedHour ?? "",
      selectedMinute: selectedMinute ?? "",
      selectedAmPm: selectedAmPm ?? "",
      busRoute: user?.busRoute,
      busStop: selectedBusStop as string,
      lat: newMarker.lat,
      long: newMarker.long,
    });
    if (!newBusEntry) {
      return;
    }
    console.log("entry log created: ", newBusEntry);
    // socket.emit("newEntry", newMarker);
    setEntries((prev: marker[]) => [...prev, newMarker]);
  }

  return {
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
  };
}
