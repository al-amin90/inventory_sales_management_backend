import { Types } from "mongoose";
import type { IRole } from "../role/role.interface";

export type TUserRole = "admin" | "manager" | "employee";

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: Types.ObjectId | IRole;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
