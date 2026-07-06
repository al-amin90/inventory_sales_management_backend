import { model, Schema } from "mongoose";
import type { ISale } from "./sale.interface";

const saleItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true, min: 1 },
    unitPrice: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  { _id: false },
);

const saleSchema = new Schema<ISale>(
  {
    items: { type: [saleItemSchema], required: true },
    grandTotal: { type: Number, required: true },
    soldBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Sale = model<ISale>("Sale", saleSchema);
