const { jwtVerify } = require("../../middleware/jwtMiddleware");
const {
  getAllMillHistory,
  getByIdMillHistory,
  millHistoryFilter,
} = require("./controller");

const borderMillHistoryRoutes = require("express").Router();

borderMillHistoryRoutes.get("/", jwtVerify, getAllMillHistory);
borderMillHistoryRoutes.get("/:borderId", jwtVerify, getByIdMillHistory);
borderMillHistoryRoutes.get("/filter/:borderId", jwtVerify, millHistoryFilter);

module.exports = borderMillHistoryRoutes;
