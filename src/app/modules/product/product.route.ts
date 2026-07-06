import { Router } from "express";
// import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { ProductController } from "./product.controller";
import { upload } from "../../utils/upload";
import { ProductValidation } from "./product.validate";

const router = Router();

router.post(
  "/",
  // auth("admin", "manager"),
  upload.single("image"),
  validateRequest(ProductValidation.createProduct),
  ProductController.createProduct,
);

router.get(
  "/",
  // auth("admin", "manager", "employee"),
  ProductController.getAllProducts,
);

router.get(
  "/:id",
  // auth("admin", "manager", "employee"),
  ProductController.getProductById,
);

router.patch(
  "/:id",
  // auth("admin", "manager"),
  upload.single("image"),
  validateRequest(ProductValidation.updateProduct),
  ProductController.updateProduct,
);

router.delete(
  "/:id",
  // auth("admin"),
  ProductController.deleteProduct,
);

export const productRouter = router;
