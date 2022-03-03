import express from "express";
import { requireAuth } from "../middlewares/auth";
import { getAllSpecifications } from "../controllers/specialization";

import { getBookById } from "../controllers/books";

const router = express.Router();

router.get("/", (req, res) => {
    // if user is an admin or library employee then we'll navigate to the dashboard else will render the home page for the client
    if (!res.locals.user) {
        res.render("home");
        return;
    }
    if (res.locals.user.rule == 1 || res.locals.user.rule == 2) {
        res.render("dashboard");
    } else {
        res.render("home");
    }
});
// router.get("/dashboard", async(req, res) => res.render("dashboard"));


router.get("/success", (req, res) => { res.render("success", { message: "" }) })
router.get("/error", (req, res) => { res.render("error", { message: "" }) })


export default router;