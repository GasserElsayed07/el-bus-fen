"use client";

import { marker } from "../types";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { getMinutesAgo } from "../utils";
import { useUserStore } from "@/store/userStore";
import { kourneshStops } from "@/features/shared/data/busStops";

const busEntryIcon = L.icon({
  iconUrl: "/icons/mapMarker.png",
  iconSize: [21, 32],
  iconAnchor: [16, 32],
});

const busStopIcon = L.icon({
  iconUrl: "/icons/bus_stop_marker.png",
  iconSize: [26, 32],
  iconAnchor: [18.5, 32],
});

const yourStopMarkerIcon = L.icon({
  iconUrl: "/icons/your_stop_marker.png",
  iconSize: [38, 44],
  iconAnchor: [22, 40],
});

const busIcon = L.icon({
  iconUrl: "/icons/busIcon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const icon = busEntryIcon;

export default function Markers({
  markers,
  entries,
  setSelectedMarker,
  setDialogOpen,
}: {
  markers: marker[];
  entries: marker[]; // Replace 'any' with the actual type for entries
  setSelectedMarker: (marker: marker | null) => void;
  setDialogOpen: (open: boolean) => void;
}) {
  const user = useUserStore((state) => state.user);

  return (
    <div>
      {entries.map((marker, i) => (
        <Marker
          key={i + marker.lat}
          position={[marker.lat, marker.long]}
          icon={icon}
          opacity={0}
          eventHandlers={{
            click: () => {
              setSelectedMarker(marker);
              setDialogOpen(true);
            },
          }}
        >
          <Tooltip
            permanent
            direction="top"
            offset={[-5, -30]}
            className="rounded-lg text-[0.5rem] font-bold text-black"
            eventHandlers={{
              click: () => {
                setSelectedMarker(marker);
                setDialogOpen(true);
              },
            }}
          >
            <div>{`${getMinutesAgo(marker)} minutes ago`}</div>
            {/* <div>{`${marker.hour}:${marker.minutes
                            .toString()
                            .padStart(2, "0")} AM`}</div> */}
          </Tooltip>
        </Marker>
      ))}
      {markers.map((entry, i) => {
        const isUserStop =
          kourneshStops.find(
            (stop) => stop.lat === entry.lat && stop.long === entry.long,
          )?.id === user?.busStopId;

        return (
          <Marker
            key={i + entry.lat}
            position={[entry.lat, entry.long]}
            icon={isUserStop ? yourStopMarkerIcon : busStopIcon}
          >
            {isUserStop && (
              <Tooltip
                permanent
                direction="top"
                offset={[-2, -30]}
                opacity={1}
                className="border-0! bg-transparent! p-0! shadow-none! before:hidden!"
              >
                <div className="rounded-md bg-blue-500 px-2 py-1 font-semibold text-white">
                  Your Stop
                </div>
              </Tooltip>
            )}
          </Marker>
        );
      })}
    </div>
  );
}
