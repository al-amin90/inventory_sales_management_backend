import { Types } from "mongoose";

export interface IProduct {
  _id?: Types.ObjectId;
  name: string;
  sku: string;
  category: string;
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  image: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
