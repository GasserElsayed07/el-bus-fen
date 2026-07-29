"use server";

import { User, UserDocument } from "@/shared/models/user";
import { dbConnect } from "@/shared/dbConnect";

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

export async function addUser(userToBeAdded: UserDocument) {
  try {
    await dbConnect();
    const user = await User.insertOne(userToBeAdded);
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.error("Failed to add user.", error);
  }
}
