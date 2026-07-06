import { Router } from "express";
// import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { SaleController } from "./sale.controller";
import { SaleValidation } from "./sale.validation";
import auth from "../../middlewares/auth";

const router = Router();

router.post(
  "/",
  auth("Sale", "add"),
  validateRequest(SaleValidation.createSale),
  SaleController.createSale,
);

router.get("/", auth("Sale", "view"), SaleController.getAllSales);

export const saleRouter = router;
