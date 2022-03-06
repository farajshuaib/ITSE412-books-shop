import jwt from "jsonwebtoken";
import { prisma } from "../index";
import { SECRET } from "../constant"


const booksCRUDPermission = async(req, res, next) => {
    console.log("res.locals.user", res.locals.user);
    if (res.locals.user) {
        if (res.locals.user.rule !== 3) {
            // which mean it's not a customer
            next();
        } else {
            res.render("notAllowed");
        }
    } else {
        res.render("notAllowed");
    }
};

const usersCRUDPermission = async(req, res, next) => {
    if (res.locals.user) {
        if (res.locals.user.rule == 1) {
            // which mean it's a manager
            next();
        } else {
            res.render("notAllowed");
        }
    } else {
        res.render("notAllowed");
    }
};

const SalesStaticticsPermission = async(req, res, next) => {
    if (res.locals.user) {
        if (res.locals.user.rule == 1) {
            // which mean it's a manager
            next();
        } else {
            res.render("notAllowed");
        }
    } else {
        res.render("notAllowed");
    }
};

const requireSuperAdmin = async(req, res) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, SECRET, async(err, decodedToken) => {
            if (err) {
                res.redirect("/not-allowed");
            } else {
                try {
                    const user = await prisma.users.findUnique({
                        where: { id: decodedToken.id },
                    });
                    if (user.rule != 1) {
                        res.redirect("/not-allowed");
                    }
                } catch (err) {
                    res.redirect("/not-allowed");
                }
            }
        });
    } else {
        res.redirect("/not-allowed");
    }
};

export {
    booksCRUDPermission,
    usersCRUDPermission,
    SalesStaticticsPermission,
    requireSuperAdmin,
};