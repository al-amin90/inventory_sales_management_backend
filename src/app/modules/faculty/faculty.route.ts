import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { facultyControllers } from './faculty.controller'
import { updateFacultyValidationSchema } from './faculty.validate'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = express.Router()

router.get('/', auth(USER_ROLE.admin), facultyControllers.getAllFaculty)
router.get('/:id', facultyControllers.getSingleFaculty)
router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  facultyControllers.updateSingleFaculty,
)
router.delete('/:id', facultyControllers.deleteSingleFaculty)

const facultyRouter = router

export default facultyRouter
