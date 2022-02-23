import express from "express";
import { requireAuth } from "../middlewares/auth";
import { getAllSpecifications } from "../controllers/specialization";

const router = express.Router();

router.get("/", async(req, res) => res.render("home"));

router.get("/profile", async(req, res) => res.render("profile"));

router.get("/add-book", async(req, res) => res.render("add_book"));

export default router;