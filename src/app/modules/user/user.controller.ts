/* eslint-disable @typescript-eslint/no-unused-vars */
import userService from './user.service'
import sendResponse from '../../utils/SendResponse'
import status from 'http-status'
import catchAsync from '../../utils/catchAsync'

const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentDate } = req.body

  const result = await userService.createStudentDateIntoDB(
    password,
    studentDate,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student is create Successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req, res, next) => {
  const { password, faculty: facultyDate } = req.body

  const result = await userService.createFacultyDateIntoDB(
    password,
    facultyDate,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty is create Successfully',
    data: result,
  })
})

const createAdmin = catchAsync(async (req, res, next) => {
  const { password, admin: adminDate } = req.body

  const result = await userService.createAdminDateIntoDB(password, adminDate)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin is create Successfully',
    data: result,
  })
})

export default {
  createStudent,
  createFaculty,
  createAdmin,
}
