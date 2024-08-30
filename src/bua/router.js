const { jwtVerify } = require("../../middleware/jwtMiddleware");
const {
  createBuaDetails,
  getBuaDocument,
  updateBuaDetails,
} = require("./controller");

const buaRoutes = require("express").Router();

buaRoutes.get("/", jwtVerify, getBuaDocument);
buaRoutes.post("/", jwtVerify, createBuaDetails);
buaRoutes.patch("/:buaId", jwtVerify, updateBuaDetails);

module.exports = buaRoutes;
