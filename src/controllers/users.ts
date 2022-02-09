import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import _ from "lodash";
import { validationResult } from "express-validator/check";
import { User } from "../models/users";

import { prisma } from "../app";

const SECRET = "asbadbbdbbh7788888887hb113h3hbb";

var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

var opts: any = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
opts.issuer = SECRET;
opts.audience = "localhost";

const allUser = async (req: express.Request, res: express.Response) => {
  await prisma.users.findMany();
};

const signup = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  await prisma.users.findOne({ email: req.body.email }, async (err, user) => {
    if (user) {
      res
        .status(302)
        .json({ status: "faild", message: "user already exist try to signin" });
      return;
    }
    req.body.password = await bcrypt.hash(req.body.password, 12);
    const newUser = new User({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    prisma.users.create({
      data: newUser,
    });
  });
};

const signin = async (req: express.Request, res: express.Response) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  await prisma.users
    .findOne({ email: req.body.email }, async (err, user) => {
      if (err) {
        res.json({ status: "faild", message: err });
        return;
      }
      if (!user) {
        res
          .status(400)
          .json({ status: "faild", message: "user doesn't exist" });
        return;
      }
      const valid = await bcrypt.compare(req.body.password, user.password);
      if (!valid) {
        res.status(400).json({
          status: "faild",
          message: "Incorrect password !",
          token: null,
        });
        return;
      }

      const payload = {
        user: {
          id: user._id,
        },
      };

      jwt.sign(payload, SECRET, { expiresIn: "365d" }, (err, token) => {
        res.status(200).json({ status: "success", data: user, token });
      });
    })
    .select("-password");
};

const is_loged_in = async (req: express.Request, res: express.Response) => {
  await prisma.users
    .findById(req.body.user.id, (err, user) => {
      if (err) {
        res.status(401).json({ status: "faild", message: err });
        return;
      }
      if (!user) {
        res.status(401).json({ status: "success", message: "user not found" });
        return;
      }
      res.status(200).json({ status: "success", data: user });
    })
    .select("-password");
};

const UpdateUserData = async (req: express.Request, res: express.Response) => {
  const userData = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  };
  await prisma.users
    .findByIdAndUpdate(req.params.id, userData, function (err, user) {
      if (err) {
        res.json({ status: "faild", data: e });
        return;
      }
      res.json({ status: "success", data: user });
    })
    .select("-password");
};

const deleteUser = async (req: express.Request, res: express.Response) => {
  await prisma.users
    .findByIdAndDelete(req.params.id, function (err, user) {
      if (err) {
        res.json({ status: "faild", data: e });
        return;
      }
      if (user) {
        res
          .status(200)
          .json({ status: "success", message: "post deleted successfully" });
        return;
      } else {
        res
          .status(404)
          .json({ status: "you are trying to delete a user not exist" });
      }
    })
    .select("-password");
};

export { signup, signin, deleteUser, allUser, UpdateUserData, is_loged_in };
