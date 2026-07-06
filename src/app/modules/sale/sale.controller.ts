import { status } from "http-status";
import catchAsync from "../../utils/catchAsync";
import { SaleService } from "./sale.service";
import sendResponse from "../../utils/SendResponse";

const createSale = catchAsync(async (req, res) => {
  const result = await SaleService.createSale(req.body, req.user.userId);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Sale created successfully",
    data: result,
  });
});

const getAllSales = catchAsync(async (req, res) => {
  const result = await SaleService.getAllSales();
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Sales retrieved successfully",
    data: result,
  });
});

export const SaleController = { createSale, getAllSales };
