import { Router } from 'express'
import { adminControllers } from './admin.controller'
import { updateAdminValidationSchema } from './admin.validate'
import validateRequest from '../../middlewares/validateRequest'

const router = Router()

router.get('/', adminControllers.getAllAdmin)
router.get('/:id', adminControllers.getSingleAdmin)
router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  adminControllers.updateSingleAdmin,
)
router.delete('/:id', adminControllers.deleteSingleAdmin)

const adminRouter = router

export default adminRouter
