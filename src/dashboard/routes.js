const { jwtVerify } = require("../../middleware/jwtMiddleware");
const {
  getCurrentTotalController,
  getCurrentTotalControllerMonthlyFilter,
} = require("./controller");

const dashboardRoutes = require("express").Router();

dashboardRoutes.get("/", jwtVerify, getCurrentTotalController);
dashboardRoutes.get(
  "/filter",
  jwtVerify,
  getCurrentTotalControllerMonthlyFilter
);

module.exports = dashboardRoutes;
