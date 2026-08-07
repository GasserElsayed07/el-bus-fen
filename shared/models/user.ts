import { InferSchemaType, Schema, model, models } from "mongoose";
import { boolean } from "zod";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    passwordHash: { type: String },
    lat: { type: Number },
    long: { type: Number },
    busStop: { type: String },
    authType: { type: String },
    onboarded: { type: boolean },
  },
  {
    strict: false,
  },
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const User = models.User || model<UserDocument>("User", userSchema);

// or :

// export const User = models.User || model("User", userSchema)

// All this InferSchemaType is just to make TypeScript extra happy
