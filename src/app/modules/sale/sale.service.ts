import mongoose from "mongoose";
import AppError from "../../errors/AppError";
import { Product } from "../product/product.model";

import { Sale } from "./sale.model";

const createSale = async (
  payload: { items: { product: string; quantity: number }[] },
  userId: string,
) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    let grandTotal = 0;
    const saleItems = [];

    for (const item of payload.items) {
      const product = await Product.findById(item.product).session(session);

      if (!product)
        throw new AppError(404, `Product ${item.product} not found`);
      if (product.stock < item.quantity) {
        throw new AppError(
          400,
          `Insufficient stock for "${product.name}". Available: ${product.stock}`,
        );
      }

      const total = product.sellingPrice * item.quantity;
      grandTotal += total;

      saleItems.push({
        product: product._id,
        quantity: item.quantity,
        unitPrice: product.sellingPrice,
        total,
      });

      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } },
        { session },
      );
    }

    const [sale] = await Sale.create(
      [{ items: saleItems, grandTotal, soldBy: userId }],
      { session },
    );

    if (!sale) {
      throw new AppError(500, "Failed to create sale record");
    }

    await session.commitTransaction();
    return await sale.populate("items.product soldBy", "name email role");
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

const getAllSales = async () => {
  const result = await Sale.find()
    .populate("items.product", "name sku sellingPrice image")
    .populate("soldBy", "name email role")
    .sort("-createdAt");

  return result;
};

export const SaleService = { createSale, getAllSales };
