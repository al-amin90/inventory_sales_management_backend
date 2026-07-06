/* eslint-disable @typescript-eslint/no-unused-vars */
import { studentService } from './student.service'
import sendResponse from '../../utils/SendResponse'
import status from 'http-status'
import catchAsync from '../../utils/catchAsync'

const getAllStudent = catchAsync(async (req, res, next) => {
  const result = await studentService.getAllStudentFromDB(req.query)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student Retrieve data Successfully',
    data: result,
  })
})

const getSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const result = await studentService.getSingleStudentFromDB(id)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student Retrieve single data Successfully',
    data: result,
  })
})

const updateSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params
  const { student } = req.body

  const result = await studentService.updateStudentInDB(id, student)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Student Update Successfully',
    data: result,
  })
})

const deleteSingleStudent = catchAsync(async (req, res, next) => {
  const { id } = req.params

  const result = await studentService.deleteStudentFromDB(id)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Delete Student single data Successfully',
    data: result,
  })
})

export const studentControllers = {
  getAllStudent,
  getSingleStudent,
  deleteSingleStudent,
  updateSingleStudent,
}
