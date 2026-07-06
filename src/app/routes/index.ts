import { Router } from "express";
import { productRouter } from "../modules/product/product.route";

const router = Router();

const moduleRouters = [
  {
    path: "/product",
    route: productRouter,
  },
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
