import { jwtVerify } from "../../middleware/jwtMiddleware.mjs";
import {
  createBuaDetails,
  getBuaDocument,
  updateBuaDetails,
} from "./controller.mjs";
import { Router } from "express";

const buaRoutes = Router();

buaRoutes.get("/", jwtVerify, getBuaDocument);
buaRoutes.post("/", jwtVerify, createBuaDetails);
buaRoutes.patch("/:buaId", jwtVerify, updateBuaDetails);

export default buaRoutes;
