import { Router } from "express";
import { authenticate } from "../../auth/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/owner.middleware.js";
import * as controller from "../controllers/team-broadcaster.controller.js";

const router = Router();

router.use(authenticate);

// attach broadcaster to team
router.post("/", authorizeAdmin, controller.attachBroadcaster);

// detach broadcaster from team
router.delete("/", authorizeAdmin, controller.detachBroadcaster);

export default router;