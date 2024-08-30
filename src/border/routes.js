const { jwtVerify } = require("../../middleware/jwtMiddleware");
const {
  createBorderListController,
  deleteBorderListController,
  getAllBorderListsController,
  getBorderListByIdController,
  updateBorderListController,
  getAllBorderListsMonthFilterController,
} = require("./controller");
const {
  balanceUpdate,
  transitionHistory,
  transitionHistoryFilter,
} = require("./transition/controller");

const borderRoutes = require("express").Router();

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

module.exports = borderRoutes;
