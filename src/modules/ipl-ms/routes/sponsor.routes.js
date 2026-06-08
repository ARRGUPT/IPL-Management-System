import { Router } from "express";
import { authenticate } from "../../auth/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/owner.middleware.js";
import * as controller from "../controllers/sponsor.controller.js"

const router = Router();

router.use(authenticate);

//create sponsor
router.post("/", authorizeAdmin, controller.createSponsor);

// get all sponsor
router.get("/", controller.getAllSponsors);

// get sponsor by id
router.get("/:id", controller.getSponsorById);

// update sponsor
router.put("/:id", authorizeAdmin, controller.updateSponsor);

// delete sponsor
router.delete("/:id", authorizeAdmin, controller.deleteSponsor);

export default router;
