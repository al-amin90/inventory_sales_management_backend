import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { deleteFromCloudinary, uploadToCloudinary } from "../../utils/upload";
import type { IProduct } from "./product.interface";
import { Product } from "./product.model";

const SEARCHABLE_FIELDS = ["name", "sku", "category"];

const createProduct = async (payload: IProduct, fileBuffer: Buffer) => {
  const exists = await Product.findOne({ sku: payload.sku });
  if (exists) throw new AppError(409, "SKU already exists");

  const image = await uploadToCloudinary(fileBuffer, "products");
  return await Product.create({ ...payload, image });
};

const getAllProducts = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(Product.find(), query)
    .search(SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await productQuery.countTotal();
  const data = await productQuery.modelQuery;

  return { meta, data };
};

const getProductById = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) throw new AppError(404, "Product not found");

  return product;
};

const updateProduct = async (
  id: string,
  payload: Partial<IProduct>,
  fileBuffer?: Buffer,
) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError(404, "Product not found");

  if (fileBuffer) {
    await deleteFromCloudinary(product.image);
    payload.image = await uploadToCloudinary(fileBuffer, "products");
  }

  return await Product.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const deleteProduct = async (id: string) => {
  const product = await Product.findById(id);

  if (!product) throw new AppError(404, "Product not found");

  return await Product.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
};

export const ProductService = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
