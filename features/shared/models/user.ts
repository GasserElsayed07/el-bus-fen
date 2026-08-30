import { HydratedDocument, Schema, model, models } from "mongoose";

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  passwordHash: { type: String },
  lat: { type: Number },
  long: { type: Number },
  busRoute: { type: String },
  busStopId: { type: String },
  authType: { type: String },
  onboarded: { type: Boolean },
});

export type UserType = {
  name: string;
  email: string;
  passwordHash?: string;
  lat?: number;
  long?: number;
  busRoute?: string;
  busStopId?: string;
  authType?: string;
  onboarded?: boolean;
  _id?: string; // just to silent typeScript
};

export type UserDocument = HydratedDocument<UserType>;

export const User = models.User || model<UserType>("User", userSchema);
