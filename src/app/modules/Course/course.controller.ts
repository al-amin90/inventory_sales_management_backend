import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/SendResponse'
import { CourseServices } from './course.service'

const createCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Course Create Successfully',
    data: result,
  })
})

const getAllCourse = catchAsync(async (req, res) => {
  const result = await CourseServices.getAllCourseFromDB(req.query)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Course Retrieve data Successfully',
    data: result,
  })
})

const getSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await CourseServices.getSingleCourseFromDB(id)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Course Retrieve single data Successfully',
    data: result,
  })
})

const updateSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await CourseServices.updateCourseIntoDB(id, payload)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Course Update Successfully',
    data: result,
  })
})

const assignFaculties = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await CourseServices.assignFacultiesIntoDB(
    id,
    payload?.faculties,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Assign to course Successfully',
    data: result,
  })
})

const removeFaculties = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body

  const result = await CourseServices.removeFacultiesFromDB(
    id,
    payload?.faculties,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Remove Faculty From course Successfully',
    data: result,
  })
})

const deleteSingleCourse = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await CourseServices.deleteCourseIntoDB(id)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Delete Course single data Successfully',
    data: result,
  })
})

export const CourseControllers = {
  getAllCourse,
  getSingleCourse,
  deleteSingleCourse,
  createCourse,
  updateSingleCourse,
  assignFaculties,
  removeFaculties,
}
