import express from "express";
import { validationResult } from "express-validator/check";

import { prisma } from "../index";

const FetchBook = async(req, res) => {};

const CreateBook = async(req, res) => {};

const getBookById = async(req, res) => {};

const UpdateBook = async(req, res) => {};

const DeleteBook = async(req, res) => {};

export { FetchBook, CreateBook, getBookById, DeleteBook, UpdateBook };