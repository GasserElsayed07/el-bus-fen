"use client";

import {
  WheelPicker,
  WheelPickerWrapper,
  type WheelPickerOption,
} from "@/components/wheel-picker";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { kourneshStops } from "@/features/shared/data/busStops";
import { PencilLine } from "lucide-react";
import { useMemo, useState } from "react";

type SubmitEntry = (
  selectedHour: string | undefined,
  selectedMinute: string | undefined,
  selectedAmPm: string | undefined,
) => void;

const createHourOptions = (): WheelPickerOption[] =>
  Array.from({ length: 12 }, (_, index) => {
    const hour = index + 1;

    return {
      label: hour.toString().padStart(2, "0"),
      value: hour.toString(),
    };
  });

const createMinuteOptions = (): WheelPickerOption[] =>
  Array.from({ length: 60 }, (_, index) => {
    const minute = index;

    return {
      label: minute.toString().padStart(2, "0"),
      value: minute.toString(),
    };
  });

const createAmPmOptions = (): WheelPickerOption[] => [
  { label: "AM", value: "AM" },
  { label: "PM", value: "PM" },
];

const createStopOptions = () =>
  kourneshStops.map((stop) => ({
    label: `${stop.order}. ${stop.name_en}`,
    value: stop.id,
  }));

export default function EntryForm({
  submitEntry,
  selectedStop,
  setSelectedStop,
}: {
  submitEntry: SubmitEntry;
  selectedStop: string | null;
  setSelectedStop: (value: string | null) => void;
}) {
  const hourOptions = useMemo(() => createHourOptions(), []);
  const minuteOptions = useMemo(() => createMinuteOptions(), []);
  const amPmOptions = useMemo(() => createAmPmOptions(), []);
  const stopOptions = useMemo(() => createStopOptions(), []);
  const [isEditingStop, setIsEditingStop] = useState(false);
  const [draftBusStop, setDraftBusStop] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string | undefined>("7");
  const [selectedMinute, setSelectedMinute] = useState<string | undefined>(
    "14",
  );
  const [selectedAmPm, setSelectedAmPm] = useState<string | undefined>("AM");

  // const user = useUserStore((state) => state.user);
  const selectedStopData =
    kourneshStops.find((stop) => stop.id === selectedStop) ?? null;

  function handleOnSubmit() {
    submitEntry(selectedHour, selectedMinute, selectedAmPm);
  }

  return (
    <div className="flex w-full flex-wrap items-end justify-center gap-2 p-2">
      <div className="flex w-full max-w-xs items-center gap-1.5">
        {!isEditingStop ? (
          <div className="flex h-8 w-full min-w-0 items-center justify-between rounded-lg border border-input bg-transparent px-2.5 py-2 text-sm whitespace-nowrap text-left text-foreground shadow-none">
            <span className="line-clamp-1">
              {selectedStopData
                ? `${selectedStopData.order}. ${selectedStopData.name_en}`
                : "Please select a bus stop"}
            </span>
          </div>
        ) : (
          <Select
            value={draftBusStop ?? ""}
            onValueChange={(value) => {
              setDraftBusStop(value);
              setSelectedStop(value);
              setIsEditingStop(false);
              console.log("draftBusStop", value);
            }}
          >
            <SelectTrigger
              className="w-full flex-1 min-w-0"
              onSelect={(e) => {
                e.stopPropagation();
                console.log("SelectTrigger clicked" + e.target);
              }}
            >
              <SelectValue placeholder="Please select a bus stop" />
            </SelectTrigger>
            <SelectContent>
              {stopOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {!isEditingStop && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Edit bus stop"
            className="h-8 w-8 rounded-md p-0 hover:bg-transparent"
            onClick={() => {
              setDraftBusStop(null);
              setIsEditingStop(true);
            }}
          >
            <PencilLine className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex w-full items-center justify-center gap-2 p-2">
        <WheelPickerWrapper className="w-fit max-w-xs border bg-transparent shadow-none">
          <WheelPicker
            options={hourOptions}
            value={selectedHour}
            onValueChange={(value) => {
              console.log("selectedHour", value);
              setSelectedHour(value);
            }}
          />
          <WheelPicker
            options={minuteOptions}
            value={selectedMinute}
            onValueChange={setSelectedMinute}
          />
          <WheelPicker
            options={amPmOptions}
            value={selectedAmPm}
            onValueChange={setSelectedAmPm}
          />
        </WheelPickerWrapper>
      </div>
      <Button onClick={handleOnSubmit} className="w-full" variant="secondary">
        submit
      </Button>
    </div>
  );
}
