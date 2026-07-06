import { model, Schema } from 'mongoose'
import { TAcademicDepartment } from './academicDepartment.interface'
import AppError from '../../errors/AppError'
import status from 'http-status'

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
)

academicDepartmentSchema.pre('save', async function (next) {
  const isExist = await AcademicDepartment.findOne({ name: this.name })

  if (isExist) {
    throw new AppError(status.CONFLICT, 'This Department iss already exist')
  }
  next()
})

academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery()
  console.log('query', query)

  const isExist = await AcademicDepartment.findOne(query)

  if (!isExist) {
    throw new AppError(status.NOT_FOUND, 'This Department is not found')
  }

  next()
})

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
)
