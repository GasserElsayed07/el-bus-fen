"use server";

import {
  BusEntry,
  type BusEntryType,
} from "@/features/shared/models/bus-entry";
import { dbConnect } from "@/features/shared/dbConnect";
import type { QueryFilter, UpdateQuery } from "mongoose";

function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export type AddBusEntryInput = Omit<BusEntryType, "time"> & {
  selectedHour: string;
  selectedMinute: string;
  selectedAmPm: string;
};

function createBusEntryTime(
  selectedHour: string,
  selectedMinute: string,
  selectedAmPm: string,
) {
  const hour = Number(selectedHour);
  const minute = Number(selectedMinute);
  const amPm = selectedAmPm.toUpperCase();
  const utcOffset = Number(process.env.UTC_OFFSET ?? 0);

  if (
    !Number.isInteger(hour) ||
    hour < 1 ||
    hour > 12 ||
    !Number.isInteger(minute) ||
    minute < 0 ||
    minute > 59 ||
    !["AM", "PM"].includes(amPm) ||
    !Number.isFinite(utcOffset)
  ) {
    throw new Error("Invalid bus entry time.");
  }

  const now = new Date();
  const localNow = new Date(now.getTime() + utcOffset * 60 * 60 * 1000);
  const hour24 = (hour % 12) + (amPm === "PM" ? 12 : 0);
  const localTimeAsUtc = Date.UTC(
    localNow.getUTCFullYear(),
    localNow.getUTCMonth(),
    localNow.getUTCDate(),
    hour24,
    minute,
  );

  return new Date(localTimeAsUtc - utcOffset * 60 * 60 * 1000);
}

export async function getAllBusEntries() {
  try {
    await dbConnect();
    const entries = await BusEntry.find().sort({ createdAt: -1 }).lean();
    return serialize(entries);
  } catch (error) {
    console.error("Failed to fetch bus entries.", error);
  }
}

export async function getBusEntryByFilter(filter: QueryFilter<BusEntryType>) {
  try {
    await dbConnect();
    const entry = await BusEntry.findOne(filter).lean();
    return serialize(entry);
  } catch (error) {
    console.error(
      "Failed to fetch bus entry with the filter:",
      filter,
      "Error:",
      error,
    );
  }
}

export async function getRecentBusEntries(
  filter: QueryFilter<BusEntryType> = {},
  limit = 100,
) {
  try {
    await dbConnect();
    const safeLimit = Math.min(Math.max(Math.floor(limit), 1), 1000);
    const entries = await BusEntry.find(filter)
      .sort({ createdAt: -1 })
      .limit(safeLimit)
      .lean();
    return serialize(entries);
  } catch (error) {
    console.error("Failed to fetch recent bus entries.", error);
  }
}

export async function getLastSevenHoursBusEntries() {
  try {
    await dbConnect();
    const sevenHoursAgo = new Date(Date.now() - 7 * 60 * 60 * 1000);
    const entries = await BusEntry.find({
      createdAt: { $gte: sevenHoursAgo },
    })
      .populate("userId", "-passwordHash")
      .sort({ createdAt: -1 })
      .lean();

    return serialize(entries);
  } catch (error) {
    console.error(
      "Failed to fetch bus entries from the last seven hours.",
      error,
    );
  }
}

export async function addBusEntry({
  selectedHour,
  selectedMinute,
  selectedAmPm,
  ...entryToBeAdded
}: AddBusEntryInput) {
  try {
    await dbConnect();
    const entry = await BusEntry.create({
      ...entryToBeAdded,
      time: createBusEntryTime(selectedHour, selectedMinute, selectedAmPm),
    });
    return serialize(entry);
  } catch (error) {
    console.error("Failed to add bus entry.", error);
  }
}

export async function updateBusEntryWithCustomFields(
  toBeUpdatedFields: UpdateQuery<BusEntryType>,
  entryId: string,
) {
  try {
    await dbConnect();
    const entry = await BusEntry.updateOne(
      { _id: entryId },
      { $set: toBeUpdatedFields },
    );
    return serialize(entry);
  } catch (error) {
    console.error(
      "Failed to update bus entry with custom fields:",
      toBeUpdatedFields,
      "Error:",
      error,
    );
  }
}

export async function deleteBusEntry(entryId: string) {
  try {
    await dbConnect();
    const result = await BusEntry.deleteOne({ _id: entryId });
    return serialize(result);
  } catch (error) {
    console.error("Failed to delete bus entry.", error);
  }
}
