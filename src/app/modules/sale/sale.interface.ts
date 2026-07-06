import { Types } from "mongoose";

export interface ISaleItem {
  product: Types.ObjectId;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ISale {
  _id?: Types.ObjectId;
  items: ISaleItem[];
  grandTotal: number;
  soldBy: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}
