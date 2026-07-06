import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { academicDepartmentValidation } from './academicDepartment.validation'
import { academicDepartmentControllers } from './academicDepartment.controller'

const router = Router()

router.post(
  '/create',
  // validateRequest(
  //   academicDepartmentValidation.academicDepartmentValidationSchema,
  // ),
  academicDepartmentControllers.createAcademicDepartment,
)

router.get('/', academicDepartmentControllers.getAllAcademicDepartment)
router.get('/:id', academicDepartmentControllers.getSingleAcademicDepartment)
router.patch(
  '/:id',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  academicDepartmentControllers.updateAcademicDepartment,
)

export const academicDepartmentRouter = router
