/* eslint-disable @typescript-eslint/no-unused-vars */

import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/SendResponse'
import { academicDepartmentServices } from './academicDepartment.service'

const createAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await academicDepartmentServices.createAcademicDepartmentIntoDB(req.body)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Department is create Successfully',
    data: result,
  })
})

const getAllAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await academicDepartmentServices.getAllAcademicDepartmentFromDB()

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All Academic Department Retrieve data Successfully',
    data: result,
  })
})

const getSingleAcademicDepartment = catchAsync(async (req, res, next) => {
  const result =
    await academicDepartmentServices.getSingleAcademicDepartmentFromDB(
      req.params.id,
    )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Department Retrieve single data Successfully',
    data: result,
  })
})

const updateAcademicDepartment = catchAsync(async (req, res, next) => {
  const result = await academicDepartmentServices.updateAcademicDepartmentInDB(
    req.params.id,
    req.body,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Department Update data Successfully',
    data: result,
  })
})

export const academicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartment,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
}
