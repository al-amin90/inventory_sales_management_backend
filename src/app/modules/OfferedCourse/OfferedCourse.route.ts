import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { offeredCourseControllers } from './OfferedCourse.controller'
import { offeredCourseValidations } from './OfferedCourse.validation'

const router = Router()

router.post(
  '/create',
  validateRequest(offeredCourseValidations.createOfferedCourseValidationSchema),
  offeredCourseControllers.createOfferedCourse,
)

router.get('/', offeredCourseControllers.getAllOfferedCourse)

router.get('/:id', offeredCourseControllers.getSingleOfferedCourse)

router.patch(
  '/:id',
  validateRequest(offeredCourseValidations.updateOfferedCourseValidationSchema),
  offeredCourseControllers.updateOfferedCourse,
)
router.delete('/:id', offeredCourseControllers.deleteOfferedCourse)

export const offeredCourseRouter = router
