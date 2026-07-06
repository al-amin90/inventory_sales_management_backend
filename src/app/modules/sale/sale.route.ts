import { Router } from "express";
// import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { SaleController } from "./sale.controller";
import { SaleValidation } from "./sale.validation";

const router = Router();

router.post(
  "/",
  // auth("admin", "manager", "employee"),
  validateRequest(SaleValidation.createSale),
  SaleController.createSale,
);

router.get(
  "/",
  // auth("admin", "manager"),
  SaleController.getAllSales,
);

export const SaleRoutes = router;
