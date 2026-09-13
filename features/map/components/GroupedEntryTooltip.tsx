import { ChevronDown, ChevronUp } from "lucide-react";
import { entry } from "../types";
import { getMinutesAgo } from "../utils";

export default function GroupedEntryTooltip({
  entries,
  latestEntry,
  isExpanded,
  onToggle,
  onEntryClick,
}: {
  entries: entry[];
  latestEntry: entry;
  isExpanded: boolean;
  onToggle: () => void;
  onEntryClick: (entry: entry) => void;
}) {
  const otherEntriesCount = entries.length - 1;
  const Chevron = isExpanded ? ChevronDown : ChevronUp;

  return (
    <div className="relative w-max rounded-xl bg-white p-1 text-black">
      {otherEntriesCount > 0 && !isExpanded && (
        <div className="absolute -right-2 -top-2 z-10 flex size-5 items-center justify-center rounded-full bg-blue-500 text-[0.5rem] font-bold text-white">
          +{otherEntriesCount}
        </div>
      )}

      <button
        type="button"
        className={`block w-max whitespace-nowrap rounded-lg px-1 py-1 text-left text-[0.5rem] font-bold ${
          otherEntriesCount > 0 ? "pr-5" : "pr-1"
        }`}
        onClick={(event) => {
          event.stopPropagation();
          onEntryClick(latestEntry);
        }}
      >
        {`${getMinutesAgo(latestEntry)} min ago`}
      </button>

      {otherEntriesCount > 0 && (
        <button
          type="button"
          aria-expanded={isExpanded}
          aria-label={
            isExpanded ? "Collapse bus entries" : "Expand bus entries"
          }
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md p-0.5 text-black hover:bg-slate-100"
          onClick={(event) => {
            event.stopPropagation();
            onToggle();
          }}
        >
          <Chevron size={12} strokeWidth={3} />
        </button>
      )}

      {isExpanded && (
        <div className="mt-1 w-max space-y-1 border-t border-slate-200 pt-1">
          {entries.slice(1).map((entry, index) => (
            <button
              type="button"
              key={
                entry.id ??
                `${entry.lat}:${entry.long}:${entry.hour}:${entry.minutes}:${index}`
              }
              className="block w-full rounded-lg px-1 py-1 text-left text-[0.5rem] font-bold hover:bg-slate-100"
              onClick={(event) => {
                event.stopPropagation();
                onEntryClick(entry);
              }}
            >
              {`${getMinutesAgo(entry)} min ago`}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
