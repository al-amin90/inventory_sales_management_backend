import { z } from "zod";

const createSale = z.object({
  body: z.object({
    items: z
      .array(
        z.object({
          product: z.string().min(1, "Product ID required"),
          quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
        }),
      )
      .min(1, "At least one item required"),
  }),
});

export const SaleValidation = { createSale };
