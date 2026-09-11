import { HydratedDocument, Schema, Types, model, models } from "mongoose";

const busEntrySchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    time: { type: Date, required: true },
    busStop: { type: String, required: true },
    busRoute: { type: String },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
  },
  { timestamps: true },
);

busEntrySchema.index({ busStop: 1, createdAt: -1 });
busEntrySchema.index({ busRoute: 1, createdAt: -1 });
busEntrySchema.index({ userId: 1, createdAt: -1 });

export type BusEntryType = {
  userId: Types.ObjectId | string;
  time: Date;
  busStop: string;
  busRoute?: string;
  lat: number;
  long: number;
  _id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type BusEntryDocument = HydratedDocument<BusEntryType>;

export const BusEntry =
  models.BusEntry || model<BusEntryType>("BusEntry", busEntrySchema);
