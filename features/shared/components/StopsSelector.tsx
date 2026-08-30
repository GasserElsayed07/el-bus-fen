"use client";

import { type Dispatch, type SetStateAction } from "react";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import { type stop } from "@/features/shared/data/busStops";

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
  route: boolean;
}

const createStopOptions = (stops: stop[], route: boolean) =>
  stops.map((stop) => ({
    label: `${route ? "" : stop.order + ". "} ${stop.name_en}`,
    value: stop.id,
  }));

export default function StopsSelector({
  selected,
  setSelected,
  options,
  className,
  text,
  route,
}: StopsSelectorProps) {
  return (
    <Select value={selected} onValueChange={(value) => setSelected(value)}>
      <SelectTrigger
        className={`w-full max-w-xs ${className ?? ""}`}
        onClick={(e) => {
          e.stopPropagation();
          console.log("SelectTrigger clicked" + e.target);
        }}
      >
        <SelectValue placeholder={text || "Select an option "} />
      </SelectTrigger>
      <SelectContent>
        {createStopOptions(options, route).map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
