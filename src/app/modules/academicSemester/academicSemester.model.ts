import { Schema, model } from 'mongoose'
import { TAcademicSemester } from './academicSemester.interface'
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './AcademicSemester.constant'
import AppError from '../../errors/AppError'
import status from 'http-status'

const academicSemesterSchema = new Schema<TAcademicSemester>(
  {
    name: { type: String, required: true, enum: AcademicSemesterName },
    year: { type: String, required: true },
    code: {
      type: String,
      enum: AcademicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: Months,
    },
    endMonth: { type: String, required: true, enum: Months },
  },
  { timestamps: true },
)

academicSemesterSchema.pre('save', async function (next) {
  const isSemesterExists = await AcademicSemesterModel.findOne({
    name: this.name,
    year: this.year,
  })

  if (isSemesterExists) {
    throw new AppError(status.CONFLICT, 'Semester is already exists')
  }

  next()
})

const AcademicSemesterModel = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSchema,
)

export default AcademicSemesterModel
