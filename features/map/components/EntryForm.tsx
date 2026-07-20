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
import { kourneshStops } from "@/data/busStops";
import { useMemo, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { marker } from "../types";

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
    value: stop.name_en.toString(),
  }));

export default function EntryForm({ setMarkers }: { setMarkers: any }) {
  const hourOptions = useMemo(() => createHourOptions(), []);
  const minuteOptions = useMemo(() => createMinuteOptions(), []);
  const amPmOptions = useMemo(() => createAmPmOptions(), []);
  const stopOptions = useMemo(() => createStopOptions(), []);
  const [selectedStop, setSelectedStop] = useState<string | null>("");
  const [selectedHour, setSelectedHour] = useState<string | undefined>("7");
  const [selectedMinute, setSelectedMinute] = useState<string | undefined>(
    "14",
  );
  const [selectedAmPm, setSelectedAmPm] = useState<string | undefined>("AM");

  const user = useUserStore((state) => state.user);

  function submitEntry() {
    console.log(" I fired submitEntry", {
      selectedHour,
      selectedMinute,
      selectedAmPm,
      selectedStop,
    });
    const newMarker: marker = {
      hour: Number(selectedHour ?? 0),
      minutes: Number(selectedMinute ?? 0),
      lat: Number(user?.lat ?? 0),
      long: Number(user?.long ?? 0),
    };
    setMarkers((prev: marker[]) => [...prev, newMarker]);
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-2">
      <div className="flex w-full items-center justify-between gap-2 p-2">
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

        <Select
          value={selectedStop}
          onValueChange={(value) => setSelectedStop(value)}
        >
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="Select a stop" />
          </SelectTrigger>
          <SelectContent>
            {stopOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button onClick={submitEntry} className="w-full" variant="outline">
        submit
      </Button>
    </div>
  );
}
