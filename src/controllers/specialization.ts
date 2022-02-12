import express from "express";
import { validationResult } from "express-validator/check";

import { prisma } from "../index";

export const getAllSpecifications = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const specializations = await prisma.specializations.findMany();
    return specializations;
  } catch (err) {
    console.log(err);
    res.status(500).render("error", {
      message: " حدث خطأ ما في الخادم ",
    });
  }
};
