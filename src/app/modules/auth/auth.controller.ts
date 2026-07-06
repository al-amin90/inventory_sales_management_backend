import { status } from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/SendResponse";

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const AuthController = { login };
