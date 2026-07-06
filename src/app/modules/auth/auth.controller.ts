import { status } from "http-status";
import catchAsync from "../../utils/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../utils/SendResponse";
import type { Request, Response } from "express";
import config from "../../config";

const registerUser = async (req: Request, res: Response) => {
  const result = await AuthService.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User Created Successfully",
    data: result,
  });
};

const login = catchAsync(async (req, res) => {
  const result = await AuthService.login(req.body);

  const { refreshToken, accessToken } = result;

  res.cookie("accessToken", accessToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24,
  });

  res.cookie("refreshToken", refreshToken, {
    secure: config.node_env === "production",
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const AuthController = { login, registerUser };
