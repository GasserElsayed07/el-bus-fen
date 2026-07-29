import { marker } from "./types";

export function getMinutesAgo(marker: marker): number {
  const now = new Date();

  const markerTime = new Date();
  markerTime.setHours(marker.hour);
  markerTime.setMinutes(marker.minutes);
  markerTime.setSeconds(0);
  markerTime.setMilliseconds(0);

  const diff = now.getTime() - markerTime.getTime();
  return Math.floor(diff / 1000 / 60);
}
