const { jwtVerify } = require("../../middleware/jwtMiddleware");
const { getCurrentTotalController } = require("./controller");

const dashboardRoutes = require("express").Router();

dashboardRoutes.get("/", jwtVerify, getCurrentTotalController);

module.exports = dashboardRoutes;
