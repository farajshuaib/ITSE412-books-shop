import express from "express";

import {
    getAllOrders,
    CreateOrder,
    getUserOrder,
    getOrdersLastMonth,
} from "../controllers/orders";

import upload from "../middlewares/multer";

const router = express.Router();

router.get("/getOrdersLattMonth", async(req, res) => {
    const orders = await getOrdersLastMonth();
    res.json(orders);
});

// crued
router.get("/orders", async(req, res) => {
    const orders = await getAllOrders(req, res);
    const orders_ammount_last_month = await getOrdersLastMonth(req, res);
    res.render("AllOrders", { orders, orders_ammount_last_month });
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