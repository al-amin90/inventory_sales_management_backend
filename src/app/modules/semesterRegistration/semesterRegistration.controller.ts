/* eslint-disable @typescript-eslint/no-unused-vars */

import sendResponse from '../../utils/SendResponse'
import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { semesterRegistrationServices } from './semesterRegistration.service'

const createSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await semesterRegistrationServices.createSemesterRegistrationIntoDB(
      req.body,
    )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester Registration is create Successfully',
    data: result,
  })
})

const getAllSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await semesterRegistrationServices.getAllSemesterRegistrationFromDB(
      req.query,
    )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All Semester Registration Retrieve data Successfully',
    data: result,
  })
})

const getSingleSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await semesterRegistrationServices.getSingleSemesterRegistrationFromDB(
      req.params.id,
    )
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester Registration Retrieve single data Successfully',
    data: result,
  })
})

const updateSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await semesterRegistrationServices.updateSemesterRegistrationInDB(
      req.params.id,
      req.body,
    )
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester Registration Update data Successfully',
    data: result,
  })
})

const deleteSemesterRegistration = catchAsync(async (req, res, next) => {
  const result =
    await semesterRegistrationServices.deleteSemesterRegistrationFromDB(
      req.params.id,
    )
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Semester Registration && Offered Course Delete Successfully',
    data: result,
  })
})

export const semesterRegistrationControllers = {
  createSemesterRegistration,
  getAllSemesterRegistration,
  getSingleSemesterRegistration,
  updateSemesterRegistration,
  deleteSemesterRegistration,
}
