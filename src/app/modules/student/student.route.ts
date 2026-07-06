import express from 'express'
import { studentControllers } from './student.controller'
import validateRequest from '../../middlewares/validateRequest'
import { updateStudentValidationSchema } from './student.validate'

const studentRouter = express.Router()

studentRouter.get('/', studentControllers.getAllStudent)
studentRouter.get('/:id', studentControllers.getSingleStudent)
studentRouter.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  studentControllers.updateSingleStudent,
)
studentRouter.delete('/:id', studentControllers.deleteSingleStudent)

export default studentRouter
