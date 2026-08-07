"use client";

import { marker } from "../types";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { getMinutesAgo } from "../utils";

const busStopIcon = L.icon({
  iconUrl: "/icons/mapMarker.png",
  iconSize: [21, 32],
  iconAnchor: [16, 32],
});

const busIcon = L.icon({
  iconUrl: "/icons/busIcon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const icon = busStopIcon;

export default function Markers({
  markers,
  setSelectedMarker,
  setDialogOpen,
}: {
  markers: marker[];
  setSelectedMarker: (marker: marker | null) => void;
  setDialogOpen: (open: boolean) => void;
}) {
  return (
    <div>
      {markers.map((marker, i) => (
        <Marker
          key={i + marker.lat}
          position={[marker.lat, marker.long]}
          icon={icon}
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
    </div>
  );
}
