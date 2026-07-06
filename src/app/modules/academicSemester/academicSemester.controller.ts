/* eslint-disable @typescript-eslint/no-unused-vars */

import sendResponse from '../../utils/SendResponse'
import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { academicSemesterServices } from './academicSemester.service'

const createAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester is create Successfully',
    data: result,
  })
})

const getAllAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServices.getAllAcademicSemesterFromDB()

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All Academic Semester Retrieve data Successfully',
    data: result,
  })
})

const getSingleAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServices.getSingleAcademicSemesterFromDB(
    req.params.id,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester Retrieve single data Successfully',
    data: result,
  })
})

const updateAcademicSemester = catchAsync(async (req, res, next) => {
  const result = await academicSemesterServices.updateAcademicSemesterInDB(
    req.params.id,
    req.body,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Semester Update data Successfully',
    data: result,
  })
})

export const academicSemesterControllers = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
}
