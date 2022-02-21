import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "..";
import { SECRET } from "../constant";
import bcrypt from "bcrypt";

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, SECRET, {
        expiresIn: maxAge,
    });
};

export const signup_post = async(req, res) => {
    const { name, email, password } = req.body;

    let hashed_password = await bcrypt.hash(password, 12);
    try {
        const user = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: hashed_password,
                rule: 1,
            },
        });
        const token = createToken(user.id);
        res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({ user: user });
    } catch (err) {
        console.log(err);
        res.status(400).json({ erorr: err });
    }
};

export const login_post = async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.users.findFirst({
            where: {
                email: email,
            },
            include: {
                rules: true,
            },
        });
        if (user && user.password) {
            const valid = await bcrypt.compare(req.body.password, user.password);
            if (valid) {
                const token = createToken(user.id);
                res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(200).json({ user: user });
            } else {
                res.status(400).json({
                    status: "faild",
                    error: "كلمة المرور خاطئة",
                });
            }
        } else {
            res.status(404).json({
                status: "faild",
                error: "المستخدم غير مسجل بعد، الرجاء تسجيل حساب جديد",
            });
        }
    } catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
};

export const logout_get = (req, res) => {
    res.cookie("jwt", "", { maxAge: 1 });
    res.redirect("/");
};