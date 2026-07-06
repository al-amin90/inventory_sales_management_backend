import { Model, Types } from 'mongoose'

export type TUserName = {
  firstName: string
  middleName?: string
  lastName: string
}

export type TFaculty = {
  id: string
  user: Types.ObjectId
  designation: string
  name: TUserName
  gender: 'male' | 'female'
  dateOfBirth: string
  email: string
  contactNumber: string
  emergencyContactNo: string
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-'
  presentAddress: string
  permanentAddress: string
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

export interface IFacultyModel extends Model<TFaculty> {
  isUserExist2(id: string): Promise<string> | null
}
