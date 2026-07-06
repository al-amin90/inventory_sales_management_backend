/* eslint-disable @typescript-eslint/no-unused-vars */

import sendResponse from '../../utils/SendResponse'
import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import { offeredCourseServices } from './OfferedCourse.service'

const createOfferedCourse = catchAsync(async (req, res, next) => {
  const result = await offeredCourseServices.createOfferedCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Offered Course is create Successfully',
    data: result,
  })
})

const getAllOfferedCourse = catchAsync(async (req, res, next) => {
  const result = await offeredCourseServices.getAllOfferedCourseFromDB(
    req.query,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'All Offered Course Retrieve data Successfully',
    data: result,
  })
})

const getSingleOfferedCourse = catchAsync(async (req, res, next) => {
  const result = await offeredCourseServices.getSingleOfferedCourseFromDB(
    req.params.id,
  )
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Offered Course Retrieve single data Successfully',
    data: result,
  })
})

const updateOfferedCourse = catchAsync(async (req, res, next) => {
  const result = await offeredCourseServices.updateOfferedCourseInDB(
    req.params.id,
    req.body,
  )
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Offered Course Update data Successfully',
    data: result,
  })
})

const deleteOfferedCourse = catchAsync(async (req, res, next) => {
  const result = await offeredCourseServices.deleteOfferedCourseFromDB(
    req.params.id,
  )
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Offered Course Delete Successfully',
    data: result,
  })
})

export const offeredCourseControllers = {
  createOfferedCourse,
  getAllOfferedCourse,
  getSingleOfferedCourse,
  updateOfferedCourse,
  deleteOfferedCourse,
}
