import { Router } from "express";
import { authenticate } from "../../auth/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/owner.middleware.js";
import * as controller from "../controllers/broadcaster.controller.js";

const router = Router();

router.use(authenticate);

// create broadcaster
router.post("/", authorizeAdmin, controller.createBroadcaster);

// get all broadcasters
router.get("/", controller.getAllBroadcasters);

// get broadcaster by id
router.get("/:id", controller.getBroadcasterById);

// update broadcaster
router.put("/:id", authorizeAdmin, controller.updateBroadcaster);

// delete broadcaster
router.delete("/:id", authorizeAdmin, controller.deleteBroadcaster);

export default router;