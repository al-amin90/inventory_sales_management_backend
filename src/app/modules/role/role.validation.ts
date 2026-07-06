import { z } from "zod";

const MODULE_NAMES = ["Dashboard", "Role", "Product", "Sale"] as const;

const subModuleSchema = z.object({
  name: z.string().min(1),
  access: z.boolean().default(false),
  permissions: z.record(z.string(), z.boolean()).default({}),
});

const modulePermissionSchema = z.object({
  moduleName: z.enum(MODULE_NAMES),
  access: z.boolean().default(false),
  permissions: z
    .object({
      add: z.boolean().default(false),
      edit: z.boolean().default(false),
      delete: z.boolean().default(false),
      view: z.boolean().default(true),
    })
    .optional(),
  subModules: z.array(subModuleSchema).optional().default([]),
});

const createRole = z.object({
  body: z.object({
    roleName: z.string().min(1, "Role name is required").trim(),
    modules: z.array(modulePermissionSchema).optional().default([]),
  }),
});

const updateRole = z.object({
  body: z.object({
    roleName: z.string().min(1).trim().optional(),
    modules: z.array(modulePermissionSchema).optional(),
  }),
});

const updateModulePermission = z.object({
  body: z.object({
    moduleName: z.enum(MODULE_NAMES),
    access: z.boolean().optional(),
    permissions: z
      .object({
        add: z.boolean().optional(),
        edit: z.boolean().optional(),
        delete: z.boolean().optional(),
        view: z.boolean().optional(),
      })
      .optional(),
    subModules: z.array(subModuleSchema).optional(),
  }),
});

export const RoleValidation = {
  createRole,
  updateRole,
  updateModulePermission,
};
