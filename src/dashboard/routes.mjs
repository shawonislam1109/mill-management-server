import { jwtVerify } from "../../middleware/jwtMiddleware.mjs";
import {
  getCurrentTotalController,
  getCurrentTotalControllerMonthlyFilter,
} from "./controller.mjs";
import { Router } from "express";

const dashboardRoutes = Router();

dashboardRoutes.get("/", jwtVerify, getCurrentTotalController);
dashboardRoutes.get(
  "/filter",
  jwtVerify,
  getCurrentTotalControllerMonthlyFilter
);

export default dashboardRoutes;
