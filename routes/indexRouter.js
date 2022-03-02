import express from "express";
import { requireAuth } from "../middlewares/auth";
import { getAllSpecifications } from "../controllers/specialization";

const router = express.Router();

router.get("/", (req, res) => {
    console.log("res.locals.user", res.locals.user);
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
router.get("/add-book", (req, res) => res.render("add_book"));
router.get("/show-books", (req, res) => res.render("all_books"));
router.get("/edit-book", (req, res) => res.render("edit_book"));

export default router;