import jwt from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import type { ILoginPayload } from "./auth.interface";
import type { IUser } from "../user/user.interface";
import bcrypt from "bcryptjs";

const registerUserIntoDB = async (payload: IUser) => {
  const isExisted = await User.findOne({ email: payload.email });

  if (isExisted) {
    throw new AppError(500, "user already exists");
  }

  console.log("password", payload.password);

  const hashPassword = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  console.log("hashPassword", hashPassword);

  await User.create({ ...payload, password: hashPassword });

  const user = await User.findOne({ email: payload.email }).select("-password");

  return user;
};

const login = async (payload: ILoginPayload) => {
  const { password, email } = payload;

  const user = await User.findOne({ email: email }).select("+password");

  if (!user) throw new AppError(404, "User not found");
  if (!user.isActive) throw new AppError(403, "User is inactive");

  console.log("payload.password", payload.password);

  const isPasswordMatch = await bcrypt.compare(password, user.password);
  console.log("Password match:", isPasswordMatch);

  if (!isPasswordMatch) {
    throw new AppError(401, "Invalid credentials");
  }

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

export const AuthService = { login, registerUserIntoDB };
