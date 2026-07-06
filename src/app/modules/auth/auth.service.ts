import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import type { ILoginPayload } from "./auth.interface";
import type { IUser } from "../user/user.interface";
import type { IRole } from "../role/role.interface";
import bcrypt from "bcryptjs";
import { createToken } from "./auth.utils";

const registerUserIntoDB = async (payload: IUser) => {
  const isExisted = await User.findOne({ email: payload.email });

  if (isExisted) {
    throw new AppError(500, "user already exists");
  }

  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  await User.create({ ...payload, password: hashPassword });

  const user = await User.findOne({ email: payload.email }).select("-password");

  return user;
};

const login = async (payload: ILoginPayload) => {
  const { password, email } = payload;

  const user = await User.findOne({ email: email })
    .populate("role")
    .select("+password");

  if (!user) throw new AppError(404, "User not found");
  if (!user.isActive) throw new AppError(403, "User is inactive");

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(401, "Invalid credentials");
  }

  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role._id,
    roleName: (user.role as any).roleName,
    name: user.name,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token,
    config.jwt_access_expires_in,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token,
    config.jwt_refresh_expires_in,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      roleName: (user.role as any).roleName,
    },
  };
};

export const AuthService = { login, registerUserIntoDB };
