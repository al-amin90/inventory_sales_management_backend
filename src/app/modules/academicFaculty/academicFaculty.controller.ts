/* eslint-disable @typescript-eslint/no-unused-vars */

import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/SendResponse'
import { academicFacultyServices } from './academicFaculty.service'

const createAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await academicFacultyServices.createAcademicFacultyIntoDB(
    req.body,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Faculty is create Successfully',
    data: result,
  })
})

const getAllAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await academicFacultyServices.getAllAcademicFacultyFromDB()

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All Academic Faculty Retrieve data Successfully',
    data: result,
  })
})

const getSingleAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await academicFacultyServices.getSingleAcademicFacultyFromDB(
    req.params.id,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Faculty Retrieve single data Successfully',
    data: result,
  })
})

const updateAcademicFaculty = catchAsync(async (req, res, next) => {
  const result = await academicFacultyServices.updateAcademicFacultyInDB(
    req.params.id,
    req.body,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Academic Faculty Update data Successfully',
    data: result,
  })
})

export const academicFacultyControllers = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
  getAllAcademicFaculty,
}
