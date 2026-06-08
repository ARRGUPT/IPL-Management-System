import { Router } from "express";
import * as controller from "../controllers/team.controller.js"
import { authenticate } from "../../auth/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/owner.middleware.js";

const router = Router();

router.use(authenticate);

// create Team 
router.post("/", authorizeAdmin, controller.createTeam)

// get All Teams 
router.get("/", controller.getAllTeams)

// get All Teams By OwnerId
router.get("/owner", controller.getAllTeamsByOwnerId)

// get Team By Id 
router.get("/:id", controller.getTeamById)

// update Team
router.put("/:id", authorizeAdmin, controller.updateTeam)

// delete Team
router.delete("/:id", authorizeAdmin, controller.deleteTeam)

export default router