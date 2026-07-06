import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import status from 'http-status'
import { UserModel } from '../user/user.model'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableFields } from './faculty.constant'
import FacultyModal from './faculty.model'
import { TFaculty } from './faculty.interface'

const getAllFacultyFromDB = async (query: Record<string, unknown>) => {
  const FacultyQuery = new QueryBuilder(
    FacultyModal.find().populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    }),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await FacultyQuery.modelQuery
  return result
}

const getSingleFacultyFromDB = async (id: string) => {
  const result = await FacultyModal.findOne({ id: id }).populate({
    path: 'academicDepartment',
    populate: {
      path: 'academicFaculty',
    },
  })
  return result
}

const updateFacultyInDB = async (id: string, payload: Partial<TFaculty>) => {
  const { name, ...remainingData } = payload

  const modifiedData: Record<string, unknown> = { ...remainingData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value
    }
  }

  const result = await FacultyModal.findOneAndUpdate({ id: id }, modifiedData, {
    new: true,
  })
  return result
}

const deleteFacultyFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (!(await FacultyModal.isUserExist2(id))) {
      throw new AppError(status.NOT_FOUND, 'Faculty is not found')
    }
    const result = await FacultyModal.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!result) {
      throw new AppError(status.BAD_GATEWAY, 'Failed to delete Faculty')
    }

    const result2 = await UserModel.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    )
    if (!result2) {
      throw new AppError(status.BAD_GATEWAY, 'Failed to delete User')
    }

    await session.commitTransaction()
    return result
  } catch (err) {
    console.log('err', err)
    await session.abortTransaction()
    throw err
  } finally {
    await session.endSession()
  }
}

export const facultyService = {
  getAllFacultyFromDB,
  deleteFacultyFromDB,
  updateFacultyInDB,
  getSingleFacultyFromDB,
}
