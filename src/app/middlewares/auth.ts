import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import catchAsync from "../utils/catchAsync";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../modules/auth/auth.utils";
import status from "http-status";
import { Role } from "../modules/role/role.model";

const auth = (moduleName: string, action: string, subModuleName = null) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken
      ? req.cookies.accessToken
      : req.headers.authorization?.startsWith("Bearer")
        ? req.headers.authorization?.split(" ")[1]
        : req.headers.authorization;

    if (!token) {
      throw new AppError(403, "You are not Loged in!");
    }
    console.log(token);

    const verifiedToken = verifyToken(
      token,
      config.jwt_access_token,
    ) as JwtPayload;

    const { userId, role } = verifiedToken;

    const user = await User.findById(userId);

    if (!user) throw new AppError(404, "User not found");
    if (!user.isActive) throw new AppError(403, "User is inactive");

    if (!req.user) {
      throw new AppError(
        status.FORBIDDEN,
        "Unauthorized - Authentication required",
      );
    }

    if (req.user.role === process.env.ROLE) {
      console.log(req.user.role, "req.user.role");
      return next();
    }

    const school =
      req?.user?.school || req?.headers["x-tenantid"] || req.body.school;

    if (!school) {
      throw new AppError(status.BAD_REQUEST, "School identifier missing");
    }

    const userRole = await Role.findById(role);

    if (!userRole) {
      throw new AppError(status.FORBIDDEN, "You are not authorized!");
    }

    if (userRole.isDeletedRole) {
      throw new AppError(status.FORBIDDEN, "This role has been deleted!");
    }

    const module = userRole?.modules?.find((m) => m.moduleName === moduleName);
    if (!module) {
      throw new AppError(
        status.FORBIDDEN,
        `You are not authorized! ${moduleName}`,
      );
    }
    if (!module?.access) {
      throw new AppError(
        status.FORBIDDEN,
        `Permission denied! ${moduleName || null}`,
      );
    }

    if (subModuleName) {
      const subModule = module?.subModules?.find(
        (m) => m.name === subModuleName,
      );

      if (!subModule) {
        throw new AppError(
          status.FORBIDDEN,
          `Permission denied! ${subModule || null}`,
        );
      }
      if (!subModule?.permissions?.[action]) {
        throw new AppError(
          status.FORBIDDEN,
          `Permission denied: Cannot ${action} in ${subModuleName}`,
        );
      }
    } else {
      if (!module.permissions[action]) {
        throw new AppError(
          status.FORBIDDEN,
          `Permission denied: Cannot ${action} in ${moduleName}`,
        );
      }
    }

    req.user = { userId, role: userRole._id };
    next();
  });
};

export default auth;
