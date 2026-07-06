import { Router } from "express";
// import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { ProductController } from "./product.controller";
import { upload } from "../../utils/upload";
import { ProductValidation } from "./product.validate";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  auth("Product", "add"),
  upload.single("image"),
  validateRequest(ProductValidation.createProduct),
  ProductController.createProduct,
);

router.get("/", auth("Product", "view"), ProductController.getAllProducts);

router.get(
  "/:id",

  ProductController.getProductById,
);

router.patch(
  "/:id",
  auth("Product", "edit"),
  upload.single("image"),
  validateRequest(ProductValidation.updateProduct),
  ProductController.updateProduct,
);

router.delete(
  "/:id",
  auth("Product", "delete"),
  ProductController.deleteProduct,
);

export const productRouter = router;
