import status from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/SendResponse'
import { adminServices } from './admin.service'

const getAllAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.getAllAdminFromDB(req.query)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin Retrieve data Successfully',
    data: result,
  })
})

const getSingleAdmin = catchAsync(async (req, res) => {
  const result = await adminServices.getSingleAdminFromDB(
    req.params.id as string,
  )

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin Retrieve single data Successfully',
    data: result,
  })
})

const updateSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params
  const { admin } = req.body

  const result = await adminServices.updateAdminInDB(id, admin)

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Admin Update Successfully',
    data: result,
  })
})

const deleteSingleAdmin = catchAsync(async (req, res) => {
  const { id } = req.params

  const result = await adminServices.deleteAdminFromDB(id)
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Delete Admin single data Successfully',
    data: result,
  })
})
export const adminControllers = {
  getSingleAdmin,
  getAllAdmin,
  updateSingleAdmin,
  deleteSingleAdmin,
}
