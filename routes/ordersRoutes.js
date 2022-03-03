import express from "express";

import { getAllOrders, CreateOrder, getUserOrder } from "../controllers/orders";

import upload from "../middlewares/multer";

const router = express.Router();

// crued
router.get("/orders", async(req, res) => {
    const orders = await getAllOrders();
    res.render("AllOrders", { orders });
});
router.get("/my-orders", async(req, res) => {
    const user_id = res.locals.user.id;
    const orders = await getUserOrder(user_id);
    res.render("MyOrders", { orders });
});
router.post(
    "/create-order/:book_id/:user_id",
    upload.single("image"),
    CreateOrder
);

export default router;