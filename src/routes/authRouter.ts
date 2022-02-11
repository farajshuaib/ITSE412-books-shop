import express from "express";

import {
  signup_post,
  login_post,
  logout_get,
} from "../controllers/auth";

const router = express.Router();

/* GET home page. */
router.get("/signup", (req, res) => res.render("signup"));
router.post("/signup", signup_post);
router.get("/login", (req, res) => res.render("login"));
router.post("/login", login_post);
router.get("/logout", logout_get);

export default router;
