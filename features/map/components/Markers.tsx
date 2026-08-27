"use client";

import { marker } from "../types";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { getMinutesAgo } from "../utils";

const busEntryIcon = L.icon({
  iconUrl: "/icons/mapMarker.png",
  iconSize: [21, 32],
  iconAnchor: [16, 32],
});

const busStopIcon = L.icon({
  iconUrl: "/icons/busStopIcon.png",
  iconSize: [32, 32],
  iconAnchor: [20, 32],
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
      {markers.map((entry, i) => (
        <Marker
          key={i + entry.lat}
          position={[entry.lat, entry.long]}
          icon={busStopIcon}
        ></Marker>
      ))}
    </div>
  );
}
