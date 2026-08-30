import { useEffect, useRef, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { updateUserWithCustomFields } from "@/features/shared/repositories/user-repo";
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
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.useUser);
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSyncedBusStopRef = useRef<string | null>(user?.busStopId ?? null);
  const userRef = useRef(user);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  const [entries, setEntries] = useState<marker[]>([dummyMarker]);
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
  };
}
