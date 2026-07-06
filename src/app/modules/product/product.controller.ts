import { status } from "http-status";
import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import { ProductService } from "./product.service";
import sendResponse from "../../utils/SendResponse";

const createProduct = catchAsync(async (req, res) => {
  if (!req.file) throw new AppError(400, "Product image is required");

  const result = await ProductService.createProduct(req.body, req.file.buffer);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Product created successfully",
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductService.getAllProducts(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Products retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getProductById = catchAsync(async (req, res) => {
  const result = await ProductService.getProductById(req.params.id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product retrieved successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const result = await ProductService.updateProduct(
    req.params.id as string,
    req.body,
    req.file?.buffer,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product updated successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  await ProductService.deleteProduct(req.params.id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Product deleted successfully",
    data: null,
  });
});

export const ProductController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
