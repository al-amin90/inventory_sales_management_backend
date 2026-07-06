import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import type { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
      type: Types.ObjectId,
      ref: "Role",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
