import { z } from "zod";

const createProduct = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    sku: z.string().min(1, "SKU is required"),
    category: z.string().min(1, "Category is required"),
    purchasePrice: z.coerce.number().min(0),
    sellingPrice: z.coerce.number().min(0),
    stock: z.coerce.number().min(0).default(0),
  }),
});

const updateProduct = z.object({
  body: z.object({
    name: z.string().optional(),
    sku: z.string().optional(),
    category: z.string().optional(),
    purchasePrice: z.coerce.number().min(0).optional(),
    sellingPrice: z.coerce.number().min(0).optional(),
    stock: z.coerce.number().min(0).optional(),
  }),
});

export const ProductValidation = { createProduct, updateProduct };
