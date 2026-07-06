import express from 'express'
import { CourseControllers } from './course.controller'
import validateRequest from '../../middlewares/validateRequest'
import { CourseValidations } from './course.validation'

const router = express.Router()

router.post(
  '/create',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
)
router.get('/', CourseControllers.getAllCourse)
router.get('/:id', CourseControllers.getSingleCourse)
router.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateSingleCourse,
)

router.put(
  '/:id/assign-faculties',
  validateRequest(CourseValidations.assignFacultiesValidationSchema),
  CourseControllers.assignFaculties,
)
router.delete(
  '/:id/remove-faculties',
  validateRequest(CourseValidations.assignFacultiesValidationSchema),
  CourseControllers.removeFaculties,
)

router.delete('/:id', CourseControllers.deleteSingleCourse)

const courseRouter = router

export default courseRouter
