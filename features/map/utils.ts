import { entry } from "./types";

export function getEntryTimeInMinutes(entry: entry): number {
  const normalizedHour = entry.hour % 12;
  const isPm = entry.amPm?.toUpperCase() === "PM";

  return (normalizedHour + (isPm ? 12 : 0)) * 60 + entry.minutes;
}

export function getEntryGroupKey(entry: entry): string {
  return entry.busStop ?? `coordinates:${entry.lat}:${entry.long}`;
}

export function getEntryIdentity(entry: entry): string {
  return (
    entry.id ??
    `${getEntryGroupKey(entry)}:${entry.hour}:${entry.minutes}:${entry.amPm}`
  );
}

export function getMinutesAgo(entry: entry): number {
  const now = new Date();

  const markerTime = new Date();
  markerTime.setHours(entry.hour);
  markerTime.setMinutes(entry.minutes);
  markerTime.setSeconds(0);
  markerTime.setMilliseconds(0);

  const diff = now.getTime() - markerTime.getTime();
  return Math.floor(diff / 1000 / 60);
}
