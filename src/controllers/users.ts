import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { validationResult } from "express-validator/check";
import { User } from "../models/users";

import { prisma } from "../index";

import { SECRET } from "../constant";

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

var opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
opts.issuer = SECRET;
opts.audience = "localhost";

const allUser = async (req: express.Request, res: express.Response) => {
  const allUsers = await prisma.users.findMany();
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  const user = await prisma.users.findUnique({
    where: { id: +req.params.id },
  });

  if (!user) {
    res.status(404).render("error", {
      message: "المستخدم غير موجود، لا يمكن حذف مستخدم غير موجود.",
    });
    return;
  }

  try {
    await prisma.users.delete({ where: { id: +req.params.id } });
  } catch (err) {
    res.status(500).render("error", {
      message: " حدث خطأ ما في الخادم ",
    });
  }
};

export { deleteUser, allUser };
