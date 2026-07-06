import { Router } from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { RoleController } from "./role.controller";
import { RoleValidation } from "./role.validation";

const router = Router();

router.post(
  "/",
  // auth("Role", "add"),
  validateRequest(RoleValidation.createRole),
  RoleController.createRole,
);

router.get("/", RoleController.getAllRoles);

router.get("/:id", RoleController.getRoleById);

router.patch(
  "/:id",
  auth("Role", "edit"),
  validateRequest(RoleValidation.updateRole),
  RoleController.updateRole,
);

// Module-level permission update — separate endpoint
router.patch(
  "/:id/module-permission",
  auth("Role", "edit"),
  validateRequest(RoleValidation.updateModulePermission),
  RoleController.updateModulePermission,
);

router.delete("/:id", auth("Role", "delete"), RoleController.deleteRole);

export const roleRouter = router;
