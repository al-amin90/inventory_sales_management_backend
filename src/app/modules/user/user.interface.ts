import { Model } from 'mongoose'
import { USER_ROLE } from './user.constant'

export interface IUser {
  id: string
  password: string
  needsPasswordChange: boolean
  passwordChangeAt?: Date
  role: 'admin' | 'student' | 'faculty'
  status: 'blocked' | 'in-progress'
  isDeleted: boolean
}

export interface IUserModel extends Model<IUser> {
  isUserExistByCustomId(id: string): Promise<IUser> | null
  isPasswordMatch(
    planTextPassword: string,
    hashTextPassword: string,
  ): Promise<IUser> | null
  isJWTIssuedBeforePassword(
    passwordChangeTimeStamp: Date,
    jwtIssuedTimeStamp: number,
  ): boolean
}

export type TUserRole = keyof typeof USER_ROLE
