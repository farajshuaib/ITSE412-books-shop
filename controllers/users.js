import { prisma } from "../index";
import bcrypt from "bcrypt";
import { requireSuperAdmin } from "../middlewares/permissions";
import moment from "moment";

const allUser = async(req, res) => {
    try {
        const users = await prisma.users.findMany({
            where: {
                NOT: {
                    id: 1,
                },
            },
            include: {
                rules: true,
            },
        });
        return users;
    } catch (err) {
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

const getUserById = async(user_id) => {
    try {
        const users = await prisma.users.findUnique({
            where: {
                id: +user_id,
            },
            include: {
                rules: true,
            },
        });
        return users;
    } catch (err) {
        res.status(500).render("error", {
            message: " حدث خطأ ما في الخادم ",
        });
    }
};

const CreateUser = async(req, res) => {
    await requireSuperAdmin(req, res);
    const { name, email, password, rule } = req.body;

    let hashed_password = await bcrypt.hash(password, 12);
    try {
        await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: hashed_password,
                rule: +rule,
                created_at: moment().format("YYYY-MM-DD"),
            },
        });
        res.redirect("/success");
    } catch (err) {
        res.status(400).json({ erorr: err });
    }
};

const deleteUser = async(req, res) => {
    await requireSuperAdmin(req, res);
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
        res.redirect("/success");
    } catch (err) {
        res.redirect("/error");
    }
};

const UpdateUser = async(req, res) => {
    await requireSuperAdmin(req, res);
    try {
        const { name, email, password, rule } = req.body;

        let hashed_password;

        let currentUser = await prisma.users.findUnique({
            where: {
                id: +req.params.id,
            },
        });

        if (password) {
            hashed_password = await bcrypt.hash(password, 12);
        } else {
            hashed_password = currentUser.password;
        }

        const user = await prisma.users.update({
            where: {
                id: +req.params.id,
            },
            data: {
                name: name,
                email: email,
                password: hashed_password,
                rule: +rule,
            },
        });
        if (user) {
            res.redirect("/success");
        } else {
            res.status(421).render("error");
        }
    } catch (error) {
        res.redirect("/error");
    }
};

export { deleteUser, allUser, CreateUser, UpdateUser, getUserById };