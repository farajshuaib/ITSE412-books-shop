"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const check_1 = require("express-validator/check");
const books_1 = require("../models/books");
const app_1 = require("../app");
const FetchBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield app_1.prisma.Book.find(function (err, Books) {
        if (err) {
            res.json({ status: "faild", data: err });
            return;
        }
        res.json({ status: "success", data: Books });
    });
});
const CreateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, check_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const book = new books_1.Book({
        name: req.body.name,
        specialization: req.body.specialization,
        price: req.body.price,
        publisher: req.body.publisher,
        author_id: req.body.author_id,
        owner_id: req.body.owner_id,
    });
    yield app_1.prisma.Book.save((err, Book) => {
        if (err) {
            res.json({ status: "faild", message: err.message });
            return;
        }
        res.json({ status: "success", data: Book });
    });
});
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield app_1.prisma.Book.findById(req.params.id, function (err, Book) {
        if (err) {
            res.json({ status: "faild", data: e });
            return;
        }
        res.json({ status: "success", data: Book });
    });
});
const UpdateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, check_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array(),
        });
    }
    const Book = {
        title: req.body.title,
        description: req.body.description,
    };
    yield app_1.prisma.Book.findByIdAndUpdate(req.params.id, Book, function (err, Book) {
        if (err) {
            res.json({ status: "faild", data: e });
            return;
        }
        res.json({ status: "success", data: Book });
    });
});
const DeleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield app_1.prisma.Book.findByIdAndDelete(req.params.id, function (err, Book) {
        if (err) {
            res.json({ status: "faild", data: e });
            return;
        }
        if (Book) {
            res
                .status(200)
                .json({ status: "success", message: "Book deleted successfully" });
            return;
        }
        else {
            res
                .status(404)
                .json({ status: "you are trying to delete a Book not exist" });
        }
    });
});
module.exports = { FetchBook, CreateBook, getBookById, DeleteBook, UpdateBook };
//# sourceMappingURL=books.js.map