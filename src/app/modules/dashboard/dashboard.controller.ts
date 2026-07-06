import { status } from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/SendResponse";
import { DashboardService } from "./dashboard.service";

const getDashboardStats = catchAsync(async (req, res) => {
  const result = await DashboardService.getDashboardStats();

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Dashboard statistics retrieved successfully",
    data: result,
  });
});

export const DashboardController = { getDashboardStats };
