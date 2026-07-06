import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import type { IRole, TModuleName } from "./role.interface";

import { Role } from "./role.model";

const createRole = async (payload: Partial<IRole>) => {
  if (!payload.roleName) {
    throw new AppError(400, "Role name is required");
  }

  const exists = await Role.findOne({
    roleName: payload.roleName,
    isDeletedRole: false,
  });

  if (exists) throw new AppError(409, "Role with this name already exists");

  return await Role.create(payload);
};

const getAllRoles = async (query: Record<string, unknown>) => {
  const roleQuery = new QueryBuilder(Role.find({ isDeletedRole: false }), query)
    .search(["roleName"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await roleQuery.countTotal();
  const data = await roleQuery.modelQuery;
  return { meta, data };
};

const getRoleById = async (id: string) => {
  const role = await Role.findOne({ _id: id, isDeletedRole: false });
  if (!role) throw new AppError(404, "Role not found");
  return role;
};

const updateRole = async (id: string, payload: Partial<IRole>) => {
  const role = await Role.findOne({ _id: id, isDeletedRole: false });
  if (!role) throw new AppError(404, "Role not found");

  // Duplicate name check — exclude current doc
  if (payload.roleName) {
    const duplicate = await Role.findOne({
      roleName: payload.roleName,
      _id: { $ne: id },
      isDeletedRole: false,
    });
    if (duplicate) throw new AppError(409, "Role name already taken");
  }

  return await Role.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
};

const updateModulePermission = async (
  id: string,
  payload: {
    moduleName: TModuleName;
    access?: boolean;
    permissions?: Record<string, boolean>;
    subModules?: {
      name: string;
      access?: boolean;
      permissions: Record<string, boolean>;
    }[];
  },
) => {
  const role = await Role.findOne({ _id: id, isDeletedRole: false });
  if (!role) throw new AppError(404, "Role not found");

  const { moduleName, access, permissions, subModules } = payload;
  const moduleIndex = role.modules.findIndex(
    (m) => m.moduleName === moduleName,
  );

  if (moduleIndex !== -1) {
    const existingModule = role.modules[moduleIndex]!;

    if (access !== undefined) existingModule.access = access;

    if (permissions) {
      existingModule.permissions = {
        ...existingModule.permissions,
        ...permissions,
      };
    }

    if (subModules && Array.isArray(subModules)) {
      subModules.forEach((updatedSub) => {
        const subIndex = existingModule.subModules.findIndex(
          (sm) => sm.name === updatedSub.name,
        );
        if (subIndex !== -1) {
          const existing = existingModule.subModules[subIndex]!;
          existingModule.subModules[subIndex] = {
            ...existing,
            access: updatedSub.access ?? existing.access,
            permissions: {
              ...(existing.permissions ?? {}),
              ...updatedSub.permissions,
            },
          };
        } else {
          existingModule.subModules.push({
            name: updatedSub.name,
            access: updatedSub.access ?? false,
            permissions: updatedSub.permissions ?? {},
          });
        }
      });
    }

    role.modules[moduleIndex] = existingModule;
  } else {
    role.modules.push({
      moduleName,
      access: access ?? false,
      permissions: {
        add: false,
        edit: false,
        delete: false,
        view: true,
        ...(permissions || {}),
      },
      subModules:
        (subModules?.map((sub) => ({
          name: sub.name,
          access: sub.access ?? false,
          permissions: sub.permissions ?? {},
        })) as any) || [],
    });
  }

  return await role.save();
};

const deleteRole = async (id: string) => {
  const role = await Role.findOne({ _id: id, isDeletedRole: false });
  if (!role) throw new AppError(404, "Role not found");

  // Soft delete
  return await Role.findByIdAndUpdate(
    id,
    { isDeletedRole: true },
    { new: true },
  );
};

export const RoleService = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  updateModulePermission,
  deleteRole,
};
