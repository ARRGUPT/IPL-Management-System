import { Router } from "express";
import * as controller from "../controllers/owner.controller.js";
import { authenticate } from "../../auth/auth.middleware.js";
import { authorizeAdmin } from "../middlewares/owner.middleware.js"

const router = Router();

// add authenticate
router.use(authenticate);

// Create a new owner
router.post("/", authorizeAdmin, controller.createOwner);

// Get all owners
router.get("/", controller.getAllOwner);

// get owner by id
router.get("/:id", controller.getOwnerById);

// update owner
router.put("/:id", authorizeAdmin, controller.updateOwner);

// delete owner
router.delete("/:id", authorizeAdmin, controller.deleteOwner);

export default router;
