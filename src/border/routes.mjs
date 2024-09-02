import { jwtVerify } from "../../middleware/jwtMiddleware.mjs";
import {
  createBorderListController,
  deleteBorderListController,
  getAllBorderListsController,
  getBorderListByIdController,
  updateBorderListController,
  getAllBorderListsMonthFilterController,
} from "./controller.mjs";
import {
  balanceUpdate,
  transitionHistory,
  transitionHistoryFilter,
} from "./transition/controller.mjs";
import { Router } from "express";

const borderRoutes = Router();

borderRoutes.get("/", jwtVerify, getAllBorderListsController);
borderRoutes.get("/filter", jwtVerify, getAllBorderListsMonthFilterController);
borderRoutes.get("/:borderId", jwtVerify, getBorderListByIdController);
borderRoutes.get("/transition-history/:borderId", jwtVerify, transitionHistory);
borderRoutes.get(
  "/transition-history/filter/:borderId/",
  jwtVerify,
  transitionHistoryFilter
);
borderRoutes.post("/", jwtVerify, createBorderListController);
borderRoutes.patch("/:borderId", jwtVerify, updateBorderListController);
borderRoutes.patch("/balance-add/:borderId", jwtVerify, balanceUpdate);
borderRoutes.patch("/delete/:borderId", jwtVerify, deleteBorderListController);

export default borderRoutes;
