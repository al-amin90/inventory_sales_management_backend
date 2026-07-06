import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { semesterRegistrationValidation } from './semesterRegistration.validation'
import { semesterRegistrationControllers } from './semesterRegistration.controller'

const router = Router()

router.post(
  '/create',
  validateRequest(semesterRegistrationValidation.semesterRegistrationZodSchema),
  semesterRegistrationControllers.createSemesterRegistration,
)

router.get('/', semesterRegistrationControllers.getAllSemesterRegistration)

router.get(
  '/:id',
  semesterRegistrationControllers.getSingleSemesterRegistration,
)

router.patch(
  '/:id',
  validateRequest(
    semesterRegistrationValidation.updateSemesterRegistrationZodSchema,
  ),
  semesterRegistrationControllers.updateSemesterRegistration,
)
router.delete(
  '/:id',
  semesterRegistrationControllers.deleteSemesterRegistration,
)

export const semesterRegistrationRouter = router
