import { Router } from "express";
import auth from "../../middlewares/auth";
import { DashboardController } from "./dashboard.controller";

const router = Router();

router.get(
  "/",
  auth("admin", "manager", "employee"),
  DashboardController.getDashboardStats,
);

export const dashboardRouter = router;
