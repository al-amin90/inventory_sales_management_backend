import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import type { ILoginPayload } from "./auth.interface";

const login = async (payload: ILoginPayload) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) throw new AppError(404, "User not found");
  if (!user.isActive) throw new AppError(403, "User is inactive");

  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);
  if (!isPasswordMatch) throw new AppError(401, "Invalid credentials");

  const accessToken = jwt.sign(
    { userId: user._id, role: user.role },
    config.jwt_access_token,
    { expiresIn: config.jwt_access_expires_in as string },
  );

  return {
    accessToken,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};

export const AuthService = { login };
