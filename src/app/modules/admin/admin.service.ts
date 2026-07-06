import status from 'http-status'
import QueryBuilder from '../../builder/QueryBuilder'
import { searchableFields } from './admin.constant'
import AdminModal from './admin.model'
import mongoose from 'mongoose'
import AppError from '../../errors/AppError'
import { UserModel } from '../user/user.model'
import { TAdmin } from './admin.interface'

const getAllAdminFromDB = async (query: Record<string, unknown>) => {
  const AdminQuery = new QueryBuilder(AdminModal.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()

  const result = await AdminQuery.modelQuery
  return result
}

const getSingleAdminFromDB = async (id: string) => {
  const result = await AdminModal.findOne({ id: id })

  return result
}

const updateAdminInDB = async (id: string, payload: Partial<TAdmin>) => {
  const { name, ...remainingData } = payload

  const modifiedData: Record<string, unknown> = { ...remainingData }

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedData[`name.${key}`] = value
    }
  }

  const result = await AdminModal.findOneAndUpdate({ id: id }, modifiedData, {
    new: true,
  })
  return result
}

const deleteAdminFromDB = async (id: string) => {
  const session = await mongoose.startSession()

  try {
    session.startTransaction()

    if (!(await AdminModal.isUserExist2(id))) {
      throw new AppError(status.NOT_FOUND, 'Admin is not found')
    }
    const result = await AdminModal.findOneAndUpdate(
      { id: id },
      { isDeleted: true },
      { new: true, session },
    )

    if (!result) {
      throw new AppError(status.BAD_GATEWAY, 'Failed to delete Admin')
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

export const adminServices = {
  getAllAdminFromDB,
  getSingleAdminFromDB,
  deleteAdminFromDB,
  updateAdminInDB,
}
