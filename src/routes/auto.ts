import * as express from "express";
import {
  autos_get,
  auto_get,
  auto_post,
  auto_put,
  auto_delete,
} from "../controllers/auto";

const autoRouter = express.Router();

autoRouter.get("/all", autos_get);
autoRouter.get("/", auto_get);
autoRouter.post("/", auto_post);
autoRouter.put("/", auto_put);
autoRouter.delete("/", auto_delete);

export { autoRouter };
