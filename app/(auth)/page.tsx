import { Suspense } from "react";
import { getLastSevenHoursBusEntries } from "@/features/shared/repositories/bus-entry-repo";
import Map from "@/features/map/Map";
import MapSkeleton from "@/features/map/components/MapSkeleton";
import type { BusEntryType } from "@/features/shared/models/bus-entry";

async function MapPageContent() {
  const entryLogs = await getLastSevenHoursBusEntries();

  return <Map entryLogs={entryLogs as BusEntryType[]} />;
}

export default function Home() {
  return (
    <Suspense fallback={<MapSkeleton />}>
      <MapPageContent />
      {/* <MapSkeleton /> */}
    </Suspense>
  );
}
