import { Types } from "mongoose";

export type TUserRole = "admin" | "manager" | "employee";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Types.ObjectId;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
