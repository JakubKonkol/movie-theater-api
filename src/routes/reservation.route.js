import express from "express";
import {get, getById, create, update, patch, remove} from "../controllers/reservation.controller.js";

const router = express.Router();

router.get("/", get);
router.get("/:id", getById);
router.post("/", create);
router.put("/:id", update);
router.patch("/:id", patch);
router.delete("/:id", remove);

export default router;