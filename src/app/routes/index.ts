import { Router } from "express";
import { productRouter } from "../modules/product/product.route";
import { authRouter } from "../modules/auth/auth.route";

const router = Router();

const moduleRouters = [
  {
    path: "/auth",
    route: authRouter,
  },
  {
    path: "/product",
    route: productRouter,
  },
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
