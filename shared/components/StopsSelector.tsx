"use client";

import { type Dispatch, type SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { type stop } from "@/shared/data/busStops";

export interface StopOption {
  label: string;
  value: string;
}

interface StopsSelectorProps {
  selected: string | null;
  setSelected: Dispatch<SetStateAction<string | null>>;
  options: any[];
  className?: string;
  text?: string;
}

const createStopOptions = (stops: stop[]) =>
  stops.map((stop) => ({
    label: `${stop.order}. ${stop.name_en}`,
    value: stop.name_en.toString(),
  }));

export default function StopsSelector({
  selected,
  setSelected,
  options,
  className,
  text,
}: StopsSelectorProps) {
  return (
    <Select value={selected} onValueChange={(value) => setSelected(value)}>
      <SelectTrigger className={`w-full max-w-xs ${className ?? ""}`}>
        <SelectValue placeholder={text || "Select an option "} />
      </SelectTrigger>
      <SelectContent>
        {createStopOptions(options).map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
