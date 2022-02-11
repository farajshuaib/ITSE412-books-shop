import express from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../index";

import { SECRET } from "../constant";

const requireAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, SECRET, (err: any, decodedToken: any) => {
      if (err) {
        console.log(err.message);
        res.redirect("/login");
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect("/login");
  }
};

// check current user
const checkUser = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, SECRET, async (err: any, decodedToken: any) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        try {
          const user = await prisma.users.findUnique({
            where: { id: decodedToken.id },
          });
          res.locals.user = user;
          next();
        } catch (err) {
          console.log("checkUser erro", err);
          next();
        }
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

export { requireAuth, checkUser };
