import mongoose, { model } from "mongoose";
import type { IRole } from "./role.interface";

const subModuleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    access: { type: Boolean, default: false },
    permissions: { type: Object, default: () => ({}) },
  },
  { _id: false },
);

const modulePermissionSchema = new mongoose.Schema(
  {
    moduleName: {
      type: String,
      required: true,
      enum: ["Dashboard", "Role", "Product", "Sale"],
    },
    access: { type: Boolean, default: false },
    permissions: {
      add: { type: Boolean },
      edit: { type: Boolean },
      delete: { type: Boolean },
      view: { type: Boolean },
    },
    subModules: [subModuleSchema],
  },
  { _id: false },
);

const roleSchema = new mongoose.Schema<IRole>(
  {
    roleName: { type: String, required: true, trim: true },
    modules: [modulePermissionSchema],
    isDeletedRole: { type: Boolean, default: false },
  },
  { timestamps: true },
);

roleSchema.index({ roleName: 1 }, { unique: true });

roleSchema.methods.hasPermission = function (
  moduleName: string,
  action: string,
  subModuleName: string | null = null,
) {
  const module = this.modules.find((m: any) => m.moduleName === moduleName);
  if (!module || !module.access) return false;

  if (subModuleName) {
    const subModule = module.subModules.find(
      (sm: any) => sm.name === subModuleName,
    );
    if (!subModule) return false;
    return subModule.permissions[action] === true;
  }

  return module.permissions[action] === true;
};

roleSchema.methods.getPermissionsObject = function () {
  const permissions: Record<string, unknown> = {};
  this.modules.forEach((module: any) => {
    permissions[module.moduleName] = {
      access: module.access,
      permissions: module.permissions,
      subModules: {},
    };
    module.subModules.forEach((subModule: any) => {
      (permissions[module.moduleName] as any).subModules[subModule.name] =
        subModule.permissions;
    });
  });
  return permissions;
};

export const Role = model<IRole>("Role", roleSchema);
