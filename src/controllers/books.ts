import express from "express";
import { validationResult } from "express-validator/check";
import { Book } from "../models/books";

import { prisma } from "../index";

const FetchBook = async (req: express.Request, res: express.Response) => {
 
};

const CreateBook = async (req: express.Request, res: express.Response) => {
  
};

const getBookById = async (req: express.Request, res: express.Response) => {
  
};

const UpdateBook = async (req: express.Request, res: express.Response) => {
  
};

const DeleteBook = async (req: express.Request, res: express.Response) => {
  
};

export = { FetchBook, CreateBook, getBookById, DeleteBook, UpdateBook };
