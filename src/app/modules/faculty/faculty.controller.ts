import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/SendResponse'
import { facultyService } from './faculty.service'

const getAllFaculty = catchAsync(async (req, res) => {
  const result = await facultyService.getAllFacultyFromDB(req.query)
  console.log('df', req.cookies)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty Retrieve data Successfully',
    data: result,
  })
})

const getSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await facultyService.getSingleFacultyFromDB(id)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty Retrieve single data Successfully',
    data: result,
  })
})

const updateSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params
  const { faculty } = req.body

  const result = await facultyService.updateFacultyInDB(id, faculty)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Faculty Update Successfully',
    data: result,
  })
})

const deleteSingleFaculty = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await facultyService.deleteFacultyFromDB(id)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Delete Faculty single data Successfully',
    data: result,
  })
})

export const facultyControllers = {
  getAllFaculty,
  getSingleFaculty,
  deleteSingleFaculty,
  updateSingleFaculty,
}
