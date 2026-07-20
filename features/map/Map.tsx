"use client";

import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import EntryForm from "./components/EntryForm";
import { useState, useEffect } from "react";
import { marker } from "./types";

const busStopIcon = L.icon({
  iconUrl: "/icons/mapMarker.png",
  iconSize: [21, 32],
  iconAnchor: [16, 32],
});

const dummyMarker = { hour: 7, minutes: 21, lat: 31.253032, long: 29.972749 };

function getMinutesAgo(marker: marker): number {
  // subtracts the marker time from the current time and returns the difference in minutes
  const now = new Date();
  const markerTime = new Date();
  markerTime.setHours(marker.hour);
  markerTime.setMinutes(marker.minutes);
  markerTime.setSeconds(0);
  markerTime.setMilliseconds(0);
  const diff = now.getTime() - markerTime.getTime();
  return Math.floor(diff / 1000 / 60);
}

export default function Map() {
  const [markers, setMarkers] = useState<marker[]>([dummyMarker]);

  useEffect(() => {
    console.log("markers updated", markers);
  }, [markers]);
  return (
    <div className="flex min-h-full flex-col items-center justify-center pb-2">
      <MapContainer
        className="h-100 w-full"
        center={[31.250545425899407, 29.970028787218897]}
        zoom={14}
      >
        <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {markers.map((marker, i) => (
          <div key={i + marker.lat}>
            <Marker
              key={i + marker.lat}
              position={[marker.lat, marker.long]}
              icon={busStopIcon}
            >
              <Tooltip
                key={i + marker.lat}
                permanent
                direction="top"
                offset={[-5, -30]}
                className="text-black text-[0.75rem] font-bold rounded-lg"
              >
                <div>{`(${getMinutesAgo(marker)} minutes ago)`}</div>
                <div>{`${marker.hour}:${marker.minutes} AM`}</div>
              </Tooltip>
            </Marker>
          </div>
        ))}
      </MapContainer>

      <EntryForm setMarkers={setMarkers} />
    </div>
  );
}
