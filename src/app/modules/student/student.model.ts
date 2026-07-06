import { Schema, model } from 'mongoose'
import {
  IStudentModel,
  // StudentMethods,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface'
// import validator from 'validator'

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First is Required'],
    trim: true,
    maxlength: [20, 'Not more then 20'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstName =
    //       value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    //     return firstName === value
    //   },
    //   message: '{VALUE} is not in Capitalize formate',
    // },
  },
  middleName: String,
  lastName: {
    type: String,
    required: [true, 'Last is Required'],
    // validate: {
    //   validator: value => validator.isAlpha(value),
    //   message: '{VALUE} is not Valid',
    // },
  },
})

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherContactNo: { type: String, required: true },
})

const localGuardian = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
})

const studentSchema = new Schema<TStudent, IStudentModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is Required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: true,
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female'],
        message: "{VALUE} is no gender other then ['male', 'female']",
      },
    },
    dateOfBirth: { type: String, required: true },
    email: {
      type: String,
      required: true,
    },
    contactNumber: { type: String, required: true },
    avatar: String,
    emergencyContactNo: String,
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    guardian: {
      type: guardianSchema,
      required: true,
    },
    localGuardian: {
      type: localGuardian,
      required: true,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
    profileImg: String,
    isDeleted: { type: Boolean, default: false },
  },
  {
    // methods: {
    //   async isUserExist(id: string) {
    //     const existingUser = await StudentModal.findOne({ id })
    //     return existingUser
    //   },
    // },
    statics: {
      async isUserExist2(id: string) {
        return await this.findOne({ id })
      },
    },
    toJSON: { virtuals: true },
    timestamps: true,
  },
)

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

studentSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
})

studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`
})

const StudentModal = model<TStudent, IStudentModel>('Student', studentSchema)

export default StudentModal
