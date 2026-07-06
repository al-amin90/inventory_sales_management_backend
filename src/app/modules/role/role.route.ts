import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { RoleController } from "./role.controller";
import { RoleValidation } from "./role.validation";

const router = Router();

router.post(
  "/",
  // auth("admin"),
  validateRequest(RoleValidation.createRole),
  RoleController.createRole,
);

router.get("/", auth("admin", "manager"), RoleController.getAllRoles);

router.get("/:id", auth("admin", "manager"), RoleController.getRoleById);

router.patch(
  "/:id",
  auth("admin"),
  validateRequest(RoleValidation.updateRole),
  RoleController.updateRole,
);

// Module-level permission update — separate endpoint
router.patch(
  "/:id/module-permission",
  auth("admin"),
  validateRequest(RoleValidation.updateModulePermission),
  RoleController.updateModulePermission,
);

router.delete("/:id", auth("admin"), RoleController.deleteRole);

export const roleRouter = router;
