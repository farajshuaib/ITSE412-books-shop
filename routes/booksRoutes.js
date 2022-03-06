import express from "express";

import {
    getAllBooks,
    CreateBook,
    getBookById,
    DeleteBook,
    UpdateBook,
} from "../controllers/books";

import upload from "../middlewares/multer";

import { booksCRUDPermission } from "../middlewares/permissions";
import { requireAuth } from "../middlewares/auth";

const router = express.Router();

// pages
router.get("/book-details/:id", requireAuth, async(req, res) => {
    const book = await getBookById(req.params.id);
    res.render("book_details", { book });
});
router.get("/add-book", requireAuth, booksCRUDPermission, (req, res) =>
    res.render("add_book")
); // add book form
router.get("/delete-book/:id", requireAuth, booksCRUDPermission, (req, res) => {
    res.render("deleteBook", { book_id: req.params.id });
});
router.get(
    "/edit-book/:id",
    requireAuth,
    booksCRUDPermission,
    async(req, res) => {
        const book = await getBookById(req.params.id);
        res.render("edit_book", { book });
    }
);

// crued
router.get("/books", getAllBooks);
router.post("/books/store", upload.single("image"), CreateBook);
router.post("/book/edit/:id", upload.single("image"), UpdateBook);
router.post("/book/delete/:id", DeleteBook);

export default router;