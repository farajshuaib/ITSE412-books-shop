import express from "express";

import { deleteUser, allUser, CreateUser, UpdateUser, getUserById } from "../controllers/users";

import upload from "../middlewares/multer";

const router = express.Router();

router.get("/add-user", (req, res) => res.render("add_user")); // add user form

router.get("/delete-user/:id", (req, res) => {
    res.render("deleteUser", { user_id: req.params.id });
});
router.get("/edit-user/:id", async(req, res) => {
    const user = await getUserById(req.params.id);
    res.render("edit_user", { user });
});

// crued
router.get("/users", async(req, res) => {
    const users = await allUser();
    res.render("users", { users });
});
router.post("/users/store", upload.single("image"), CreateUser);
router.post("/user/edit/:id", upload.single("image"), UpdateUser);
router.get("/user/delete/:id", deleteUser);

export default router;