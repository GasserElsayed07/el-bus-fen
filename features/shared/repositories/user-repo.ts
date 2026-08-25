"use server";

import { User } from "@/features/shared/models/user";
import { type UserType } from "@/features/shared/models/user";
import { dbConnect } from "@/features/shared/dbConnect";

export async function getAllUsers() {
  try {
    await dbConnect();
    const users = await User.find().select("-passwordHash").lean();
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.error("Failed to fetch users.", error);
  }
}

export async function getUserByFilter(filter: object) {
  try {
    await dbConnect();
    const user = await User.findOne(filter).lean();
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(
      "Failed to fetch user with the filter:",
      filter,
      "Error:",
      error,
    );
  }
}

export async function addUser(userToBeAdded: UserType) {
  try {
    await dbConnect();
    const user = await User.insertOne(userToBeAdded);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Failed to add user.", error);
  }
}

export async function updateUserWithCustomFields(
  toBeUpdatedFields: object,
  userId,
) {
  try {
    await dbConnect();
    console.log(
      "type of userId is: " + typeof userId,
      "and has value of: ",
      userId,
    );
    const user = await User.updateOne(
      { _id: userId },
      { $set: toBeUpdatedFields },
    );
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error(
      "Failed to update user with custom fields: ",
      toBeUpdatedFields,
      "error: ",
      error,
    );
  }
}
