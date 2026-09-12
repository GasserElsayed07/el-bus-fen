import { entry } from "./types";

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
