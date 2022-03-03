import express from "express";

import {
    signup_post,
    login_post,
    logout_get,
} from "../controllers/auth.js";

const router = express.Router();

// pages
router.get("/signup", (req, res) => res.render("signup"));
router.get("/login", (req, res) => res.render("login"));


// controllers
router.post("/signup", signup_post);
router.post("/login", login_post);
router.get("/logout", logout_get);

export default router;