import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { academicFacultyValidation } from './academicFaculty.validation'
import { academicFacultyControllers } from './academicFaculty.controller'

const router = Router()

router.post(
  '/create',
  validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyControllers.createAcademicFaculty,
)

router.get('/', academicFacultyControllers.getAllAcademicFaculty)
router.get('/:id', academicFacultyControllers.getSingleAcademicFaculty)
router.put(
  '/:id',
  validateRequest(academicFacultyValidation.academicFacultyValidationSchema),
  academicFacultyControllers.updateAcademicFaculty,
)

export const academicFacultyRouter = router
