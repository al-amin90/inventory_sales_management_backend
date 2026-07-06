import { Model, Types } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TGuardian = {
  fatherName: string
  fatherOccupation: string
  fatherContactNo: string
  motherContactNo: string
}

export type TLocalGuardian = {
  name: string
  occupation: string
  contactNo: string
  address: string
}

export type TStudent = {
  id: string
  user: Types.ObjectId
  name: TUserName
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  avatar?: string
  contactNumber: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
  presentAddress: string
  permanentAddress: string
  guardian: TGuardian
  localGuardian: TLocalGuardian
  admissionSemester: Types.ObjectId
  academicDepartment: Types.ObjectId
  profileImg?: string
  isDeleted: boolean
}

// export type StudentMethods = {
//   isUserExist(id: string): Promise<TStudent | null>
// }

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethods
// >

export interface IStudentModel extends Model<TStudent> {
  isUserExist2(id: string): Promise<string> | null
}
