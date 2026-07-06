import { status } from "http-status";
import catchAsync from "../../utils/catchAsync";
import { RoleService } from "./role.service";
import sendResponse from "../../utils/SendResponse";

const createRole = catchAsync(async (req, res) => {
  const result = await RoleService.createRole(req.body);

  sendResponse(res, {
    statusCode: status.CREATED,
    success: true,
    message: "Role created successfully",
    data: result,
  });
});

const getAllRoles = catchAsync(async (req, res) => {
  const result = await RoleService.getAllRoles(req.query);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Roles retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

const getRoleById = catchAsync(async (req, res) => {
  const result = await RoleService.getRoleById(req.params.id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Role retrieved successfully",
    data: result,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const result = await RoleService.updateRole(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Role updated successfully",
    data: result,
  });
});

const updateModulePermission = catchAsync(async (req, res) => {
  const result = await RoleService.updateModulePermission(
    req.params.id as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Module permission updated successfully",
    data: result,
  });
});

const deleteRole = catchAsync(async (req, res) => {
  await RoleService.deleteRole(req.params.id as string);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Role deleted successfully",
    data: null,
  });
});

export const RoleController = {
  createRole,
  getAllRoles,
  getRoleById,
  updateRole,
  updateModulePermission,
  deleteRole,
};
