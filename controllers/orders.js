import express from "express";
import path from "path";

import { prisma } from "../index";

const getAllOrders = async(req, res) => {
    try {
        const orders = await prisma.orders.findMany({
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
                created_at: new Date().toLocaleDateString(),
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

export { getAllOrders, CreateOrder, getOrderById, getUserOrder };