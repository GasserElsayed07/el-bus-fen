import { Skeleton } from "@/components/ui/skeleton";

export default function MapSkeleton() {
  return (
    <main
      className="flex h-[calc(100dvh-var(--bottom-navbar-height))] flex-col items-center justify-between pb-2"
      aria-label="Loading map"
    >
      <div className="relative h-full w-full overflow-hidden bg-muted">
        <Skeleton className="absolute inset-0 rounded-none opacity-60" />
        <Skeleton className="absolute left-[18%] top-[22%] h-3 w-3 rounded-full" />
        <Skeleton className="absolute left-[55%] top-[48%] h-3 w-3 rounded-full" />
        <Skeleton className="absolute right-[20%] top-[68%] h-3 w-3 rounded-full" />
        <div className="absolute inset-x-0 bottom-0 space-y-2 bg-background/80 p-2 backdrop-blur-sm">
          <Skeleton className="mx-auto h-8 w-full max-w-xs rounded-lg" />
          <div className="flex justify-center gap-2">
            <Skeleton className="h-30 w-full rounded-md" />
            {/* <Skeleton className="h-10 w-10 rounded-md" /> */}
            {/* <Skeleton className="h-10 w-10 rounded-md" /> */}
          </div>
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
      <footer className="fixed inset-x-0 bottom-0 z-40 h-[var(--bottom-navbar-height)] bg-gray-500 py-2 text-center">
        <nav aria-label="Main navigation" />
      </footer>
    </main>
  );
}
