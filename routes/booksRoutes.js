import express from "express";

import {
    getAllBooks,
    CreateBook,
    getBookById,
    DeleteBook,
    UpdateBook,
} from "../controllers/books";
import multer from "multer";

const router = express.Router();

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./public/uploads");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer({ storage: storage });

// pages
router.get("/book/:id", async(req, res) => {
    const book = await getBookById(req.params.id);
    res.render("book_details", { book });
});
router.get("/add-book", (req, res) => res.render("add_book")); // add book form
router.get("/delete-book/:id", (req, res) => {
    res.render("deleteBook", { book_id: req.params.id });
});
router.get("/edit-book/:id", async(req, res) => {
    const book = await getBookById(req.params.id);
    res.render("edit_book", { book });
});

// crued
router.get("/books", getAllBooks);
router.post("/books/store", upload.single("image"), CreateBook);
router.post("/book/edit/:id", upload.single("image"), UpdateBook);
router.post("/book/delete/:id", DeleteBook);

export default router;