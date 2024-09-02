import { jwtVerify } from "../../middleware/jwtMiddleware.mjs";
import {
  getAllMillHistory,
  getByIdMillHistory,
  millHistoryFilter,
} from "./controller.mjs";
import { Router } from "express";

const borderMillHistoryRoutes = Router();

borderMillHistoryRoutes.get("/", jwtVerify, getAllMillHistory);
borderMillHistoryRoutes.get("/:borderId", jwtVerify, getByIdMillHistory);
borderMillHistoryRoutes.get("/filter/:borderId", jwtVerify, millHistoryFilter);

export default borderMillHistoryRoutes;
