import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { validationResult } from "express-validator/check";
import { User } from "../models/users";

import { prisma } from "../index";

const SECRET = "asbadbbdbbh7788888887hb113h3hbb";

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

const signup = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const user_exists = await prisma.users.findFirst({
    select: { email: req.body.email },
  });

  if (user_exists) {
    res
      .status(302)
      .json({ status: "faild", message: "user already exist try to signin" });
    return;
  }

  req.body.password = await bcrypt.hash(req.body.password, 12);

  const user = new User({
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  const createdUser = await prisma.users.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
  });
};

const signin = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const user = await prisma.users.findUnique({
    where: { email: req.body.email },
  });

  if (!user) {
    res.status(400).json({ status: "faild", message: "user doesn't exist" });
    return;
  }

  if (user.password) {
    const valid = await bcrypt.compare(req.body.password, user.password);
    if (!valid) {
      res.status(400).json({
        status: "faild",
        message: "Incorrect password !",
        token: null,
      });
      return;
    }
  }

  const payload = {
    user: {
      id: user.id,
    },
  };

  jwt.sign(payload, SECRET, { expiresIn: "365d" }, (err, token) => {
    res.status(200).json({ status: "success", data: user, token });
  });
};

const is_loged_in = async (req: express.Request, res: express.Response) => {};

const UpdateUserData = async (req: express.Request, res: express.Response) => {
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  if (!req.params.id) {
    return;
  }
  const user = await prisma.users.update({
    where: { id: +req.params.id },
    data: userData,
  });
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  const user = await prisma.users.findUnique({
    where: { id: +req.params.id },
  });

  if (!user) {
    return;
  }

  await prisma.users.delete({ where: { id: +req.params.id } });
};

export { signup, signin, deleteUser, allUser, UpdateUserData, is_loged_in };
