import express from "express";
import { validationResult } from "express-validator/check";
import { Book } from "../models/books";

import { prisma } from "../app";

const FetchBook = async (req: express.Request, res: express.Response) => {
  await prisma.Book.find(function (err, Books) {
    if (err) {
      res.json({ status: "faild", data: err });
      return;
    }
    res.json({ status: "success", data: Books });
  });
};

const CreateBook = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const book = new Book({
    name: req.body.name,
    specialization: req.body.specialization,
    price: req.body.price,
    publisher: req.body.publisher,
    author_id: req.body.author_id,
    owner_id: req.body.owner_id,
  });
  await prisma.Book.save((err, Book) => {
    if (err) {
      res.json({ status: "faild", message: err.message });
      return;
    }
    res.json({ status: "success", data: Book });
  });
};

const getBookById = async (req: express.Request, res: express.Response) => {
  await prisma.Book.findById(req.params.id, function (err, Book) {
    if (err) {
      res.json({ status: "faild", data: e });
      return;
    }
    res.json({ status: "success", data: Book });
  });
};

const UpdateBook = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const Book = {
    title: req.body.title,
    description: req.body.description,
  };
  await prisma.Book.findByIdAndUpdate(
    req.params.id,
    Book,
    function (err, Book) {
      if (err) {
        res.json({ status: "faild", data: e });
        return;
      }
      res.json({ status: "success", data: Book });
    }
  );
};

const DeleteBook = async (req: express.Request, res: express.Response) => {
  await prisma.Book.findByIdAndDelete(req.params.id, function (err, Book) {
    if (err) {
      res.json({ status: "faild", data: e });
      return;
    }
    if (Book) {
      res
        .status(200)
        .json({ status: "success", message: "Book deleted successfully" });
      return;
    } else {
      res
        .status(404)
        .json({ status: "you are trying to delete a Book not exist" });
    }
  });
};

module.exports = { FetchBook, CreateBook, getBookById, DeleteBook, UpdateBook };
