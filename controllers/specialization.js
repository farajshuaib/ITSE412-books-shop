import express from "express";

import { prisma } from "../index";

export const getAllSpecifications = async(req, res) => {
    try {
        const specializations = await prisma.specializations.findMany();
        return specializations;
    } catch (err) {
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};