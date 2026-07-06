import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import config from "../../config";
import type { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: ["admin", "manager", "employee"],
      default: "employee",
    },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export const User = model<IUser>("User", userSchema);
