import express from "express";
import { validationResult } from "express-validator/check";
import path from "path";

import { prisma } from "../index";

const getAllBooks = async(req, res) => {
    console.log("req.query", req.query);
    const specialization_id = req.query.specialization_id;
    const search = req.query.search;

    console.log("specialization_id", specialization_id);
    console.log("search", search);
    try {
        const books = await prisma.books.findMany({
            where: {
                Specialization_id: !!specialization_id ?
                    parseInt(specialization_id) : undefined,
                name: {
                    contains: search,
                },
            },
            include: {
                specializations: true,
            },
        });
        console.log("books", books);
        return books;
    } catch (error) {
        console.log("error prisma", error);
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

const CreateBook = async(req, res) => {
    if (!req.file) {
        console.log("No file upload");
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
                res.redirect('/');
            } else {
                res.status(421).render("error");
            }
        } catch (error) {
            console.log("error", error);
            res.status(400).json({ erorr });
        }
    }
};

const getBookById = async(req, res) => {};

const UpdateBook = async(req, res) => {};

const DeleteBook = async(req, res) => {};

export { getAllBooks, CreateBook, getBookById, DeleteBook, UpdateBook };