import status from 'http-status'
import AppError from '../../errors/AppError'
import { TSemesterRegistration } from './semesterRegistration.interface'
import SemesterRegistrationModel from './semesterRegistration.model'
import AcademicSemesterModel from '../academicSemester/academicSemester.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { RegistrationStatus } from './semesterRegistration.constant'
import OfferedCourseModel from '../OfferedCourse/OfferedCourse.model'
import mongoose from 'mongoose'

const createSemesterRegistrationIntoDB = async (
  payload: TSemesterRegistration,
) => {
  const academicSemester = payload.academicSemester

  const isThereAnyUpcomingOrOngoing = await SemesterRegistrationModel.findOne({
    $or: [
      { status: RegistrationStatus.UPCOMING },
      { status: RegistrationStatus.ONGOING },
    ],
  })

  if (isThereAnyUpcomingOrOngoing) {
    throw new AppError(
      status.BAD_REQUEST,
      `There is already a ${isThereAnyUpcomingOrOngoing?.status} Semester Exists`,
    )
  }

  const isAcademicSemesterExists =
    await AcademicSemesterModel.findById(academicSemester)

  if (!isAcademicSemesterExists) {
    throw new AppError(status.BAD_REQUEST, 'Academic Semester is Not Found')
  }

  const isSemesterRegistrationExists = await SemesterRegistrationModel.findOne({
    academicSemester,
  })

  if (isSemesterRegistrationExists) {
    throw new AppError(status.CONFLICT, 'This Semester is already registered')
  }

  const result = await SemesterRegistrationModel.create(payload)
  return result
}

const getAllSemesterRegistrationFromDB = async (
  query: Record<string, unknown>,
) => {
  const semesterRegistrationQuery = new QueryBuilder(
    SemesterRegistrationModel.find().populate('academicSemester'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await semesterRegistrationQuery.modelQuery
  return result
}

const getSingleSemesterRegistrationFromDB = async (id: string) => {
  const result = await SemesterRegistrationModel.findById(id)
  return result
}

const updateSemesterRegistrationInDB = async (
  id: string,
  payload: Partial<TSemesterRegistration>,
) => {
  const isSemesterRegistrationExists =
    await SemesterRegistrationModel.findById(id)
  if (!isSemesterRegistrationExists) {
    throw new AppError(status.NOT_FOUND, 'Semester Registration is Not Found')
  }
  const currentStatus = isSemesterRegistrationExists.status
  const requestedStatus = payload.status

  if (currentStatus === RegistrationStatus.ENDED) {
    throw new AppError(
      status.BAD_REQUEST,
      `The Semester is already ${currentStatus}`,
    )
  }
  if (
    currentStatus === RegistrationStatus.UPCOMING &&
    requestedStatus === RegistrationStatus.ENDED
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      `You can't directly change status from ${currentStatus} to ${requestedStatus}`,
    )
  }
  if (
    currentStatus === RegistrationStatus.ONGOING &&
    requestedStatus === RegistrationStatus.UPCOMING
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      `You can't directly change status from ${currentStatus} to ${requestedStatus}`,
    )
  }

  const result = await SemesterRegistrationModel.findByIdAndUpdate(
    id,
    payload,
    { new: true, runValidators: true },
  )

  return result
}

const deleteSemesterRegistrationFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    await OfferedCourseModel.deleteMany(
      {
        semesterRegistration: id,
      },
      { session },
    )

    const result = await SemesterRegistrationModel.findByIdAndDelete(id, {
      session,
    })
    if (!result) {
      throw new AppError(status.NOT_FOUND, 'Semester registration not found')
    }

    await session.commitTransaction()

    return result
  } catch (err) {
    await session.abortTransaction()
    throw err
  } finally {
    await session.endSession()
  }
}

export const semesterRegistrationServices = {
  createSemesterRegistrationIntoDB,
  getAllSemesterRegistrationFromDB,
  getSingleSemesterRegistrationFromDB,
  updateSemesterRegistrationInDB,
  deleteSemesterRegistrationFromDB,
}
