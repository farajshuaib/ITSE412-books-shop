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
        cb(null, './public/uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })
    /* GET home page. */
router.get("/books", getAllBooks);
router.post("/books/store", upload.single("image"), CreateBook);
router.get("/books/:id", getBookById);
router.put("/books/:id", UpdateBook);
router.delete("/books/:id", DeleteBook);

export default router;