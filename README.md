# Inventory & Sales Management Backend

A concise backend demonstrating role-based authentication and permission management for an inventory and sales system.

## Email Password

- Admin: admin@erp.com | Password: admin123
- Employee: employee@gmail.com | Password: 12345678
- Manager: manager@gmail.com | Password: 12345678
  **Create a new Role, then Give Permission to web in that role. Register with that role and test it. You also use Pre created Account**

**Features**

- **Role-Based Authentication**: Database-driven roles and permissions enforced via middleware `auth()` on routes (see [src/app/modules/role/role.route.ts](src/app/modules/role/role.route.ts)).
- **Dynamic Role & Permission Management**: Roles and module-level permissions stored in MongoDB and editable via APIs.
- **Modular Feature-Based Architecture**: Clear module separation (`auth`, `role`, `product`, `sale`, `user`, `dashboard`).
- **Generic Query Builder**: Search, filter, sort and pagination utilities in `app/builder/QueryBuilder.ts`.
- **Global Error Handler**: Centralized error handling via `GlobalErrorHandler` middleware.
- **Reusable utilities**: Helpers like `catchAsync`, `SendResponse`, `auth.utils` and validators.

**Role-Based Authentication (how it works)**

- Roles are defined by `IRole` and stored in MongoDB (`src/app/modules/role/role.model.ts`).
- Protected routes use the `auth(permissionModule, action)` middleware, e.g.:

```ts
router.patch(
  "/:id/module-permission",
  auth("Role", "edit"),
  validateRequest(RoleValidation.updateModulePermission),
  RoleController.updateModulePermission,
);
```

- The middleware checks the caller's JWT and verifies permissions against the role's `modules` permissions object. Tokens are created in `src/app/modules/auth/auth.utils.ts` and the core auth logic lives in `src/app/modules/auth/auth.service.ts`.

**Tech Stack**

- **Runtime & Language**: Node.js, TypeScript
- **Web Framework**: Express
- **DB**: MongoDB with Mongoose
- **Auth**: JWT (`jsonwebtoken`) + `bcrypt`/`bcryptjs` for password hashing
- **Validation**: `zod` (schema validation)
- **Build/Dev**: `tsup`, `tsx`, TypeScript

**Quick Setup**

1. Copy `.env.example` to `.env` and fill MongoDB URI and JWT secrets.
2. Install dependencies:

```bash
npm install
```

3. Run in dev mode:

```bash
npm run dev
```

**Usage / Examples**

- Create a role (admin/manager/employee) and assign module permissions.
- Create a user and assign the role ObjectId to the user's `role` field.
- Login to receive `accessToken` and `refreshToken`. Use `accessToken` in `Authorization: Bearer <token>` to access protected endpoints.

**Validation & Best Practices**

- **Proper Error Handling**: Global error handler returns consistent responses and HTTP status codes.
- **Input Validation**: Request payloads validated with `zod` and `validateRequest` middleware.
- **Protected APIs**: Use `auth(module, action)` middleware to protect routes and enforce fine-grained permissions.
- **Proper HTTP Status Codes**: Controllers use appropriate status codes for success and errors.
- **Consistent API Response Structure**: All responses use `SendResponse` helper for uniform shape.

If you want, I can add a short examples section with curl requests, or wire up a Postman collection next.
