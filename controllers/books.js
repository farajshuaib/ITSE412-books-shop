import express from "express";
import path from "path";

import { prisma } from "../index";

const getAllBooks = async(req, res) => {
    const specialization_id = req.query.specialization_id;
    const search = req.query.search;
    try {
        const books = await prisma.books.findMany({
            where: {
                Specialization_id: specialization_id && specialization_id != 0 ?
                    parseInt(specialization_id) :
                    undefined,
                name: {
                    contains: search || undefined,
                },
            },
            include: {
                specializations: true,
            },
        });
        return books;
    } catch (error) {
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

const CreateBook = async(req, res) => {
    if (!req.file) {
        res.status(421).json({ error: "يجب تحميل صورة الكتاب" });
    } else {
        try {
            const { name, Specialization_id, price, author, publisher, description } =
            req.body;
            let imgsrc = path.join("/uploads/", req.file.filename);

            const book = await prisma.books.create({
                data: {
                    name,
                    description: description,
                    Specialization_id: +Specialization_id,
                    price: +price,
                    author: author,
                    publisher: publisher,
                    created_at: new Date().toDateString(),
                    publish_at: new Date().toDateString(),
                    image: imgsrc,
                },
            });
            if (book) {
                res.redirect("/success");
            } else {
                res.status(421).render("error");
            }
        } catch (error) {
            res.status(500).render("error", {
                message: " حدث خطأ ما في الخادم ",
            });
        }
    }
};

const getBookById = async(book_id) => {
    try {
        const book = await prisma.books.findUnique({
            where: {
                id: +book_id,
            },
            include: {
                specializations: true,
            },
        });
        return book;
    } catch (error) {
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

const UpdateBook = async(req, res) => {
    try {
        const { name, Specialization_id, price, author, publisher, description } =
        req.body;

        let currentBook = await prisma.books.findUnique({
            where: {
                id: +req.params.id,
            },
        });

        let imgsrc;

        if (req.file) {
            imgsrc = path.join("/uploads/", req.file.filename);
        } else {
            imgsrc = currentBook.image;
        }

        const book = await prisma.books.update({
            where: {
                id: +req.params.id,
            },
            data: {
                name,
                description: description,
                Specialization_id: +Specialization_id,
                price: +price,
                author: author,
                publisher: publisher,
                publish_at: new Date().toDateString(),
                image: imgsrc,
            },
        });
        if (book) {
            res.redirect("/success");
        } else {
            res.status(421).render("error");
        }
    } catch (error) {
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

const DeleteBook = async(req, res) => {
    try {
        await prisma.books.delete({
            where: {
                id: +req.params.id,
            },
        });

        res.redirect("/success");
    } catch (error) {
        console.log("error prisma", error);
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

export { getAllBooks, CreateBook, getBookById, DeleteBook, UpdateBook };