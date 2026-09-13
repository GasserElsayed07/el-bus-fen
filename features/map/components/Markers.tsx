"use client";

import { entry, marker } from "../types";
import { Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import { useMemo, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { kourneshStops } from "@/features/shared/data/busStops";
import GroupedEntryTooltip from "./GroupedEntryTooltip";
import {
  getEntryGroupKey,
  getEntryIdentity,
  getEntryTimeInMinutes,
} from "../utils";

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
  setSelectedEntry,
  setDialogOpen,
}: {
  markers: marker[];
  entries: entry[]; // Replace 'any' with the actual type for entries
  setSelectedEntry: (entry: entry | null) => void;
  setDialogOpen: (open: boolean) => void;
}) {
  const user = useUserStore((state) => state.user);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    () => new Set(),
  );

  const entryGroups = useMemo(() => {
    const groups = new Map<string, entry[]>();
    const seenEntries = new Set<string>();

    for (const currentEntry of entries) {
      const entryIdentity = getEntryIdentity(currentEntry);

      if (seenEntries.has(entryIdentity)) {
        continue;
      }

      seenEntries.add(entryIdentity);
      const groupKey = getEntryGroupKey(currentEntry);
      const group = groups.get(groupKey) ?? [];

      group.push(currentEntry);
      groups.set(groupKey, group);
    }

    return Array.from(groups, ([groupKey, groupEntries]) => ({
      groupKey,
      entries: groupEntries.sort(
        (firstEntry, secondEntry) =>
          getEntryTimeInMinutes(secondEntry) -
          getEntryTimeInMinutes(firstEntry),
      ),
    }));
  }, [entries]);

  function toggleGroup(groupKey: string) {
    setExpandedGroups((currentGroups) => {
      const nextGroups = new Set(currentGroups);

      if (nextGroups.has(groupKey)) {
        nextGroups.delete(groupKey);
      } else {
        nextGroups.add(groupKey);
      }

      return nextGroups;
    });
  }

  function handleEntryClick(selectedEntry: entry) {
    setSelectedEntry(selectedEntry);
    setDialogOpen(true);
  }

  return (
    <div>
      {entryGroups.map(({ groupKey, entries: groupEntries }) => {
        const latestEntry = groupEntries[0];

        return (
          <Marker
            key={groupKey}
            position={[latestEntry.lat, latestEntry.long]}
            icon={icon}
            opacity={0}
            eventHandlers={{
              click: () => handleEntryClick(latestEntry),
            }}
          >
            <Tooltip
              permanent
              interactive
              direction="top"
              offset={[-5, -30]}
              className="border-0! bg-transparent! p-0! shadow-none! before:hidden!"
            >
              <GroupedEntryTooltip
                entries={groupEntries}
                latestEntry={latestEntry}
                isExpanded={expandedGroups.has(groupKey)}
                onToggle={() => toggleGroup(groupKey)}
                onEntryClick={handleEntryClick}
              />
            </Tooltip>
          </Marker>
        );
      })}
      {markers.map((entry, i) => {
        const stopId = kourneshStops.find(
          (stop) => stop.lat === entry.lat && stop.long === entry.long,
        )?.id;
        const isUserStop = stopId === user?.busStopId;
        const hasEntriesAtStop = entries.some(
          (currentEntry) =>
            currentEntry.busStop === stopId ||
            (currentEntry.busStop === undefined &&
              currentEntry.lat === entry.lat &&
              currentEntry.long === entry.long),
        );

        return (
          <Marker
            key={i + entry.lat}
            position={[entry.lat, entry.long]}
            icon={isUserStop ? yourStopMarkerIcon : busStopIcon}
          >
            {isUserStop && !hasEntriesAtStop && (
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
