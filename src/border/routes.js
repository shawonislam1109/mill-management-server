const { jwtVerify } = require("../../middleware/jwtMiddleware");
const {
  createBorderListController,
  deleteBorderListController,
  getAllBorderListsController,
  getBorderListByIdController,
  updateBorderListController,
} = require("./controller");

const borderRoutes = require("express").Router();

borderRoutes.get("/", jwtVerify, getAllBorderListsController);
borderRoutes.get("/:borderId", jwtVerify, getBorderListByIdController);
borderRoutes.post("/", jwtVerify, createBorderListController);
borderRoutes.patch("/:borderId", jwtVerify, updateBorderListController);
borderRoutes.patch("/delete/:borderId", jwtVerify, deleteBorderListController);

module.exports = borderRoutes;
