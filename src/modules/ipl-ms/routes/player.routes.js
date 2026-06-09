import { Router } from "express";
import { authenticate } from "../../auth/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/owner.middleware.js";
import * as controller from "../controllers/player.controller.js";

const router = Router();

router.use(authenticate);

// create player
router.post("/", authorizeAdmin, controller.createPlayer);

// get all players
router.get("/", controller.getAllPlayers);

// get top 10 player by runs/sixes/fours/wickets/catches
router.get("/top", controller.getTopPlayers);

// get player by team id
router.get("/team", controller.getPlayersByTeam)

// get player by id
router.get("/:id", controller.getPlayerById);

// (update) transfer player 
router.patch("/transfer/:id", authorizeAdmin, controller.transferPlayer)

// update player role
router.patch("/:id/role", authorizeAdmin, controller.updatePlayerRole)

// update player stats
router.patch("/:id/stats", authorizeAdmin, controller.updatePlayerStats);

// delete player
router.delete("/:id", authorizeAdmin, controller.deletePlayer);

export default router;
