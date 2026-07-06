import { Types } from "mongoose";

export interface ISubModule {
  name: string;
  access: boolean;
  permissions: Record<string, boolean>;
}

export type TModuleName = "Dashboard" | "Role" | "Product" | "Sale";

export interface IModulePermission {
  moduleName: TModuleName;
  access: boolean;
  permissions: {
    add: boolean;
    edit: boolean;
    delete: boolean;
    view: boolean;
  };
  subModules: ISubModule[];
}

export interface IRole {
  _id?: Types.ObjectId;
  roleName: string;
  modules: IModulePermission[];
  isDeletedRole: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  hasPermission(
    moduleName: string,
    action: string,
    subModuleName?: string | null,
  ): boolean;
  getPermissionsObject(): Record<string, unknown>;
}
