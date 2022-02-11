import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "..";
import { SECRET } from "../constant";
import bcrypt from "bcrypt";
import { User } from "../models/users";

// handle errors
const handleErrors = (err: any) => {
  console.log(err.message, err.code);
  let errors: any = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "That password is incorrect";
  }

  // duplicate email error
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    // console.log(err);
    Object.values(err.errors).forEach(({ properties }: any) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id: any) => {
  return jwt.sign({ id }, SECRET, {
    expiresIn: maxAge,
  });
};

export const signup_post = async (
  req: express.Request,
  res: express.Response
) => {
  const { name, email, password } = req.body;

  let hashed_password = await bcrypt.hash(req.body.password, 12);
  try {
    const user = await prisma.users.create({
      data: { id: 1, name: name, email: email, password: hashed_password, rule: 1 },
    });
    const token = createToken(user.id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user });
  } catch (err) {
    console.log(err);
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const login_post = async (
  req: express.Request,
  res: express.Response
) => {
  console.log(req);
  const { email, password } = req.body;

  try {
    const user = await prisma.users.findFirst({
      where: { email: email, password: password },
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
          message: "كلمة المرور خاطئة",
          token: null,
        });
      }
    } else {
      res.status(404).json({
        status: 404,
        data: { error: "المستخدم غير مسجل بعد، الرجاء تسجيل حساب جديد" },
      });
    }
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

export const logout_get = (req: any, res: any) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
