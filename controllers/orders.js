import express from "express";
import path from "path";

import { prisma } from "../index";

import moment from "moment";

const getOrdersLastMonth = async(req, res) => {
    let total_orders_ammount = 0;
    try {
        const orders = await prisma.orders.findMany({
            where: {
                created_at: {
                    gte: moment().subtract(1, "month").format("YYYY-MM-DD"), // it will retreav the last month date
                    lt: moment().add(1, "day").format("YYYY-MM-DD"), // tomorrow data
                },
            },
        });

        orders.forEach((order) => {
            total_orders_ammount += +order.total_amount;
        });

        return total_orders_ammount
    } catch (error) {
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

const getAllOrders = async(req, res) => {
    const date = req.query.date || undefined;
    try {
        const orders = await prisma.orders.findMany({
            where: {
                created_at: {
                    gte: moment(date).subtract(1, "month").format("YYYY-MM-DD"), // it will retreav the last month date
                    lt: moment(date).add(1, "day").format("YYYY-MM-DD"), // tomorrow data
                },
            },
            include: {
                users: true,
                books: true,
            },
        });
        return orders;
    } catch (error) {
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

const getUserOrder = async(user_id) => {
    try {
        const orders = await prisma.orders.findMany({
            where: {
                user_id,
            },
            include: {
                users: true,
                books: true,
            },
        });
        return orders;
    } catch (error) {
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

const CreateOrder = async(req, res) => {
    try {
        const { quantity } = req.body;

        let currentBook = await prisma.books.findUnique({
            where: {
                id: +req.params.book_id,
            },
        });

        const order = await prisma.orders.create({
            data: {
                user_id: +req.params.user_id,
                book_id: +req.params.book_id,
                quantity: +quantity,
                total_amount: +quantity * +currentBook.price,
                created_at: moment().format("YYYY-MM-DD"),
            },
        });
        if (order) {
            res.redirect("/success");
        } else {
            res.status(421).render("error");
        }
    } catch (error) {
        console.log("create order error", error);
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

const getOrderById = async(order_id) => {
    try {
        const order = await prisma.orders.findUnique({
            where: {
                id: +order_id,
            },
            include: {
                specializations: true,
            },
        });
        return order;
    } catch (error) {
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

export {
    getAllOrders,
    CreateOrder,
    getOrderById,
    getUserOrder,
    getOrdersLastMonth,
};