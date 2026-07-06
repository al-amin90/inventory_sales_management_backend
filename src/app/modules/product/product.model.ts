import { model, Schema } from "mongoose";
import type { IProduct } from "./product.interface";

const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    sku: { type: String, required: true, unique: true, uppercase: true },
    category: { type: String, required: true },
    purchasePrice: { type: Number, required: true, min: 0 },
    sellingPrice: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0, default: 0 },
    image: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

productSchema.pre(/^find/, function (this: any, next) {
  this.find({ isDeleted: false });
});

export const Product = model<IProduct>("Product", productSchema);
