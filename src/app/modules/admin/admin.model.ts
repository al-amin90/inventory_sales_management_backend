import { Schema, model } from 'mongoose'
import { IAdminModel, TAdmin, TUserName } from './admin.interface'

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

const adminSchema = new Schema<TAdmin, IAdminModel>(
  {
    id: { type: String, required: true, unique: true },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User is Required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is Required'],
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
    emergencyContactNo: String,
    bloodGroup: {
      type: String,
      enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
    },
    presentAddress: { type: String, required: true },
    permanentAddress: { type: String, required: true },
    profileImg: String,
    isDeleted: { type: Boolean, default: false },
  },
  {
    statics: {
      async isUserExist2(id: string) {
        return await this.findOne({ id })
      },
    },
    toJSON: { virtuals: true },
    timestamps: true,
  },
)

adminSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

adminSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

adminSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
})

adminSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName || ''} ${this?.name?.middleName || ''} ${this?.name?.lastName || ''}`
})

const AdminModal = model<TAdmin, IAdminModel>('Admin', adminSchema)

export default AdminModal
