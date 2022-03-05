import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index";
import { getAllSpecifications } from "../controllers/specialization";
import { getAllBooks } from "../controllers/books";

import { SECRET } from "../constant";

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    // check json web token exists & is verified
    if (token) {
        jwt.verify(token, SECRET, (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect("/login");
            } else {
                next();
            }
        });
    } else {
        res.redirect("/login");
    }
};

// check current user
const checkUser = async(req, res, next) => {
    const token = req.cookies.jwt;
    const specifications = await getAllSpecifications(req, res);
    const books = await getAllBooks(req, res);
    if (token) {
        jwt.verify(token, SECRET, async(err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                res.locals.specifications = specifications || [];
                res.locals.books = books || [];
                next();
            } else {
                try {
                    const user = await prisma.users.findUnique({
                        where: { id: decodedToken.id },
                        include: { rules: true },
                    });
                    res.locals.user = user;
                    res.locals.specifications = specifications || [];
                    res.locals.books = books || [];
                    next();
                } catch (err) {
                    next();
                }
            }
        });
    } else {
        res.locals.user = null;
        res.locals.specifications = specifications || [];
        res.locals.books = books || [];
        next();
    }
};




export { requireAuth, checkUser };