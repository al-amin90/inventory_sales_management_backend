import { Router } from "express";
import { productRouter } from "../modules/product/product.route";
import { authRouter } from "../modules/auth/auth.route";
import { saleRouter } from "../modules/sale/sale.route";
import { dashboardRouter } from "../modules/dashboard/dashboard.route";
import { roleRouter } from "../modules/role/role.route";

const router = Router();

const moduleRouters = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/role",
    route: roleRouter,
  },
  {
    path: "/product",
    route: productRouter,
  },
  {
    path: "/sale",
    route: saleRouter,
  },
  {
    path: "/dashboard",
    route: dashboardRouter,
  },
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
