import { Router } from "express";
import { authenticate } from "../../auth/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/owner.middleware.js";
import * as controller from "../controllers/team-sponsor.controller.js";

const router = Router();

router.use(authenticate);

// attach sponsor to team
router.post("/", authorizeAdmin, controller.attachSponsor);

// detach sponsor from team
router.delete("/", authorizeAdmin, controller.detachSponsor);

export default router;
